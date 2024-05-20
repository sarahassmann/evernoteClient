import { Component, Input } from '@angular/core';
import { Kwmnote } from '../shared/kwmnote';
import {DatePipe} from "@angular/common";

@Component({
  selector: 'a.ev-kwmnote-item',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './kwmnote-item.component.html',
  // specifiy styles for the component
  styles: `
    .header-container {
      margin-top: 20px;
      padding: 20px;
      background-color: #f8f8f9;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      width: 100%; /* Ensure it takes the full available width */
      overflow: hidden; /* Adds overflow handling to prevent spilling */
    }
    .item .header {
      font-size: 1.4em;
      color: #333;
      margin-bottom: 10px;
    }
    .description .ui.divided.grid {
      margin-left: 0; /* Adjust as necessary to fit within container */
      margin-right: 0;
    }
    .ui.labeled.icon {
      display: flex;
      align-items: center;
      font-size: 1.1em;
    }
    .ui.labeled.icon i {
      float: none;
      margin-right: 10px;
    }
    .content {
      flex-grow: 1; /* This ensures the content fills the available space next to the icon */
    }`
})
export class KwmnoteItemComponent {
  @Input() kwmnote : Kwmnote | undefined;
}
