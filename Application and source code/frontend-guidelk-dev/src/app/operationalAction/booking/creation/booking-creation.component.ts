import {Component, OnInit, ViewChild, ViewEncapsulation} from "@angular/core";
import {NgForm} from "@angular/forms";
@Component({
    selector: 'app-booking-creation',
    templateUrl: './booking-creation.component.html',
    styleUrls: ['./booking-creation.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class BookingCreationComponent implements OnInit{
    @ViewChild('bookingForm') packageForm: NgForm;
    selectedIndex = 0;
    constructor() { }

    ngOnInit() {
    }
}