import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {KwmnoteFactory} from "../shared/kwmnote-factory";
import {Kwmlist, Kwmnote} from "../shared/kwmlist";
import {KwmtodoFactory} from "../shared/kwmtodo-factory";
import {KwmNoteService} from "../shared/kwm-note.service";
import {ActivatedRoute, Router} from "@angular/router";
import {KwmListService} from "../shared/kwm-list.service";
import {KwmTodoService} from "../shared/kwm-todo.service";
import {KwmtagFormErrorMessages} from "../kwmtag-form/kwmtag-form-error-messages";
import {KwmtodoErrorMessages} from "./kwmtodo-form-error-messages";

@Component({
  selector: 'ev-kwmtodo-form',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './kwmtodo-form.component.html',
  styles: ``
})
// Defines the class for handling todo forms in the application
export class KwmtodoFormComponent implements OnInit {
  kwmtodoForm: FormGroup; // FormGroup to manage form controls for todo input
  isUpdatingKwmTodo = false; // Boolean to check if updating an existing todo
  kwmtodo = KwmtodoFactory.empty(); // Initializes a new empty todo
  errors: { [key: string]: string } = {}; // Object to store error messages
  kwmlists : Kwmlist[] = []; // Array to store lists for dropdown in form
  kwmnotes : Kwmnote[] = []; // Array to store notes for dropdown in form

  // Constructor to inject necessary services
  constructor(
    private fb: FormBuilder, // FormBuilder for creating form group and controls
    private ev: KwmTodoService, // Service for CRUD operations on todos
    private route: ActivatedRoute, // To access route parameters
    private router: Router, // For navigation
    private kwmlistsService: KwmListService, // Service for fetching lists
    private kwmnoteService: KwmNoteService // Service for fetching notes
  ) {
    this.kwmtodoForm = this.fb.group({}); // Initializing the form group
  }

  // On component initialization
  ngOnInit() {
    const id = this.route.snapshot.params['id']; // Fetch 'id' from route parameters
    // Fetch all lists and notes to populate form dropdowns
    this.kwmlistsService.getAll().subscribe(kwmlists => this.kwmlists = kwmlists);
    this.kwmnoteService.getAll().subscribe(kwmnotes => this.kwmnotes = kwmnotes);
    // If an ID is present, load the existing to-do for editing
    if (id) {
      this.isUpdatingKwmTodo = true;
      this.ev.getKwmtodo(id).subscribe(kwmtodo => {
        this.kwmtodo = kwmtodo;
        this.initKwmToDo(); // Initialize form with to-do data
      });
    }
    // Otherwise, initialize a blank form
    this.kwmtodo = KwmtodoFactory.empty();
    this.initKwmToDo();
  }

  // Initialize or reinitialize the to-do form with validation rules
  private initKwmToDo() {
    this.kwmtodoForm = this.fb.group({
      id: this.kwmtodo.id,
      kwmlists_id: [this.kwmtodo.kwmlists_id, Validators.required],
      kwmnotes_id: [this.kwmtodo.kwmnotes_id, Validators.required],
      todoName: [this.kwmtodo.todoName, [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      todoDescription: [this.kwmtodo.todoDescription, [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
      created_at: [this.formatDate(this.kwmtodo.created_at)],
      updated_at: [this.formatDate(this.kwmtodo.updated_at)],
      due_date: [this.formatDate(this.kwmtodo.due_date)],
    });
    // Subscribe to form status changes to handle validation error messages dynamically
    this.kwmtodoForm.statusChanges.subscribe(() => this.updateErrorMessages());
  }

  // Format a date to YYYY-MM-DD format
  formatDate(date: Date): string {
    if (!date) return '';
    return new Date(date).toISOString().split('T')[0];
  }

  // Handle form submissions
  submitForm() {
    const formValue = {...this.kwmtodoForm.value};
    formValue.due_date = this.formatDate(this.kwmtodoForm.value.due_date); // Ensure date is formatted

    const kwmtodo = KwmtodoFactory.fromObject(formValue);
    if (this.isUpdatingKwmTodo) {
      // Update the existing to-do
      this.ev.update(kwmtodo).subscribe(() => {
        this.router.navigate(['/kwmtodos', kwmtodo.id], {relativeTo: this.route});
      });
    } else {
      // Create a new todo
      this.ev.create(kwmtodo).subscribe(() => {
        this.kwmtodo = KwmtodoFactory.empty(); // Reset the to-do
        this.kwmtodoForm.reset(KwmnoteFactory.empty()); // Reset the form
        this.router.navigate(['/kwmtodos'], {relativeTo: this.route}); // Navigate to to-do list
      });
    }
  }

  // Update form errors based on validation status
  private updateErrorMessages() {
    this.errors = {};
    for (const message of KwmtodoErrorMessages) {
      const control = this.kwmtodoForm.get(message.forControl);
      if (control && control.dirty && control.invalid && control.errors &&
        control.errors[message.forValidator] && !this.errors[message.forControl] &&
        !this.errors[message.forControl]) {
        this.errors[message.forControl] = message.text; // Set new error message
      }
    }
  }
}

