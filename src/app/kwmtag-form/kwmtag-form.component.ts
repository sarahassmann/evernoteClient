import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {KwmtagFactory} from "../shared/kwmtag-factory";
import {KwmNoteService} from "../shared/kwm-note.service";
import {ActivatedRoute, Router} from "@angular/router";
import {KwmlistFactory} from "../shared/kwmlist-factory";
import {KwmTagService} from "../shared/kwm-tag.service";
import {KwmnoteFormErrorMessages} from "../kwmnote-form/kwmnote-form-error-messages";
import {KwmtagFormErrorMessages} from "./kwmtag-form-error-messages";

@Component({
  selector: 'ev-kwmtag-form',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './kwmtag-form.component.html',
  styles: ``
})
export class KwmtagFormComponent implements OnInit {
  // Form group to manage form controls
  kwmtagForm: FormGroup;
  // Flag to check if the form is used to update an existing tag
  isUpdatingKwmTag = false;
  // Initializes an empty KwmTag using factory method
  kwmtag = KwmtagFactory.empty();
  // Object to store form validation error messages
  errors: { [key: string]: string } = {};

  // Constructor to inject services
  constructor(
    // FormBuilder to create form controls and groups
    private fb: FormBuilder,
    // KwmTagService to interact with the backend API
    private ev: KwmTagService,
    // ActivatedRoute to access the current route
    private route: ActivatedRoute,
    // Router to navigate to other routes
    private router: Router,
  ) {
    // Initializes the form group
    this.kwmtagForm = this.fb.group({});
  }

  // OnInit lifecycle hook
  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      // Set updating flag if an ID is present
      this.isUpdatingKwmTag = true;
      this.ev.getKwmtag(id).subscribe(kwmtag => {
        // Fetch the tag and assign it
        this.kwmtag = kwmtag;
        // Initialize form with fetched tag data
        this.initKwmTag();
        console.log("KwmTag: ", this.kwmtag);
      });
    }
    // Initialize or reinitialize the tag form
    this.kwmtag = KwmtagFactory.empty();
    this.initKwmTag();
  }

  // Initializes the form with validation and data bindings
  private initKwmTag() {
    this.kwmtagForm = this.fb.group({
      id: this.kwmtag.id,
      tagName: [
        this.kwmtag.tagName,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(40)
        ]
      ],
      created_at: [this.formatDate(this.kwmtag.created_at)],
      updated_at: [this.formatDate(this.kwmtag.updated_at)]
    });
    // Subscribe to status changes to handle form validation messages dynamically
    this.kwmtagForm.statusChanges.subscribe(() => this.updateErrorMessages());
  }

  // Formats a date to 'YYYY-MM-DD' format
  formatDate(date: Date): string {
    if (!date) return '';
    return new Date(date).toISOString().split('T')[0];
  }

  // Handles form submissions
  submitForm() {
    // Create a KwmTag object from form values
    const kwmtag = KwmtagFactory.fromObject(this.kwmtagForm.value);
    console.log("KwmTags: ", kwmtag);
    if (this.isUpdatingKwmTag) {
      this.ev.update(kwmtag).subscribe(res => {
        this.router.navigate(['/kwmtags', kwmtag.id], {relativeTo: this.route});
      });
    } else {
      this.ev.create(kwmtag).subscribe(res => {
        // Reset the form and tag object on successful creation
        this.kwmtag = KwmtagFactory.empty();
        this.kwmtagForm.reset(KwmlistFactory.empty());
        this.router.navigate(['/kwmtags'], {relativeTo: this.route});
      });
    }
  }

  // Updates the error messages based on the current form validation state
  private updateErrorMessages() {
    // Clear existing errors
    this.errors = {};
    for (const message of KwmtagFormErrorMessages) {
      const control = this.kwmtagForm.get(message.forControl);
      if (control && control.dirty && control.invalid && control.errors &&
        control.errors[message.forValidator] && !this.errors[message.forControl] &&
        !this.errors[message.forControl]) {
        this.errors[message.forControl] = message.text;
      }}
  }
}
