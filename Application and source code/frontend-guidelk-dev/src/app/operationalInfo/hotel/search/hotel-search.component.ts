import {Component, Inject, Input, OnInit, ViewChild, ViewEncapsulation} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CountryService} from "../../../service/data/country.service";
import {LocationService} from "../../../service/data/location.service";
import {HotelService} from "../../../service/data/hotel.service";
import {NgForm} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MasterStatus} from "../../../util/master-status";
import {Country} from "../../../masterInfo/country/country";
import {Location} from "../../../masterInfo/location/location";
import {HotelVo} from "../hotel-vo";
import {take} from "rxjs/operators";
import {HotelCategoryType} from "../../../util/hotel-category-type";
import {StarGrading} from "../../../util/star-grading";
import {Hotel} from "../hotel";

@Component({
    selector: 'app-hotel-search',
    templateUrl: './hotel-search.component.html',
    styleUrls: ['./hotel-search.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class HotelSearchComponent implements OnInit {
    @Input() hotelVo: HotelVo;
    @ViewChild('hotelSearchForm') hotelSearchForm: NgForm;
    dialogRef: MatDialogRef<HotelDialogComponent>;
    hotelInfoTable: Hotel[] = [];
    hotelInfoTableDataSource = new MatTableDataSource(this.hotelInfoTable);
    public displayedColumns = ['HotelName', 'Category', 'StarGrading', 'Country', 'Location', 'RoomCount', 'DateOfStart',
        'CreatedBy', 'CreatedDate', 'LastModifiedBy', 'LastModifiedDate', 'Status', 'Action'];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    hotelCategoryTypeList: HotelCategoryType[];
    starGradingList: StarGrading[];
    statusList: MasterStatus[];
    countryList: Country[];
    locationList: Location[];

    constructor(private dialog: MatDialog,
                private countryService: CountryService,
                private locationService: LocationService,
                private hotelService: HotelService){
    }

    ngOnInit() {
        this.hotelInfoTableDataSource.paginator = this.paginator;
        this.hotelInfoTableDataSource.sort = this.sort;
        if (this.hotelVo == null) {
            this.hotelVo = new HotelVo();
        }

        this.hotelService.getMasterDataStatus('SEARCH')
            .pipe(take(1)).subscribe(
            response => this.statusList = response
        );

        this.countryService.getCountryList()
            .pipe(take(1)).subscribe(
            response => this.countryList = response
        );

        this.hotelService.getHotelCategoryTypeList()
            .pipe(take(1)).subscribe(
            response => this.hotelCategoryTypeList = response
        );

        this.hotelService.getStarGradingList()
            .pipe(take(1)).subscribe(
            response => this.starGradingList = response
        );
    }

    getLocationList() {
        this.locationService.getLocationList(this.hotelVo.countryId).pipe(take(1)).subscribe(
            response => this.locationList = response
        );
    }

    applyFilter(val: any) {
        if (val) {
            this.hotelInfoTableDataSource.filter = val.trim().toLowerCase();
            if (this.hotelInfoTableDataSource.paginator) {
                this.hotelInfoTableDataSource.paginator.firstPage();
            }
        }
    }

    openDialog(hotel: any) {
        this.dialogRef = this.dialog.open(HotelDialogComponent, {
            disableClose: false,
            width: 'inherit',
            data: {hotel: hotel,
                actionType: 'Update'},
            height: '100%'
        });
        this.dialogRef.afterClosed().pipe(take(1))
            .subscribe((hotel: Hotel[]) => {
                this.searchHotel();
            });
    }

    public searchHotel(): void {
        this.hotelVo.organizationId = Number(window.sessionStorage.getItem('organizationId'));
        this.hotelService.hotelSearch(this.hotelVo).pipe(take(1))
            .subscribe((hotel) => {
                this.hotelInfoTable = hotel;
                this.hotelInfoTableDataSource.data = this.hotelInfoTable;
            })
    }
}

@Component({
    selector: 'app-hotel-search-modal',
    template: '<app-hotel-creation [hotel]="data.hotel" [isUpdate]="true" [isNew]="false" [actionType]="data.actionType" (onDelete)="closeModal($event)" (onCancel)="closeModal($event)"></app-hotel-creation>'
})
export class HotelDialogComponent {
    constructor(public dialogRef: MatDialogRef<HotelDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    closeModal(hotelId: any) {
        this.dialogRef.close(hotelId);
    }

}