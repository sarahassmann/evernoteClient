import {Component, OnInit} from '@angular/core';
import {Kwmlist} from "../shared/kwmlist";
import {DatePipe} from "@angular/common";
import {KwmListService} from "../shared/kwm-list.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {KwmlistFactory} from "../shared/kwmlist-factory";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../shared/auth.service";

@Component({
  selector: 'ev-kwmlist-details',
  standalone: true,
  imports: [
    DatePipe,
    RouterLink
  ],
  templateUrl: './kwmlist-details.component.html',
  styles: ``
})
export class KwmlistDetailsComponent implements OnInit {
  kwmlist: Kwmlist = KwmlistFactory.empty();


  // Constructor to inject dependencies
  constructor(
    private KwmListService: KwmListService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    public authService: AuthService
  ) {}

  // initialize the component by subscribing to the route params and fetching the kwmlist
  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id']; // Konvertiere die 'id' aus den Params in eine Zahl
      this.KwmListService.getKwmlist(id).subscribe(kwmlist => this.kwmlist = kwmlist);
    });
  }

  // Method to remove a Kwmlist.
  removeKwmlist() {
    if (confirm('Are you sure?')) {
      this.KwmListService.remove(this.kwmlist.id).subscribe({
        next: () => {this.router.navigate(['../'], {relativeTo: this.route})
        this.toastr.success('Kwmlist successfully removed', 'Success');},
      });
    }
  }


}
