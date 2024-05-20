import { Component, OnInit } from '@angular/core';
import { Kwmtodo } from '../shared/kwmtodo';
import { DatePipe } from '@angular/common';
import { KwmTodoService} from "../shared/kwm-todo.service";
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {KwmtodoFactory} from "../shared/kwmtodo-factory";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../shared/auth.service";

@Component({
  selector: 'ev-kwmtodo-details',
  standalone: true,
  imports: [
    DatePipe,
    RouterLink
  ],
  templateUrl: './kwmtodo-details.component.html',
  styles: ``
})
// Defines a component class to manage the details of a "Kwmtodo" item.
export class KwmtodoDetailsComponent implements OnInit{
  // Initialize the to-do item using a factory that creates an empty todo.
  public kwmtodo: Kwmtodo = KwmtodoFactory.empty()

  // Constructor to inject necessary services for the component.
  constructor(
    private KwmTodoService: KwmTodoService, // Service to handle CRUD operations for to-do items.
    private route: ActivatedRoute, // Service to access route parameters.
    private router: Router, // Service for navigation.
    private toastr: ToastrService, // Service to show notifications.
    public authService: AuthService // Authentication service for user authentication.
  ) {}

  // Lifecycle hook that is called after Angular has initialized all data-bound properties.
  ngOnInit() {
    // Subscribe to route parameters to get the 'id' of the to-do.
    this.route.params.subscribe(params => {
      const id = +params['id']; // Convert the 'id' string parameter to a number.
      // Fetch the to-do from the service using its ID and assign it to the component's to-do variable.
      this.KwmTodoService.getKwmtodo(id).subscribe(kwmtodo => this.kwmtodo = kwmtodo);
    });
  }

  // Method to remove a todo.
  removeKwmtodos() {
    // Confirm with the user before deleting the todo.
    if (confirm('Are you sure?')) {
      // Call the service to remove the to-do using its ID.
      this.KwmTodoService.remove(this.kwmtodo.id).subscribe({
        next: () => {
          this.router.navigate(['../'], {relativeTo: this.route});
          this.toastr.success('KwmTodo successfully deleted', 'Success');
        }
      });
    }
  }
}

