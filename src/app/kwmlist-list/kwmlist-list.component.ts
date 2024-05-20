import {Component, OnInit} from '@angular/core';
import {Kwmlist} from "../shared/kwmlist";
import {DatePipe} from "@angular/common";
import {KwmlistItemComponent} from
    "../kwmlist-item/kwmlist-item.component";
import {KwmListService} from "../shared/kwm-list.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'ev-kwmlist-list',
  standalone: true,
  imports: [
    DatePipe,
    KwmlistItemComponent,
    RouterLink
  ],
  templateUrl: './kwmlist-list.component.html',
  // styling only for the list component
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
    }

    .item .header i.list.icon {
      margin-right: 10px; /* Fügt einen rechten Abstand von 10px zum Icon hinzu */
    }

    .item .content {
      padding: 10px; /* Gleichmäßiges Padding für den gesamten Inhaltsbereich */
    }

    .description .grid {
      margin-top: 5px; /* Zusätzlicher Abstand oben im Beschreibungsbereich */
    }

    .description .grid .column {
      padding-top: 5px; /* Etwas Abstand oben für die Spalten */
      padding-right: 10px; /* Verhindern von Textüberlappung zwischen den Spalten */
    }`
})
export class KwmlistListComponent implements OnInit {
  // Array to store Kwmlist items fetched from the server.
  kwmlists: Kwmlist[] = [];

  // Constructor to inject KwmListService.
  constructor(private ev:KwmListService) {
  }
  ngOnInit() {
    // Fetch all Kwmlist items from the server on component initialization.
    this.ev.getAll().subscribe(res => this.kwmlists = res);
  }

}
