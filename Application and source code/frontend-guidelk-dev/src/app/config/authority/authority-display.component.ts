import {Component, Input, OnInit, ViewEncapsulation} from "@angular/core";
import {AuthorityService} from "../../service/data/authority.service";
import {Authority} from "./authority";
import {PageService} from "../../service/data/page.service";
import {take} from "rxjs/operators";

@Component({
    selector: 'authority-display',
    templateUrl: './authority-display.component.html',
    encapsulation: ViewEncapsulation.None
})
export class AuthorityDisplayComponent implements OnInit {

    @Input() pageId: number;
    @Input() actionType: string;
    @Input() authorityList: Authority[];

    constructor(private authorityService: AuthorityService,
                private pageService: PageService) {
    }

    ngOnInit() {
        if (this.actionType === 'Create') {
            this.authorityService.getDefaultAuthorityList().pipe(take(1))
                .subscribe(authorityList => this.authorityList = authorityList);
        }

        if (this.actionType === 'Update') {
            if (this.pageId) {
                this.pageService.getAuthoritiesByPageId(this.pageId).pipe(take(1))
                    .subscribe(authorityList => {
                        this.authorityList = authorityList
                        if (this.authorityList) {
                            if (this.authorityList.length !== null && this.authorityList.length > 0) {
                                this.authorityList.forEach(auth => {
                                    auth.isAssigned = true;
                                })
                            } else {
                                this.authorityService.getDefaultAuthorityList().pipe(take(1))
                                    .subscribe(authorityList => this.authorityList = authorityList);
                            }
                        }
                    });
            }
        }

    }

    public isUnassigned(): void {
        if (this.authorityList.length !== null && this.authorityList.length > 0) {
            this.authorityList.forEach(auth => {
                if (auth.isAssigned) {
                    auth.isAssigned = false;
                }
            })
        }
    }
}