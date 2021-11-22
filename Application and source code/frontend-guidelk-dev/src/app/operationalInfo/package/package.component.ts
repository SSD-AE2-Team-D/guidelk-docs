import {Component, OnInit} from "@angular/core";
import {MatTabChangeEvent} from "@angular/material/tabs";
import {PageTitleService} from "../../core/page-title/page-title.service";

@Component({
    selector: 'app-package',
    templateUrl: './package.component.html',
})
export class PackageComponent implements OnInit{
    constructor(private pageTitleService: PageTitleService ) { }

    ngOnInit() {
        this.pageTitleService.setTitle('Package')
    }
    onTabChange(event: MatTabChangeEvent) {
    }
}