import { Component, Input } from '@angular/core';
import { Kwmtodo } from '../shared/kwmtodo';
import {DatePipe} from "@angular/common";

@Component({
  selector: 'a.ev-kwmtodo-item',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './kwmtodo-item.component.html',
  styles: ``
})
export class KwmtodoItemComponent {
  @Input() kwmtodo : Kwmtodo | undefined;
}
