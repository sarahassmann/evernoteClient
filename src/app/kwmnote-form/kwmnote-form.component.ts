import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule, NgForOf} from "@angular/common";
import {KwmlistFactory} from "../shared/kwmlist-factory";
import {User} from "../shared/user";
import {KwmnoteFactory} from "../shared/kwmnote-factory";
import {KwmListService} from "../shared/kwm-list.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UsersService} from "../shared/users.service";
import {KwmNoteService} from "../shared/kwm-note.service";
import {Kwmlist} from "../shared/kwmlist";
import {KwmnoteFormErrorMessages} from "./kwmnote-form-error-messages";

@Component({
  selector: 'ev-kwmnote-form',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './kwmnote-form.component.html',
  styles: ``
})
export class KwmnoteFormComponent implements OnInit{
  // FormGroup to manage form controls
  kwmnoteForm: FormGroup;
  // Flag to check if updating an existing note
  isUpdatinKwmnote = false;
  // Initializes a new empty note object
  kwmnote = KwmnoteFactory.empty();
  // Stores validation error messages
  errors: { [key: string]: string } = {};
  // Stores list of kwmlists fetched from the service
  kwmlists : Kwmlist[] = [];


  constructor(
    // FormBuilder to construct form groups
    private fb: FormBuilder,
    // Note service for CRUD operations
    private ev: KwmNoteService,
    // To access route parameters
    private route: ActivatedRoute,
    // Router for navigation
    private router: Router,
    // Service to fetch lists
    private kwmlistsService: KwmListService
  ) {
    // Initialize the form group
    this.kwmnoteForm = this.fb.group({});
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    // Fetch all kwmlists to populate dropdowns or lists
    this.kwmlistsService.getAll().subscribe(kwmlists => {
      this.kwmlists = kwmlists;
      console.log('Loaded kwmlists:', kwmlists);
    });
    // Check if an ID was provided (indicating edit mode)
    if (id) {
      this.isUpdatinKwmnote = true;
      // Fetch the specific kwmnote by ID
      this.ev.getKwmnote(id).subscribe(kwmnote => {
        this.kwmnote = kwmnote;
        // Initialize form fields with fetched note data
        this.initKwmnote();
        console.log("Kwmlist: ", this.kwmnote);
      });
    }
    this.kwmnote = KwmnoteFactory.empty();
    // Initialize or re-initialize the form fields
    this.initKwmnote()
  }

  // Initializes or reinitializes the form with validation rules
  private initKwmnote() {
    this.kwmnoteForm = this.fb.group({
      id: this.kwmnote.id,
      kwmlists_id: this.kwmnote.kwmlists_id,
      noteTitle: [this.kwmnote.noteTitle, Validators.required],
      noteDescription: [
        this.kwmnote.noteDescription,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(40)
        ]
      ],
      created_at: [this.formatDate(this.kwmnote.created_at)],
      updated_at: [this.formatDate(this.kwmnote.updated_at)]
    });
    // Subscribe to status changes to handle validation errors dynamically
    this.kwmnoteForm.statusChanges.subscribe(() => this.updateErrorMessages());
  }

  // Formats the date to a simple YYYY-MM-DD string format
  formatDate(date: Date): string {
    if (!date) return '';
    return new Date(date).toISOString().split('T')[0];
  }

  // Handles form submissions
  submitForm() {
    const kwmnote = KwmnoteFactory.fromObject(this.kwmnoteForm.value);
    console.log("Submitted kwmnote: ", kwmnote);
    // Check if we are updating or creating a new note
    if (this.isUpdatinKwmnote) {
      this.ev.update(kwmnote).subscribe(res => {
        this.router.navigate(['/kwmnotes', kwmnote.id], {relativeTo: this.route});
      });
    } else {
      this.ev.create(kwmnote).subscribe(res => {
        this.kwmnote = KwmnoteFactory.empty();
        this.kwmnoteForm.reset(KwmnoteFactory.empty());
        this.router.navigate(['/kwmnotes'], {relativeTo: this.route});
      });
    }
  }

  // Updates error messages based on form validation status
  private updateErrorMessages() {
    this.errors = {};
    for (const message of KwmnoteFormErrorMessages) {
      const control = this.kwmnoteForm.get(message.forControl);
      if (control && control.dirty && control.invalid && control.errors &&
      control.errors[message.forValidator] && !this.errors[message.forControl] &&
        !this.errors[message.forControl]) {
        this.errors[message.forControl] = message.text;
      }}
  }
}
