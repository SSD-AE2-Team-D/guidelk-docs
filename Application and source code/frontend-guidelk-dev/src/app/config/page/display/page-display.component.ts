import {Component, Input, OnInit, ViewEncapsulation} from "@angular/core";
import {Page} from "../page";
import {PageService} from "../../../service/data/page.service";
import {RoleService} from "../../../service/data/role.service";
import {take} from "rxjs/operators";

@Component({
    selector: 'page-display',
    templateUrl: './page-display.component.html',
    encapsulation: ViewEncapsulation.None
})
export class PageDisplayComponent implements OnInit {
    @Input() roleId: number;
    @Input() actionType: string;
    @Input() pageList: Page[];
    displayPageList: Page[];

    constructor(private pageService: PageService,
                private roleService: RoleService) {
    }

    ngOnInit() {
        if (this.actionType === 'Create') {
            this.pageService.getPageList().pipe(take(1))
                .subscribe(pageList => this.pageList = pageList);
        }

        if (this.actionType === 'Update') {
            this.pageService.getPageList()
                .pipe(take(1)).subscribe(
                response => {
                    this.pageList = response;
                    if (this.roleId) {
                        this.assignPages(this.pageList);
                    }
                }
            );

        }
    }

    private assignPages(pages: Page[]) {
        this.roleService.getPagesByRoleId(this.roleId).pipe(take(1))
            .subscribe(displayPageList => {
                this.displayPageList = displayPageList;
                if (this.displayPageList) {
                    this.displayPageList.forEach(displayPage => {
                        pages.forEach(page => {
                            if (displayPage.status !== 0) {
                                if (page.pageId === displayPage.pageId) {
                                    page.isAssigned = true;
                                }
                            }

                        })
                    });
                }
            })
    }

    public isUnassigned(): void {
        if (this.pageList.length !== null && this.pageList.length > 0) {
            this.pageList.forEach(page => {
                if (page.isAssigned) {
                    page.isAssigned = false;
                }
            })
        }
    }
}