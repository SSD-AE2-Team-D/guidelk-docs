import {Component, Inject, Input, OnInit, ViewChild, ViewEncapsulation} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CountryService} from "../../../service/data/country.service";
import {LocationService} from "../../../service/data/location.service";
import {CustomerService} from "../../../service/data/customer.service";
import {NgForm} from "@angular/forms";
import {Country} from "../../../masterInfo/country/country";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MasterStatus} from "../../../util/master-status";
import {CustomerVo} from "../customer-vo";
import {Customer} from "../customer";
import {TitleType} from "../../../util/title-type";
import {GenderType} from "../../../util/gender-type";
import {CustomerType} from "../../../util/customer-type";
import {Location} from "../../../masterInfo/location/location";
import {take} from "rxjs/operators";


@Component({
    selector: 'app-customer-search',
    templateUrl: './customer-search.component.html',
    styleUrls: ['./customer-search.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class CustomerSearchComponent implements OnInit {
    @Input() customerVo: CustomerVo;
    @ViewChild('customerSearchForm') customerSearchForm: NgForm;
    dialogRef: MatDialogRef<CustomerDialogComponent>;
    customerInfoTable: Customer[] = [];
    customerInfoTableDataSource = new MatTableDataSource(this.customerInfoTable);
    public displayedColumns = ['CustomerType', 'Title', 'Gender', 'FirstName', 'LastName', 'IdNo', 'PassportNumber',
        'Occupation', 'Country', 'Location', 'CreatedBy', 'CreatedDate', 'LastModifiedBy', 'LastModifiedDate', 'Status', 'Action'];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    statusList: MasterStatus[];
    countryList: Country[];
    locationList: Location[];
    titleTypeList: TitleType[];
    genderTypeList: GenderType[];
    customerTypeList: CustomerType[];


    constructor(private dialog: MatDialog,
                private countryService: CountryService,
                private locationService: LocationService,
                private customerService: CustomerService) {
    }

    ngOnInit() {
        this.customerInfoTableDataSource.paginator = this.paginator;
        this.customerInfoTableDataSource.sort = this.sort;
        if (this.customerVo == null) {
            this.customerVo = new CustomerVo();
        }

        this.customerService.getMasterDataStatus('SEARCH')
            .pipe(take(1)).subscribe(
            response => this.statusList = response
        );

        this.countryService.getCountryList()
            .pipe(take(1)).subscribe(
            response => this.countryList = response
        );

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

    getLocationList() {
        this.locationService.getLocationList(this.customerVo.countryId).pipe(take(1)).subscribe(
            response => this.locationList = response
        );
    }

    applyFilter(val: any) {
        if (val) {
            this.customerInfoTableDataSource.filter = val.trim().toLowerCase();
            if (this.customerInfoTableDataSource.paginator) {
                this.customerInfoTableDataSource.paginator.firstPage();
            }
        }
    }

    openDialog(customer: any) {
        this.dialogRef = this.dialog.open(CustomerDialogComponent, {
            disableClose: false,
            width: 'inherit',
            data: {customer: customer},
            height: '100%'
        });
        this.dialogRef.afterClosed().pipe(take(1))
            .subscribe((customer: Customer[]) => {
                this.searchCustomer();
            });
    }

    public searchCustomer(): void {
        this.customerVo.organizationId = Number(window.sessionStorage.getItem('organizationId'));
        this.customerService.customerSearch(this.customerVo).pipe(take(1))
            .subscribe((customer) => {
                this.customerInfoTable = customer;
                this.customerInfoTableDataSource.data = this.customerInfoTable;
            })
    }
}

@Component({
    selector: 'app-customer-search-modal',
    template: '<app-customer-creation [customer]="data.customer" [isUpdate]="true" [isNew]="false" (onDelete)="closeModal($event)" (onCancel)="closeModal($event)"></app-customer-creation>'
})
export class CustomerDialogComponent {
    constructor(public dialogRef: MatDialogRef<CustomerDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    closeModal(customerId: any) {
        this.dialogRef.close(customerId);
    }

}