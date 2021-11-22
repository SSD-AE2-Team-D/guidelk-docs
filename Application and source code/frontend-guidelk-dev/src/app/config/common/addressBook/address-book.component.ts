import {Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation} from "@angular/core";
import {AddressBook} from "../../../shared/entity/address-book";
import {NgForm} from "@angular/forms";
import {CountryService} from "../../../service/data/country.service";
import {LocationService} from "../../../service/data/location.service";
import {Country} from "../../../masterInfo/country/country";
import {Location} from "../../../masterInfo/location/location";
import {take} from "rxjs/operators";

@Component({
    selector: 'app-address-book',
    templateUrl: './address-book.component.html',
    styleUrls: ['./address-book.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AddressBookComponent implements OnInit {
    @Input() addressBook: AddressBook;
    @Input() isUpdate: Boolean;
    @Output() onDelete: EventEmitter<number> = new EventEmitter<number>();
    @ViewChild('addressBookForm') addressBookForm: NgForm;
    emailPattern = '^(([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5}){1,25})*$';
    countryList: Country[];
    locationList: Location[];

    constructor(private countryService: CountryService,
                private locationService: LocationService) {
    }

    ngOnInit() {
        if (this.addressBook == null) {
            this.addressBook = new AddressBook();
            this.isUpdate = false;
        }

        this.countryService.getCountryList()
            .pipe(take(1)).subscribe(
            response => this.countryList = response
        );

        if (this.addressBook.addressBookId) {
            this.getLocationList();
        }
    }

    getLocationList() {
        this.locationService.getLocationList(this.addressBook.countryId).pipe(take(1)).subscribe(
            response => this.locationList = response
        );
    }

    isNumber(event: KeyboardEvent) {
        const allowedChars = new Set('0123456789'.split('').map(c => c.charCodeAt(0)));
        if (event.keyCode > 31 && !allowedChars.has(event.keyCode)) {
            event.preventDefault();
        }
    }
}