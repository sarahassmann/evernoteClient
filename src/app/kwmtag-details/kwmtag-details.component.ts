import { Component, OnInit } from '@angular/core';
import { Kwmtag } from '../shared/kwmtag';
import {DatePipe} from "@angular/common";
import {KwmTagService} from "../shared/kwm-tag.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {KwmtagFactory} from "../shared/kwmtag-factory";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../shared/auth.service";

@Component({
  selector: 'ev-kwmtag-details',
  standalone: true,
  imports: [
    DatePipe,
    RouterLink
  ],
  templateUrl: './kwmtag-details.component.html',
  styles: ``
})
export class KwmtagDetailsComponent implements OnInit{
  // Initialize kwmtag as an empty object using the factory method
  kwmtag: Kwmtag = KwmtagFactory.empty();

  constructor(
    private KwmTagService: KwmTagService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    // Fetch the kwmtag ID from route parameters and load kwmtag data
    this.route.params.subscribe(params => {
      const id = +params['id'];
      // Fetch kwmtag data using the service
      this.KwmTagService.getKwmtag(id).subscribe(kwmtag => this.kwmtag = kwmtag);
    });
  }

  // Method to handle the deletion of a kwmtag
  removeKwmtags() {
    // Confirm before proceeding with the deletion
    if (confirm('Are you sure?')) {
      this.KwmTagService.remove(this.kwmtag.id).subscribe({
        // Navigate back to the parent route
        next: () => {this.router.navigate(['../'], {relativeTo: this.route})
          // Show success notification
          this.toastr.success('KwmTag successfully deleted', 'Success');
        }
      });
    }
  }
}
