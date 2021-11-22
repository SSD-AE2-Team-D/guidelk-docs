import {Component, OnInit} from "@angular/core";
import {MatTabChangeEvent} from "@angular/material/tabs";
import {PageTitleService} from "../../core/page-title/page-title.service";

@Component({
    selector: 'app-module',
    templateUrl: './module.component.html',
    styleUrls: ['./module.component.css']
})
export class ModuleComponent implements OnInit {
    constructor(private pageTitleService: PageTitleService ) { }

    ngOnInit() {
        this.pageTitleService.setTitle('Module')
    }

    onTabChange(event: MatTabChangeEvent) {
    }
}