import {Component, Inject, Input, OnInit, ViewChild, ViewEncapsulation} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CountryService} from "../../../service/data/country.service";
import {LocationService} from "../../../service/data/location.service";
import {NgForm} from "@angular/forms";
import {Country} from "../../country/country";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MasterStatus} from "../../../util/master-status";
import {LocationVo} from "../location-vo";
import {take} from "rxjs/operators";
import {Location} from "../location";

@Component({
    selector: 'app-location-search',
    templateUrl: './location-search.component.html',
    styleUrls: ['./location-search.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class LocationSearchComponent implements OnInit {
    @Input() locationVo: LocationVo;
    @ViewChild('locationSearchForm') locationSearchForm: NgForm;
    dialogRef: MatDialogRef<LocationDialogComponent>;
    locationInfoTable: Location[] = [];
    locationInfoTableDataSource = new MatTableDataSource(this.locationInfoTable);
    public displayedColumns = ['LocationName', 'LocationCode', 'CreatedBy', 'CreatedDate', 'LastModifiedBy', 'LastModifiedDate', 'Status', 'Action'];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    countryList: Country[];
    statusList: MasterStatus[];

    constructor(private dialog: MatDialog,
                private countryService: CountryService,
                private locationService: LocationService) {
    }

    ngOnInit() {
        this.locationInfoTableDataSource.paginator = this.paginator;
        this.locationInfoTableDataSource.sort = this.sort;
        if (this.locationVo == null) {
            this.locationVo = new LocationVo();
        }

        this.locationService.getMasterDataStatus('SEARCH')
            .pipe(take(1)).subscribe(
            response => this.statusList = response
        );

        this.countryService.getCountryList()
            .pipe(take(1)).subscribe(
            response => this.countryList = response
        );
    }

    applyFilter(val: any) {
        if (val) {
            this.locationInfoTableDataSource.filter = val.trim().toLowerCase();
            if (this.locationInfoTableDataSource.paginator) {
                this.locationInfoTableDataSource.paginator.firstPage();
            }
        }

    }

    openDialog(location: any) {
        this.dialogRef = this.dialog.open(LocationDialogComponent, {
            disableClose: false,
            width: 'inherit',
            data: {locationData: location},
            height: '75%'
        });
        this.dialogRef.afterClosed().pipe(take(1))
            .subscribe((page: Location[]) => {
                this.searchLocation();
            });
    }

    public searchLocation(): void {
        this.locationService.locationSearch(this.locationVo).pipe(take(1))
            .subscribe((location) => {
                this.locationInfoTable = location;
                this.locationInfoTableDataSource.data = this.locationInfoTable;
            })
    }
}

@Component({
    selector: 'app-location-search-modal',
    template: '<app-location-creation [location]="data.locationData" [isUpdate]="true" [isNew]="false" (onDelete)="closeModal($event)" (onCancel)="closeModal($event)"></app-location-creation>'
})
export class LocationDialogComponent {
    constructor(public dialogRef: MatDialogRef<LocationDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    closeModal(locationId: any) {
        this.dialogRef.close(locationId);
    }

}