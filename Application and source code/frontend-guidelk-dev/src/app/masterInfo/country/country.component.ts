import {Component, OnInit} from "@angular/core";
import {MatTabChangeEvent} from "@angular/material/tabs";
import {PageTitleService} from "../../core/page-title/page-title.service";

@Component({
    selector: 'app-country',
    templateUrl: './country.component.html',
})
export class CountryComponent implements OnInit{
    constructor(private pageTitleService: PageTitleService ) { }

    ngOnInit() {
        this.pageTitleService.setTitle('Country')
    }
    onTabChange(event: MatTabChangeEvent) {
    }
}