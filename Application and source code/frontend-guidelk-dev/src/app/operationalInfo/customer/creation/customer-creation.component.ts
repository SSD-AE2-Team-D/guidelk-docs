import {Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation} from "@angular/core";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {RolePermission} from "../../../shared/rolePermission/rolePermission";
import {CustomerService} from "../../../service/data/customer.service";
import {AddressBookComponent} from "../../../config/common/addressBook/address-book.component";
import {NgForm} from "@angular/forms";
import {Customer} from "../customer";
import {MasterStatus} from "../../../util/master-status";
import {TitleType} from "../../../util/title-type";
import {GenderType} from "../../../util/gender-type";
import {CustomerType} from "../../../util/customer-type";
import {AddressBook} from "../../../shared/entity/address-book";
import {take} from "rxjs/operators";
import {ConfirmDialogComponent, ConfirmDialogModel} from "../../../shared/confirm-dialog/confirm-dialog.component";

@Component({
    selector: 'app-customer-creation',
    templateUrl: './customer-creation.component.html',
    styleUrls: ['./customer-creation.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class CustomerCreationComponent implements OnInit {
    @Input() customer: Customer;
    @Input() isUpdate: Boolean;
    @Input() isNew: Boolean;
    @Output() onDelete: EventEmitter<number> = new EventEmitter<number>();
    @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();
    @ViewChild('addressBookComponent') addressBookComponent: AddressBookComponent;
    @ViewChild('customerForm') customerForm: NgForm;
    statusList: MasterStatus[];
    titleTypeList: TitleType[];
    genderTypeList: GenderType[];
    customerTypeList: CustomerType[];

    constructor(private snackBar: MatSnackBar,
                public dialog: MatDialog,
                private customerService: CustomerService,
                public rolePermission: RolePermission) {
    }

    ngOnInit() {
        if (this.customer == null) {
            this.customer = new Customer();
            const addressBook = new AddressBook();
            this.customer.addressBook = addressBook;
            this.isUpdate = false;
            this.isNew = false;
        }

        if (this.isUpdate) {
            this.customerService.getMasterDataStatus('UPDATE')
                .pipe(take(1)).subscribe(
                response => this.statusList = response
            );
        } else {
            this.customerService.getMasterDataStatus('CREATE')
                .pipe(take(1)).subscribe(
                response => this.statusList = response
            );
        }

        this.customerService.getTitleList()
            .pipe(take(1)).subscribe(
            response => this.titleTypeList = response
        );

        this.customerService.getGenderList()
            .pipe(take(1)).subscribe(
            response => this.genderTypeList = response
        );

        this.customerService.getCustomerTypeList()
            .pipe(take(1)).subscribe(
            response => this.customerTypeList = response
        );
    }

    public resetForm() {
        this.customerForm.resetForm();
        this.addressBookComponent.addressBookForm.resetForm();
    }

    public createCustomer(): void {
        if (this.customer.customerTypeId === 1) {
            if (this.customer.identificationNumber === undefined) {
                this.snackBar.open('ID number cannot empty', 'Error', <MatSnackBarConfig>{
                    duration: 6000,
                    panelClass: ['red-snackbar']
                });
                return;
            }
        }
        if (this.customer.customerTypeId === 2) {
            if (this.customer.passportNumber === undefined) {
                this.snackBar.open('Passport number cannot empty', 'Error', <MatSnackBarConfig>{
                    duration: 6000,
                    panelClass: ['red-snackbar']
                });
                return;
            }
        }

        if (this.customer.addressBook.countryId === undefined || this.customer.addressBook.countryId === null) {
            this.snackBar.open('Country cannot empty', 'Error', <MatSnackBarConfig>{
                duration: 6000,
                panelClass: ['red-snackbar']
            });
            return;
        }

        if (this.customer.addressBook.locationId === undefined || this.customer.addressBook.locationId === null) {
            this.snackBar.open('Location cannot empty', 'Error', <MatSnackBarConfig>{
                duration: 6000,
                panelClass: ['red-snackbar']
            });
            return;
        }

        this.customer.organizationId = Number(window.sessionStorage.getItem('organizationId'));
        this.customerService.postCustomer(this.customer).pipe(take(1)).subscribe((customer) => {
            this.customer = customer;
            this.snackBar.open('Customer Saved', 'success', <MatSnackBarConfig>{
                duration: 3000
            });
            this.isUpdate = true;
            this.isNew = true;
        }, (error) => {
            this.snackBar.open('Customer already exist', "error", <MatSnackBarConfig>{
                panelClass: ['red-snackbar']
            });
        })

    }

    public updateCustomer(): void {
        if (this.customer.customerTypeId === 1) {
            if (this.customer.identificationNumber === null) {
                this.snackBar.open('ID number cannot empty', 'Error', <MatSnackBarConfig>{
                    duration: 6000,
                    panelClass: ['red-snackbar']
                });
                return;
            }
        }
        if (this.customer.customerTypeId === 2) {
            if (this.customer.passportNumber === null) {
                this.snackBar.open('Passport number cannot empty', 'Error', <MatSnackBarConfig>{
                    duration: 6000,
                    panelClass: ['red-snackbar']
                });
                return;
            }
        }

        if (this.customer.addressBook.countryId === undefined || this.customer.addressBook.countryId === null) {
            this.snackBar.open('Country cannot empty', 'Error', <MatSnackBarConfig>{
                duration: 6000,
                panelClass: ['red-snackbar']
            });
            return;
        }

        if (this.customer.addressBook.locationId === undefined || this.customer.addressBook.locationId === null) {
            this.snackBar.open('Location cannot empty', 'Error', <MatSnackBarConfig>{
                duration: 6000,
                panelClass: ['red-snackbar']
            });
            return;
        }

        this.customerService.putCustomer(this.customer).subscribe(customer => {
            this.customer = customer;
            this.snackBar.open('Customer updated', 'success', <MatSnackBarConfig>{
                duration: 3000
            });
        }, error => {
            this.snackBar.open('Customer already exist', "error", <MatSnackBarConfig>{
                panelClass: ['red-snackbar']
            });
        })

    }

    public deleteCustomer(): void {
        const customerId = this.customer.customerId;
        const message = 'Are you sure you want to delete this Customer?';
        const dialogData = new ConfirmDialogModel('Confirm Action', message);
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            maxWidth: '400px',
            data: dialogData
        });
        dialogRef.afterClosed().subscribe(dialogResult => {
            this.customerService.deleteCustomer(this.customer).subscribe(customer => {
                this.snackBar.open('Customer deleted', 'success', {
                    duration: 3000
                });
                this.isUpdate = false;
                this.isNew = false;
                this.onDelete.emit(customerId);
                this.resetForm();
                this.customer.customerId = null;
            }, error => {
                this.snackBar.open(error.error, 'error', <MatSnackBarConfig>{
                    panelClass: ['red-snackbar']
                });
            });
        });

    }

}