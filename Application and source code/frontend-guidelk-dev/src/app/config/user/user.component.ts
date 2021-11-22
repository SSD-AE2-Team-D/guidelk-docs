import {Component, OnInit} from "@angular/core";
import {MatTabChangeEvent} from "@angular/material/tabs";
import {PageTitleService} from "../../core/page-title/page-title.service";

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
})
export class UserComponent implements OnInit{
    constructor(private pageTitleService: PageTitleService ) { }

    ngOnInit() {
        this.pageTitleService.setTitle('User')
    }

    onTabChange(event: MatTabChangeEvent) {
    }
}