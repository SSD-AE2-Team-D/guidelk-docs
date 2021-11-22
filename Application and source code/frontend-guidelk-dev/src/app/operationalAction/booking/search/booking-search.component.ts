import {Component, OnInit, ViewChild, ViewEncapsulation} from "@angular/core";
import {NgForm} from "@angular/forms";

@Component({
    selector: 'app-booking-search',
    templateUrl: './booking-search.component.html',
    styleUrls: ['./booking-search.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class BookingSearchComponent implements OnInit{
    @ViewChild('bookingSearchForm') bookingSearchForm: NgForm;
    selectedIndex = 0;
    constructor() { }

    ngOnInit() {
    }
}