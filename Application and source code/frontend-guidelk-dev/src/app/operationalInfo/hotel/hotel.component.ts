import {Component, OnInit} from "@angular/core";
import {MatTabChangeEvent} from "@angular/material/tabs";
import {PageTitleService} from "../../core/page-title/page-title.service";

@Component({
    selector: 'app-hotel',
    templateUrl: './hotel.component.html',
})
export class HotelComponent implements OnInit{
    constructor(private pageTitleService: PageTitleService ) { }

    ngOnInit() {
        this.pageTitleService.setTitle('Hotel')
    }
    onTabChange(event: MatTabChangeEvent) {
    }
}