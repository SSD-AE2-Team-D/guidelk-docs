import {Component, OnInit, ViewChild, ViewEncapsulation} from "@angular/core";
import {NgForm} from "@angular/forms";

@Component({
    selector: 'app-hotel-package-search',
    templateUrl: './package-search.component.html',
    styleUrls: ['./package-search.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class PackageSearchComponent implements OnInit{
    @ViewChild('packageSearchForm') packageSearchForm: NgForm;
    selectedIndex = 0;
    constructor() { }

    ngOnInit() {
    }
}