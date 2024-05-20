import { Component } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {SearchComponent} from "../search/search.component";
import {Kwmlist} from "../shared/kwmlist";

@Component({
  selector: 'ev-home',
  standalone: true,
  imports: [
    RouterLink,
    SearchComponent
  ],
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // Method to handle the event when a Kwmlist is selected.
  kwmlistSelected($event: Kwmlist) {
    this.router.navigate(['/kwmlists', $event.id], {relativeTo: this.route});
  }
}
