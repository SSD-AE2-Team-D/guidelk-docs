import {Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation} from "@angular/core";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {ModuleService} from "../../../service/data/module.service";
import {RolePermission} from "../../../shared/rolePermission/rolePermission";
import {NgForm} from "@angular/forms";
import {MasterStatus} from "../../../util/master-status";
import {Organization} from "../organization";
import {Module} from "../../module/module";
import {OrganizationService} from "../../../service/data/organization.service";
import {AddressBookComponent} from "../../common/addressBook/address-book.component";
import {take} from "rxjs/operators";
import {ConfirmDialogComponent, ConfirmDialogModel} from "../../../shared/confirm-dialog/confirm-dialog.component";
import {AddressBook} from "../../../shared/entity/address-book";

@Component({
    selector: 'app-organization-creation',
    templateUrl: './organization-creation.component.html',
    styleUrls: ['./organization-creation.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class OrganizationCreationComponent implements OnInit {
    @Input() organization: Organization;
    @Input() isUpdate: Boolean;
    @Input() isNew: Boolean;
    @Output() onDelete: EventEmitter<number> = new EventEmitter<number>();
    @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();
    @ViewChild('addressBookComponent') addressBookComponent: AddressBookComponent;
    @ViewChild('organizationForm') organizationForm: NgForm;
    moduleList: Module[];
    statusList: MasterStatus[];


    constructor(private snackBar: MatSnackBar,
                public dialog: MatDialog,
                private organizationService: OrganizationService,
                private moduleService: ModuleService,
                public rolePermission: RolePermission) {
    }

    ngOnInit() {
        if (this.organization == null) {
            this.organization = new Organization();
            const addressBook = new AddressBook();
            this.organization.addressBook = addressBook;
            this.isUpdate = false;
            this.isNew = false;
        }

        if (this.isUpdate) {
            this.organizationService.getMasterDataStatus('UPDATE')
                .pipe(take(1)).subscribe(
                response => this.statusList = response
            );
        } else {
            this.organizationService.getMasterDataStatus('CREATE')
                .pipe(take(1)).subscribe(
                response => this.statusList = response
            );
        }

        this.moduleService.getUserModuleList()
            .pipe(take(1)).subscribe(
            response => this.moduleList = response
        );
    }

    public resetForm() {
        this.organizationForm.resetForm();
        this.addressBookComponent.addressBookForm.resetForm();
    }

   public createOrganization(): void {

       if (this.organization.addressBook.countryId === undefined || this.organization.addressBook.countryId === null) {
           this.snackBar.open('Country cannot empty', 'Error', <MatSnackBarConfig>{
               duration: 6000,
               panelClass: ['red-snackbar']
           });
           return;
       }

       if (this.organization.addressBook.locationId === undefined || this.organization.addressBook.locationId === null) {
           this.snackBar.open('Location cannot empty', 'Error', <MatSnackBarConfig>{
               duration: 6000,
               panelClass: ['red-snackbar']
           });
           return;
       }

        this.organizationService.postOrganization(this.organization).pipe(take(1)).subscribe((organization) => {
            this.organization = organization;
            this.snackBar.open('Organization Saved', 'success', <MatSnackBarConfig>{
                duration: 3000
            });
            this.isUpdate = true;
            this.isNew = true;
        }, (error) => {
            this.snackBar.open('Organization already exist', "error", <MatSnackBarConfig>{
                panelClass: ['red-snackbar']
            });
        })
    }

    public updateOrganization(): void {
        if (this.organization.addressBook.countryId === undefined || this.organization.addressBook.countryId === null) {
            this.snackBar.open('Country cannot empty', 'Error', <MatSnackBarConfig>{
                duration: 6000,
                panelClass: ['red-snackbar']
            });
            return;
        }

        if (this.organization.addressBook.locationId === undefined || this.organization.addressBook.locationId === null) {
            this.snackBar.open('Location cannot empty', 'Error', <MatSnackBarConfig>{
                duration: 6000,
                panelClass: ['red-snackbar']
            });
            return;
        }
        this.organizationService.putOrganization(this.organization).subscribe(organization => {
            this.organization = organization;
            this.snackBar.open('Organization updated', 'success', <MatSnackBarConfig>{
                duration: 3000
            });
        }, error => {
            this.snackBar.open('Organization already exist', "error", <MatSnackBarConfig>{
                panelClass: ['red-snackbar']
            });
        })
    }

    public deleteOrganization(): void {
        const organizationId = this.organization.organizationId;
        const message = 'Are you sure you want to delete this Organization?';
        const dialogData = new ConfirmDialogModel('Confirm Action', message);
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            maxWidth: '400px',
            data: dialogData
        });
        dialogRef.afterClosed().subscribe(dialogResult => {
            this.organizationService.deleteOrganization(this.organization).subscribe(organization => {
                this.snackBar.open('Organization deleted', 'success', {
                    duration: 3000
                });
                this.isUpdate = false;
                this.isNew = false;
                this.onDelete.emit(organizationId);
                this.resetForm();
                this.organization.organizationId = null;
            }, error => {
                this.snackBar.open(error.error, 'error', <MatSnackBarConfig>{
                    panelClass: ['red-snackbar']
                });
            });
        });

    }

}