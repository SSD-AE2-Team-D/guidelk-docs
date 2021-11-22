import {Component, Inject, Input, OnInit, ViewChild, ViewEncapsulation} from "@angular/core";
import {HotelBookingVo} from "../hotel-booking-vo";
import {NgForm} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Hotel} from "../../../../operationalInfo/hotel/hotel";
import {RoomType} from "../../../../operationalInfo/hotel/room-type";
import {MasterStatus} from "../../../../util/master-status";
import {HotelPackageActivityType} from "../../../../util/hotel-package-activity-type";
import {HotelBooking} from "../hotel-booking";
import {PackageService} from "../../../../service/data/package.service";
import {HotelService} from "../../../../service/data/hotel.service";
import {Customer} from "../../../../operationalInfo/customer/customer";
import {CustomerService} from "../../../../service/data/customer.service";
import {BookingService} from "../../../../service/data/booking.service";
import {take} from "rxjs/operators";
import {BookingStatus} from "../../../../util/booking-status";
@Component({
    selector: 'app-stay-booking-search',
    templateUrl: './stay-booking-search.component.html',
    styleUrls: ['./stay-booking-search.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class StayBookingSearchComponent implements OnInit {
    @Input() hotelBookingVo: HotelBookingVo;
    @ViewChild('hotelBookingSearchForm') hotelBookingSearchForm: NgForm;
    dialogRef: MatDialogRef<HotelBookingDialogComponent>
    hotelBookingInfoTable: HotelBooking[] = [];
    hotelBookingInfoTableDataSource = new MatTableDataSource(this.hotelBookingInfoTable);
    public displayedColumns = ['BookingNo', 'Customer', 'Hotel', 'CheckIn', 'CheckOut', 'Total', 'BookingStatus',
        'CreatedBy', 'CreatedDate', 'LastModifiedBy', 'LastModifiedDate', 'Status', 'Action'];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    hotelList: Hotel[];
    customerList: Customer[];
    roomTypeList: RoomType[];
    statusList: MasterStatus[];
    activityTypeList: HotelPackageActivityType[];
    bookingStatusList: BookingStatus[];

    constructor(private dialog: MatDialog,
                private customerService: CustomerService,
                private packageService: PackageService,
                private hotelService: HotelService,
                private bookingService: BookingService) {
    }

    ngOnInit() {
        this.hotelBookingInfoTableDataSource.paginator = this.paginator;
        this.hotelBookingInfoTableDataSource.sort = this.sort;
        if (this.hotelBookingVo == null) {
            this.hotelBookingVo = new HotelBookingVo();
        }

        this.packageService.getMasterDataStatus('SEARCH')
            .pipe(take(1)).subscribe(
            response => this.statusList = response
        );

        this.packageService.getHotelActivityTypeList().pipe(take(1))
            .subscribe(activityTypeList => {
                this.activityTypeList = activityTypeList;
            });

        this.hotelService.getHotelList(Number(window.sessionStorage.getItem('organizationId')))
            .pipe(take(1)).subscribe(
            response => this.hotelList = response
        );

        this.customerService.getCustomerList()
            .pipe(take(1)).subscribe(
            response => {
                this.customerList = response;
            }
        );

        this.bookingService.getBookingStatus()
            .pipe(take(1)).subscribe(
            response => {
                this.bookingStatusList = response;
            }
        );
    }

    getRoomTypeList() {
        this.hotelService.getRoomTypeListHotelWise(this.hotelBookingVo.hotelId).pipe(take(1)).subscribe(
            response => this.roomTypeList = response
        );
    }

    applyFilter(val: any) {
        if (val) {
            this.hotelBookingInfoTableDataSource.filter = val.trim().toLowerCase();
            if (this.hotelBookingInfoTableDataSource.paginator) {
                this.hotelBookingInfoTableDataSource.paginator.firstPage();
            }
        }
    }

    openDialog(hotelBooking: any) {
        this.dialogRef = this.dialog.open(HotelBookingDialogComponent, {
            disableClose: false,
            width: 'inherit',
            data: {hotelBooking: hotelBooking,
                actionType: 'Update'},
            height: '100%'
        });
        this.dialogRef.afterClosed().pipe(take(1))
            .subscribe((hotel: HotelBooking[]) => {
                this.searchHotelBooking();
            });
    }

    public searchHotelBooking(): void {
        this.hotelBookingVo.organizationId = Number(window.sessionStorage.getItem('organizationId'));
        this.bookingService.hotelBookingSearch(this.hotelBookingVo).pipe(take(1))
            .subscribe((hotelBooking) => {
                this.hotelBookingInfoTable = hotelBooking;
                this.hotelBookingInfoTableDataSource.data = this.hotelBookingInfoTable;
            })
    }

}

@Component({
    selector: 'app-hotel-booking-search-modal',
    template: '<app-stay-booking-creation [hotelBooking]="data.hotelBooking" [isUpdate]="true" [isNew]="false" [actionType]="data.actionType" (onDelete)="closeModal($event)" (onCancel)="closeModal($event)"></app-stay-booking-creation>'
})
export class HotelBookingDialogComponent {
    constructor(public dialogRef: MatDialogRef<HotelBookingDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    closeModal(hotelBookingId: any) {
        this.dialogRef.close(hotelBookingId);
    }

}