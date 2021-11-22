import {Component, OnInit} from "@angular/core";
import {MatTabChangeEvent} from "@angular/material/tabs";
import {PageTitleService} from "../../core/page-title/page-title.service";

@Component({
    selector: 'app-page',
    templateUrl: './page.component.html',
})
export class PageComponent implements OnInit{

    constructor(private pageTitleService: PageTitleService ) { }

    ngOnInit() {
        this.pageTitleService.setTitle('Page')
    }
    onTabChange(event: MatTabChangeEvent) {
    }
}