import {Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation} from "@angular/core";
import {NgForm} from "@angular/forms";
import {MasterStatus} from "../../../util/master-status";
import {Role} from "../role";
import {PageDisplayComponent} from "../../page/display/page-display.component";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {RolePermission} from "../../../shared/rolePermission/rolePermission";
import {PageService} from "../../../service/data/page.service";
import {RoleService} from "../../../service/data/role.service";
import {Page} from "../../page/page";
import {take} from "rxjs/operators";
import {ConfirmDialogComponent, ConfirmDialogModel} from "../../../shared/confirm-dialog/confirm-dialog.component";

@Component({
    selector: 'app-role-creation',
    templateUrl: './role-creation.component.html',
    styleUrls: ['./role-creation.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class RoleCreationComponent implements OnInit {
    @Input() role: Role;
    @Input() isUpdate: Boolean;
    @Input() isNew: Boolean;
    @Input() actionType: string;
    @Input() isDisabled: boolean = false;
    @Output() onDelete: EventEmitter<number> = new EventEmitter<number>();
    @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();
    @ViewChild('roleForm') roleForm: NgForm;
    statusList: MasterStatus[];
    pageList: Page[];
    @ViewChild(PageDisplayComponent) pageDisplayComponent: PageDisplayComponent;


    constructor(private snackBar: MatSnackBar,
                public dialog: MatDialog,
                private pageService: PageService,
                private roleService: RoleService,
                public rolePermission: RolePermission) {

    }

    ngOnInit() {
        if (this.role == null) {
            this.role = new Role();
            this.isUpdate = false;
            this.isNew = false;
            this.actionType = 'Create';
        }

        if (this.isUpdate) {
            this.roleService.getMasterDataStatus('UPDATE')
                .pipe(take(1)).subscribe(
                response => this.statusList = response
            );
        } else {
            this.roleService.getMasterDataStatus('CREATE')
                .pipe(take(1)).subscribe(
                response => this.statusList = response
            );
        }

        this.pageService.getPageList().pipe(take(1))
            .subscribe(pageList => this.pageList = pageList);
    }

    public resetForm() {
        this.roleForm.resetForm();
        this.pageDisplayComponent.isUnassigned();
        this.isDisabled = false;
    }

    public createRole(): void {
        const pageList: Page[] = [];
        this.pageDisplayComponent.pageList.forEach(selectedPage => {
            if (selectedPage.isAssigned) {
                const page = new Page();
                page.pageId = selectedPage.pageId;
                page.pageName = selectedPage.pageName;
                page.moduleId = selectedPage.moduleId;
                page.urlPattern = selectedPage.urlPattern;
                page.orderIndex = selectedPage.orderIndex;
                page.icon = selectedPage.icon;
                page.status = selectedPage.status;
                pageList.push(page);
            }
        });

        this.role.pages = pageList;

        this.roleService.postRole(this.role).pipe(take(1)).subscribe((role) => {
            this.role = role;
            this.snackBar.open('Role Saved', 'success', <MatSnackBarConfig>{
                duration: 3000
            });
            this.isUpdate = true;
            this.isNew = true;
            this.isDisabled = true;
        }, (error) => {
            this.snackBar.open('Role already exist', "error", <MatSnackBarConfig>{
                panelClass: ['red-snackbar']
            });
        })
    }

    public updateRole(): void {
        const pageList: Page[] = [];
        this.pageDisplayComponent.pageList.forEach(selectedPage => {
            if (selectedPage.isAssigned) {
                const page = new Page();
                page.pageId = selectedPage.pageId;
                page.pageName = selectedPage.pageName;
                page.moduleId = selectedPage.moduleId;
                page.urlPattern = selectedPage.urlPattern;
                page.orderIndex = selectedPage.orderIndex;
                page.icon = selectedPage.icon;
                page.status = selectedPage.status;
                pageList.push(page);
            }
        });

        this.role.pages = pageList;
        this.roleService.putRole(this.role).subscribe(role => {
            this.role = role;
            this.snackBar.open('Role updated', 'success', <MatSnackBarConfig>{
                duration: 3000
            });
        }, error => {
            this.snackBar.open('Role already exist', "error", <MatSnackBarConfig>{
                panelClass: ['red-snackbar']
            });
        })
    }

    public deletePage(): void {
        const roleId = this.role.roleId;
        const message = 'Are you sure you want to delete this Role?';
        const dialogData = new ConfirmDialogModel('Confirm Action', message);
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            maxWidth: '400px',
            data: dialogData
        });
        dialogRef.afterClosed().subscribe(dialogResult => {
            this.roleService.deleteRole(this.role).subscribe(page => {
                this.snackBar.open('Role deleted', 'success', {
                    duration: 3000
                });
                this.isUpdate = false;
                this.isNew = false;
                this.onDelete.emit(roleId);
                this.resetForm();
                this.role.roleId = null;
            }, error => {
                this.snackBar.open(error.error, 'error', <MatSnackBarConfig>{
                    panelClass: ['red-snackbar']
                });
            });
        });
    }

}