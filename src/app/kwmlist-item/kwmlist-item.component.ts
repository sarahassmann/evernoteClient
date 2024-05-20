import { Component, Input } from '@angular/core';
import { Kwmlist } from '../shared/kwmlist';
import {DatePipe} from "@angular/common";

@Component({
  selector: 'a.ev-kwmlist-item',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './kwmlist-item.component.html',
  styles: ``
})
export class KwmlistItemComponent {
  @Input() kwmlist : Kwmlist | undefined;
}
