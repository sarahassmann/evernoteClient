import {Component, OnInit} from '@angular/core';
import {Kwmnote, Kwmtag} from '../shared/kwmnote';
import {CommonModule, DatePipe} from '@angular/common';
import { KwmNoteService } from '../shared/kwm-note.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {KwmnoteFactory} from "../shared/kwmnote-factory";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../shared/auth.service";

@Component({
  selector: 'ev-kwmnote-details',
  standalone: true,
  imports: [
    DatePipe,
    RouterLink,
    CommonModule
  ],
  templateUrl: './kwmnote-details.component.html',
  // styling only for this component (scoped)
  styles: `
    .ui.container {
      max-width: 1200px;
      margin: 20px auto;
      padding: 20px;
    }
    .ui.header {
      font-size: 2em;  /* Larger heading at the top */
      color: #333;
    }
    .ui.grid .ui.header {
      font-size: 1.2em;  /* Smaller for sub-headings */
    }
    .ui.grid {
      margin-top: 10px;
    }
    .ui.divider {
      margin: 20px 0;
    }
    .ui.button {
      margin-top: 20px;
    }`
})
export class KwmnoteDetailsComponent implements OnInit {
  // Initializing the note as empty
  kwmnote: Kwmnote = KwmnoteFactory.empty()
  // Optional array of tags, initially empty
  tags?: Kwmtag[] = [];

  constructor(
    private KwmNoteService: KwmNoteService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    // On component initialization, fetch the note ID from route parameters
    this.route.params.subscribe(params => {
      // Convert the 'id' parameter to a number
      const id = +params['id'];
      // Fetch the note details from the server using the note ID
      this.KwmNoteService.getKwmnote(id).subscribe(kwmnote => this.kwmnote = kwmnote);
    });
  }

  // Method to handle the deletion of a note
  removeKwmnotes() {
    // Show a confirmation dialog before deletion
    if (confirm('Are you sure?')) {
      // If confirmed, call the delete method on the note service
      this.KwmNoteService.remove(this.kwmnote.id).subscribe({
        // Navigate back to the parent route upon successful deletion
        next: () => {this.router.navigate(['../'], {relativeTo: this.route})
        this.toastr.success('Kwmnote successfully removed', 'Success');}
      });
    }
  }
}
