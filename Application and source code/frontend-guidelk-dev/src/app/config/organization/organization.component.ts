import {Component, OnInit} from "@angular/core";
import {MatTabChangeEvent} from "@angular/material/tabs";
import {PageTitleService} from "../../core/page-title/page-title.service";

@Component({
    selector: 'app-organization',
    templateUrl: './organization.component.html',
    styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {
    constructor(private pageTitleService: PageTitleService ) { }

    ngOnInit() {
        this.pageTitleService.setTitle('Organization')
    }

    onTabChange(event: MatTabChangeEvent) {
    }
}