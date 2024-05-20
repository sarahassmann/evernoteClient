import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {KwmlistListComponent} from "./kwmlist-list/kwmlist-list.component";
import {KwmlistDetailsComponent} from "./kwmlist-details/kwmlist-details.component";
import {KwmnoteListComponent} from "./kwmnote-list/kwmnote-list.component";
import {KwmnoteDetailsComponent} from "./kwmnote-details/kwmnote-details.component";
import {KwmtagListComponent} from "./kwmtag-list/kwmtag-list.component";
import {KwmtagDetailsComponent} from "./kwmtag-details/kwmtag-details.component";
import {KwmtodoListComponent} from "./kwmtodo-list/kwmtodo-list.component";
import {KwmtodoDetailsComponent} from "./kwmtodo-details/kwmtodo-details.component";
import {KwmlistFormComponent} from "./kwmlist-form/kwmlist-form.component";
import {LoginComponent} from "./login/login.component";
import {KwmnoteFormComponent} from "./kwmnote-form/kwmnote-form.component";
import {KwmtagFormComponent} from "./kwmtag-form/kwmtag-form.component";
import {KwmtodoFormComponent} from "./kwmtodo-form/kwmtodo-form.component";


// define the routes for the application using the Routes type from the Angular router library
export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'kwmlists', component: KwmlistListComponent},
  {path: 'kwmlists/:id', component: KwmlistDetailsComponent},
  {path: 'kwmnotes', component: KwmnoteListComponent},
  {path: 'kwmnotes/:id', component: KwmnoteDetailsComponent},
  {path: 'kwmtags', component: KwmtagListComponent},
  {path: 'kwmtags/:id', component: KwmtagDetailsComponent},
  {path: 'kwmtodos', component: KwmtodoListComponent},
  {path: 'kwmtodos/:id', component: KwmtodoDetailsComponent},
  {path: 'admin', component: KwmlistFormComponent},
  {path: 'admin/:id', component: KwmlistFormComponent},
  {path: 'login', component: LoginComponent},
  {path: 'noteForm', component: KwmnoteFormComponent},
  {path: 'noteForm/:id', component: KwmnoteFormComponent},
  {path: 'tagForm', component: KwmtagFormComponent},
  {path: 'tagForm/:id', component: KwmtagFormComponent},
  {path: 'todoForm', component: KwmtodoFormComponent},
  {path: 'todoForm/:id', component: KwmtodoFormComponent},
];
