import { Component, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Kwmtag } from "../shared/kwmtag";
import { KwmtagItemComponent } from "../kwmtag-item/kwmtag-item.component";
import { KwmTagService} from "../shared/kwm-tag.service";
import {DatePipe} from "@angular/common";
import {KwmnoteItemComponent} from "../kwmnote-item/kwmnote-item.component";


@Component({
  selector: 'ev-kwmtag-list',
  standalone: true,
  imports: [
    DatePipe,
    RouterLink,
    KwmtagItemComponent,
    KwmnoteItemComponent
  ],
  templateUrl: './kwmtag-list.component.html',
  styles: ``
})
export class KwmtagListComponent implements OnInit{
  // empty array of Kwmtag objects to store the list of tags
  kwmtags: Kwmtag[] = [];

  constructor(private ev:KwmTagService) {
  }

  // get all the tags from the service and store them in the kwmtags array
  ngOnInit() {
    this.ev.getAll().subscribe(res => this.kwmtags = res);
  }
}
