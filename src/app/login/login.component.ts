import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../shared/auth.service";

interface Response {
  access_token: string;
}

@Component({
  selector: 'ev-login',  // The name used in HTML to instantiate this component.
  standalone: true,  // This component does not need any external Angular modules.
  imports: [
    ReactiveFormsModule  // Import ReactiveFormsModule for form functionality.
  ],
  templateUrl: './login.component.html',  // Links to the HTML template for this component.
  styles: `
    .login-container {
      width: 100%;
      max-width: 400px; /* Limit the form width for better aesthetics */
      margin: 0 auto; /* Center the form horizontally */
      padding: 20px; /* Add padding around the form for spacing */
    }

    .ui.form .field label {
      color: #333; /* Set a dark color for label text */
    }

    .ui.form .field input[type=email], .ui.form .field input[type=password] {
      width: 100%; /* Ensure input fields use the full available width */
    }

    .ui.button {
      width: 100%; /* Make button use full width for consistency */
      background-color: #4183c4; /* Blue background for the button */
      color: white; /* White text on the button */
    }

    .ui.negative.message {
      margin-top: 5px; /* Small top margin for spacing after the input fields */
      font-size: 0.9em; /* Slightly smaller text for error messages */
    }`
})
export class LoginComponent  {
  loginForm: FormGroup; // FormGroup to handle form controls and validation.

  // Constructor injects FormBuilder for creating form groups, Router for navigation, and AuthService for authentication.
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    // Initialize the form group with username and password fields, including validators.
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]], // Requires a valid email as username.
      password: ['', [Validators.required]] // Requires password to be entered.
    });
  }

  // Method to handle login when form is submitted.
  login() {
    const val = this.loginForm.value; // Retrieve form values.
    // Call AuthService to perform login.
    this.authService.login(val.username, val.password).subscribe((res:any) => {
      // On successful login, store the access token in session storage.
      this.authService.setSessionStorage((res as Response).access_token);
      // Redirect to the home page after login.
      this.router.navigateByUrl('/');
    });
  }

  // Helper method to check if the user is logged in.
  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  // Method to log out the user.
  logout() {
    this.authService.logout();
  }
}
