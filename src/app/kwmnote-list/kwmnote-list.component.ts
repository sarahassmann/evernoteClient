import {Component, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {Kwmnote} from "../shared/kwmnote";
import {KwmNoteService} from "../shared/kwm-note.service";
import {KwmnoteItemComponent} from "../kwmnote-item/kwmnote-item.component";

@Component({
  selector: 'ev-kwmnote-list',
  standalone: true,
  imports: [
    DatePipe,
    RouterLink,
    KwmnoteItemComponent
  ],
  templateUrl: './kwmnote-list.component.html',
  // style for this component
  styles: `
    .ui.container.header-container {
      background-color: #f4f4f4; /* Hintergrundfarbe für den Header */
      padding: 30px 0;
      margin-bottom: 40px; /* Abstand zwischen Header und Inhalt */
    }

    .item .header {
      font-size: 1.2em; /* Schriftgröße des Headers */
      color: #4183c4; /* Farbe des Headers */
      margin-bottom: 10px; /* Zusätzlicher Abstand nach unten zum Beschreibungsbereich */
    }`
})
// Class definition for the component "KwmnoteListComponent"
export class KwmnoteListComponent implements OnInit{
  // Array of Kwmnote objects to store the notes
  kwmnotes: Kwmnote[] = [];

  // Constructor for the component
  constructor(private ev:KwmNoteService) {
  }

  // Method to initialize the component by calling the getAll() method of the KwmNoteService
  ngOnInit() {
    this.ev.getAll().subscribe(res => this.kwmnotes = res);
  }

}
