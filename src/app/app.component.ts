import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {KwmlistListComponent} from "./kwmlist-list/kwmlist-list.component";
import {KwmlistDetailsComponent} from "./kwmlist-details/kwmlist-details.component";
import {AuthService} from "./shared/auth.service";

@Component({
  selector: 'ev-root',
  standalone: true,
  imports: [
    RouterOutlet,
    KwmlistListComponent,
    KwmlistDetailsComponent,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './app.component.html',
})

export class AppComponent {
  title = 'evernote24';
  constructor(private authService: AuthService) {
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  getLoginLabel() {
    return this.isLoggedIn() ? 'Logout' : 'Login';
  }
}
