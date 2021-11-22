import {Component, OnInit, ViewChild, ViewEncapsulation} from "@angular/core";
import {NgForm} from "@angular/forms";

@Component({
    selector: 'app-hotel-package-creation',
    templateUrl: './package-creation.component.html',
    styleUrls: ['./package-creation.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class PackageCreationComponent implements OnInit{
    @ViewChild('packageForm') packageForm: NgForm;
    selectedIndex = 0;
    constructor() { }

    ngOnInit() {
    }
}