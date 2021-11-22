import {Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation} from "@angular/core";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {PageService} from "../../../service/data/page.service";
import {Module} from "../../module/module";
import {NgForm} from "@angular/forms";
import {MasterStatus} from "../../../util/master-status";
import {take} from "rxjs/operators";
import {Page} from "../page";
import {ModuleService} from "../../../service/data/module.service";
import {AuthorityService} from "../../../service/data/authority.service";
import {RolePermission} from "../../../shared/rolePermission/rolePermission";
import {Authority} from "../../authority/authority";
import {AuthorityDisplayComponent} from "../../authority/authority-display.component";
import {ConfirmDialogComponent, ConfirmDialogModel} from "../../../shared/confirm-dialog/confirm-dialog.component";

@Component({
    selector: 'app-page-creation',
    templateUrl: './page-creation.component.html',
    styleUrls: ['./page-creation.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class PageCreationComponent implements OnInit {
    @Input() page: Page;
    @Input() isUpdate: Boolean;
    @Input() isNew: Boolean;
    @Input() actionType: string;
    @Input() isDisabled: boolean = false;
    @Output() onDelete: EventEmitter<number> = new EventEmitter<number>();
    @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();
    @ViewChild('pageForm') pageForm: NgForm;
    statusList: MasterStatus[];
    moduleList: Module[];
    defaultAuthorityList: Authority[];
    @ViewChild(AuthorityDisplayComponent) authorityDisplayComponent: AuthorityDisplayComponent;

    constructor(private snackBar: MatSnackBar,
                public dialog: MatDialog,
                private pageService: PageService,
                private moduleService: ModuleService,
                private authorityService: AuthorityService,
                public rolePermission: RolePermission) {
    }

    ngOnInit() {
        if (this.page == null) {
            this.page = new Page();
            this.isUpdate = false;
            this.isNew = false;
            this.actionType = 'Create';
        }

        if (this.isUpdate) {
            this.pageService.getMasterDataStatus('UPDATE')
                .pipe(take(1)).subscribe(
                response => this.statusList = response
            );
        } else {
            this.pageService.getMasterDataStatus('CREATE')
                .pipe(take(1)).subscribe(
                response => this.statusList = response
            );
        }

        this.moduleService.getUserModuleList()
            .pipe(take(1)).subscribe(
            response => this.moduleList = response
        );

        this.authorityService.getDefaultAuthorityList().pipe(take(1))
            .subscribe(authorityList => this.defaultAuthorityList = authorityList);
    }

    public resetForm() {
        this.pageForm.resetForm();
        this.authorityDisplayComponent.isUnassigned();
        this.isDisabled = false;
    }

    public createPage(): void {
        const authorityList: Authority[] = [];

        this.authorityDisplayComponent.authorityList.forEach(defaultAuthority => {
            if (defaultAuthority.isAssigned) {
                const authority = new Authority();
                authority.authorityName = defaultAuthority.authorityName;
                authority.authorityId = defaultAuthority.authorityId;
                authorityList.push(authority);
            }
        });

        this.page.authorities = authorityList;
        this.pageService.postPage(this.page).pipe(take(1)).subscribe((page) => {
            this.page = page;
            this.snackBar.open('Page Saved', 'success', <MatSnackBarConfig>{
                duration: 3000
            });
            this.isUpdate = true;
            this.isNew = true;
            this.isDisabled = true;
        }, (error) => {
            this.snackBar.open('Page already exist', "error", <MatSnackBarConfig>{
                panelClass: ['red-snackbar']
            });
        })
    }

    public updatePage(): void {
        const authorityList: Authority[] = [];
        this.authorityDisplayComponent.authorityList.forEach(defaultAuthority => {
            if (defaultAuthority.isAssigned) {
                const authority = new Authority();
                authority.authorityName = defaultAuthority.authorityName;
                authority.authorityId = defaultAuthority.authorityId;
                authorityList.push(authority);
            }
        });

        this.page.authorities = authorityList;
        this.pageService.putPage(this.page).subscribe(page => {
            this.page = page;
            this.snackBar.open('Page updated', 'success', <MatSnackBarConfig>{
                duration: 3000
            });
        }, error => {
            this.snackBar.open('Page already exist', "error", <MatSnackBarConfig>{
                panelClass: ['red-snackbar']
            });
        })
    }

    public deletePage(): void {
        const pageId = this.page.pageId;
        const message = 'Are you sure you want to delete this Page?';
        const dialogData = new ConfirmDialogModel('Confirm Action', message);
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            maxWidth: '400px',
            data: dialogData
        });
        dialogRef.afterClosed().subscribe(dialogResult => {
            this.pageService.deletePage(this.page).subscribe(page => {
                this.snackBar.open('Page deleted', 'success', {
                    duration: 3000
                });
                this.isUpdate = false;
                this.isNew = false;
                this.onDelete.emit(pageId);
                this.resetForm();
                this.page.pageId = null;
            }, error => {
                this.snackBar.open(error.error, 'error', <MatSnackBarConfig>{
                    panelClass: ['red-snackbar']
                });
            });
        });
    }
}