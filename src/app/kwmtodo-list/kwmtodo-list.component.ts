import { Component, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Kwmtodo } from "../shared/kwmtodo";
import { KwmtodoItemComponent } from "../kwmtodo-item/kwmtodo-item.component";
import { KwmTodoService} from "../shared/kwm-todo.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'ev-kwmtodo-list',
  standalone: true,
  imports: [
    DatePipe,
    RouterLink,
    KwmtodoItemComponent
  ],
  templateUrl: './kwmtodo-list.component.html',
  styles: ``
})
export class KwmtodoListComponent implements OnInit{
  kwmtodos: Kwmtodo[] = [];

  constructor(private ev:KwmTodoService) {
  }

  ngOnInit() {
    this.ev.getAll().subscribe(res => this.kwmtodos = res);
  }

}
