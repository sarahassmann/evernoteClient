import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {KwmlistFactory} from "../shared/kwmlist-factory";
import {KwmListService} from "../shared/kwm-list.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UsersService} from "../shared/users.service";
import {CommonModule} from '@angular/common';  // Importieren des CommonModule
import {User} from "../shared/user";

@Component({
  selector: 'ev-kwmlist-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './kwmlist-form.component.html',
  styles: ``
})
export class KwmlistFormComponent implements OnInit {
  // FormGroup to handle form data and validation
  kwmListForm: FormGroup;
  // Flag to check if updating an existing list or creating a new one
  isUpdatingKwmlist = false;
  // Initializes a new empty Kwmlist object
  kwmlist = KwmlistFactory.empty();
  // Object to store form errors
  errors: { [key: string]: string } = {};
  // Array to hold users fetched from the UsersService
  users : User[] = [];

  // Constructor to inject services and handlers
  constructor(
    // Inject FormBuilder to create form groups
    private fb: FormBuilder,
    // Inject KwmListService to fetch/update Kwmlist data
    private ev: KwmListService,
    // Inject ActivatedRoute to access route parameters
    private route: ActivatedRoute,
    // Inject Router for navigation
    private router: Router,
    // Inject UsersService to fetch user data
    private usersService: UsersService
  ) {
    // Initialize the form group
    this.kwmListForm = this.fb.group({});
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    // Fetch all users to populate form dropdowns
    this.usersService.getAll().subscribe(users => {
      this.users = users;
      console.log('Loaded users:', users);
    });
    if (id) {
      // Set updating flag if there's an id
      this.isUpdatingKwmlist = true;
      // Fetch the Kwmlist with the provided id
      this.ev.getKwmlist(id).subscribe(kwmlist => {
        this.kwmlist = kwmlist;
        // Initialize the form with fetched Kwmlist
        this.initKwmlist();
        console.log("Kwmlist: ", this.kwmlist);
      });
    }
    // Reset the Kwmlist
    this.kwmlist = KwmlistFactory.empty();
    // Initialize the form fields
    this.initKwmlist()
  }

  // Initialize or reinitialize the form with validation rules
  initKwmlist() {
    this.kwmListForm = this.fb.group({
      id: this.kwmlist.id,
      listName: [this.kwmlist.listName, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25)
      ]],
      user_id: this.kwmlist.user_id,
      created_at: [this.formatDate(this.kwmlist.created_at)],
      updated_at: [this.formatDate(this.kwmlist.updated_at)]
    });
  }

  // Format dates to YYYY-MM-DD string format
  formatDate(date: Date): string {
    if (!date) return '';
    return new Date(date).toISOString().split('T')[0]; // Konvertiert das Datum in das erforderliche Format YYYY-MM-DD
  }

  // Handle form submissions
  submitForm() {
    // Create Kwmlist from form values
    const kwmlist = KwmlistFactory.fromObject(this.kwmListForm.value);
    console.log("Kwmlist: ", kwmlist);
    if (this.isUpdatingKwmlist) {
      // Update the Kwmlist if updating
      this.ev.update(kwmlist).subscribe(res => {
        this.router.navigate(['/kwmlists', kwmlist.id], {relativeTo: this.route});
      });
    } else {
      // Create a new Kwmlist if not updating
      this.ev.create(kwmlist).subscribe(res => {
        this.kwmlist = KwmlistFactory.empty();
        this.kwmListForm.reset(KwmlistFactory.empty());
        this.router.navigate(['/kwmlists'], {relativeTo: this.route});
      });
    }
  }


}

