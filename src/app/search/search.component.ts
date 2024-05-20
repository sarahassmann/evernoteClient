import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {debounceTime, distinctUntilChanged, switchMap, tap} from "rxjs";
import {Kwmlist} from "../shared/kwmlist";
import {KwmListService} from "../shared/kwm-list.service";
import {NgClass} from "@angular/common";

@Component({
  selector: 'ev-search',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './search.component.html',
  styles: ``
})
export class SearchComponent implements OnInit {
  keyup = new EventEmitter<string>(); // Emits events when a key is pressed
  foundKwmLists: Kwmlist[] = []; // Stores the search results
  isLoading = false; // Indicates whether the search is in progress
  @Output() kwmlistSelected = new EventEmitter<Kwmlist>(); // Emits an event when a Kwmlist is selected

  constructor(private ev: KwmListService) {} // Injects the KwmListService

  ngOnInit() {
    // Subscribes to the keyup event to perform the search
    this.keyup.pipe(
      debounceTime(500), // Waits for 500ms pause in keystrokes
      distinctUntilChanged(), // Ensures the search is only performed if the search term has changed
      tap(() => this.isLoading = true), // Sets isLoading to true at the start of the search
      switchMap(searchTerm => this.ev.getAllSearch(searchTerm)) // Switches to the new search observable and cancels previous requests
    ).subscribe((kwmlists) => {
      this.foundKwmLists = kwmlists; // Updates the search results
      console.log(kwmlists); // Logs the search results
      this.isLoading = false; // Sets isLoading to false when the data is loaded
    });
  }
}

