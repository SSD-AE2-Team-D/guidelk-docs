import {Component, Inject, Input, OnInit, ViewChild, ViewEncapsulation} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CountryService} from "../../../service/data/country.service";
import {NgForm} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MasterStatus} from "../../../util/master-status";
import {CountryVo} from "../country-vo";
import {Country} from "../country";
import {take} from "rxjs/operators";

@Component({
    selector: 'app-country-search',
    templateUrl: './country-search.component.html',
    styleUrls: ['./country-search.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class CountrySearchComponent implements OnInit {
    @Input() countryVo: CountryVo;
    @ViewChild('countrySearchForm') countrySearchForm: NgForm;
    dialogRef: MatDialogRef<CountryDialogComponent>;
    countryInfoTable: Country[] = [];
    countryInfoTableDataSource = new MatTableDataSource(this.countryInfoTable);
    public displayedColumns = ['CountryName', 'CountryCode', 'CreatedBy', 'CreatedDate', 'LastModifiedBy', 'LastModifiedDate', 'Status', 'Action'];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    statusList: MasterStatus[];

    constructor(private dialog: MatDialog,
                private countryService: CountryService) {
    }

    ngOnInit() {
        this.countryInfoTableDataSource.paginator = this.paginator;
        this.countryInfoTableDataSource.sort = this.sort;
        if (this.countryVo == null) {
            this.countryVo = new CountryVo();
        }

        this.countryService.getMasterDataStatus('SEARCH')
            .pipe(take(1)).subscribe(
            response => this.statusList = response
        );

    }

    applyFilter(val: any) {
        if (val) {
            this.countryInfoTableDataSource.filter = val.trim().toLowerCase();
            if (this.countryInfoTableDataSource.paginator) {
                this.countryInfoTableDataSource.paginator.firstPage();
            }
        }

    }

    openDialog(country: any) {
        this.dialogRef = this.dialog.open(CountryDialogComponent, {
            disableClose: false,
            width: 'inherit',
            data: {countryData: country},
            height: '75%'
        });
        this.dialogRef.afterClosed().pipe(take(1))
            .subscribe((page: Country[]) => {
                this.searchCountry();
            });
    }

    public searchCountry(): void {
        this.countryService.countrySearch(this.countryVo).pipe(take(1))
            .subscribe((country) => {
                this.countryInfoTable = country;
                this.countryInfoTableDataSource.data = this.countryInfoTable;
            })
    }
}

@Component({
    selector: 'app-country-search-modal',
    template: '<app-country-creation [country]="data.countryData" [isUpdate]="true" [isNew]="false" (onDelete)="closeModal($event)" (onCancel)="closeModal($event)"></app-country-creation>'
})
export class CountryDialogComponent {
    constructor(public dialogRef: MatDialogRef<CountryDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    closeModal(countryId: any) {
        this.dialogRef.close(countryId);
    }

}