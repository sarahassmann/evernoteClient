import { Component, Input } from '@angular/core';
import { Kwmtag } from '../shared/kwmtag';
import {DatePipe} from "@angular/common";

@Component({
  selector: 'a.ev-kwmtag-item',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './kwmtag-item.component.html',
  styles: ``
})
export class KwmtagItemComponent {
  @Input() kwmtag : Kwmtag | undefined;
}
