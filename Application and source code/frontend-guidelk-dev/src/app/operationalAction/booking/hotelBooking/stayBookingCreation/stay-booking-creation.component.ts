import {Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation} from "@angular/core";
import {HotelBooking} from "../hotel-booking";
import {NgForm} from "@angular/forms";
import {Hotel} from "../../../../operationalInfo/hotel/hotel";
import {MasterStatus} from "../../../../util/master-status";
import {Customer} from "../../../../operationalInfo/customer/customer";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {RolePermission} from "../../../../shared/rolePermission/rolePermission";
import {PackageService} from "../../../../service/data/package.service";
import {BookingService} from "../../../../service/data/booking.service";
import {CustomerService} from "../../../../service/data/customer.service";
import {take} from "rxjs/operators";
import {HotelService} from "../../../../service/data/hotel.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {HotelPackageVo} from "../../../../operationalInfo/package/search/stayHistory/hotel-package-vo";
import {HotelPackage} from "../../../../operationalInfo/package/creation/stay/hotel-package";
import {ConfirmDialogComponent, ConfirmDialogModel} from "../../../../shared/confirm-dialog/confirm-dialog.component";

@Component({
    selector: 'app-stay-booking-creation',
    templateUrl: './stay-booking-creation.component.html',
    styleUrls: ['./stay-booking-creation.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class StayBookingCreationComponent implements OnInit {
    @Input() hotelBooking: HotelBooking;
    @Input() isUpdate: Boolean;
    @Input() isNew: Boolean;
    @Input() actionType: string;
    @Output() onDelete: EventEmitter<number> = new EventEmitter<number>();
    @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();
    @ViewChild('hotelBookingForm') hotelBookingForm: NgForm;
    hotelBookingInfoTable: HotelPackage[] = [];
    hotelBookingInfoTableDataSource = new MatTableDataSource(this.hotelBookingInfoTable);
    public displayedColumns = ['Hotel', 'PackageName', 'RoomType', 'StartDate', 'EndDate',
        'AvailabilityCount', 'Amount', 'Description', 'Activity', 'Action'];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    hotelList: Hotel[];
    customerList: Customer[];
    statusList: MasterStatus[];
    hotelPackageVo: HotelPackageVo;
    availableCount: number;
    total: any;
    public todayDate: any = new Date();

    constructor(private snackBar: MatSnackBar,
                public dialog: MatDialog,
                private customerService: CustomerService,
                private hotelService: HotelService,
                private packageService: PackageService,
                private bookingService: BookingService,
                public rolePermission: RolePermission) {

    }

    ngOnInit() {
        this.hotelBookingInfoTableDataSource.paginator = this.paginator;
        this.hotelBookingInfoTableDataSource.sort = this.sort;
        this.total = 0.00;
        if (this.hotelBooking == null) {
            this.hotelBooking = new HotelBooking();
            this.isUpdate = false;
            this.isNew = false;
            this.hotelBooking.adultCount = 2;
            this.hotelBooking.childCount = 0;
            this.hotelBooking.roomCount = 1;
            this.actionType = 'Create';
            this.hotelBooking.checkInDate = new Date();
            this.hotelBooking.checkInDate.setDate(this.hotelBooking.checkInDate.getDate());
            this.hotelBooking.checkOutDate = new Date();
            this.hotelBooking.checkOutDate.setDate(this.hotelBooking.checkOutDate.getDate() + 1);
        }

        if (this.hotelPackageVo == null) {
            this.hotelPackageVo = new HotelPackageVo();
        }

        if (this.actionType === 'Update') {
            this.searchUpdateHotelPackage();
            this.total = this.hotelBooking.total;
            this.todayDate = this.hotelBooking.checkInDate;
        }

        this.customerService.getCustomerList()
            .pipe(take(1)).subscribe(
            response => {
                this.customerList = response;
            }
        );

        this.hotelService.getHotelList(Number(window.sessionStorage.getItem('organizationId')))
            .pipe(take(1)).subscribe(
            response => {
                this.hotelList = response;
            }
        );

        if (this.isUpdate) {
            this.bookingService.getMasterDataStatus('UPDATE')
                .pipe(take(1)).subscribe(
                response => this.statusList = response
            );
        } else {
            this.bookingService.getMasterDataStatus('CREATE')
                .pipe(take(1)).subscribe(
                response => this.statusList = response
            );
        }
    }

    applyFilter(val: any) {
        if (val) {
            this.hotelBookingInfoTableDataSource.filter = val.trim().toLowerCase();
            if (this.hotelBookingInfoTableDataSource.paginator) {
                this.hotelBookingInfoTableDataSource.paginator.firstPage();
            }
        }
    }

    public searchHotelPackage(): void {
        this.hotelPackageVo.organizationId = Number(window.sessionStorage.getItem('organizationId'));
        this.hotelPackageVo.hotelId = this.hotelBooking.hotelId;
        this.hotelPackageVo.startDate = this.hotelBooking.checkInDate;
        if (this.actionType === 'Create') {
            var dt = new Date();
            dt.setDate(dt.getDate() + 60);
            this.hotelPackageVo.endDate = dt;
        }
        if (this.actionType === 'Update') {
            this.hotelPackageVo.startDate = this.hotelBooking.checkOutDate;
        }

        this.packageService.hotelPackageSearch(this.hotelPackageVo).pipe(take(1))
            .subscribe((hotelPackage) => {
                this.hotelBookingInfoTable = hotelPackage;
                this.hotelBookingInfoTableDataSource.data = this.hotelBookingInfoTable;
            })
    }

    public searchUpdateHotelPackage(): void {
        this.hotelPackageVo.organizationId = Number(window.sessionStorage.getItem('organizationId'));
        this.hotelPackageVo.packageName = this.hotelBooking.hotelPackage.packageName;
        this.packageService.hotelPackageSearch(this.hotelPackageVo).pipe(take(1))
            .subscribe((hotelPackage) => {
                this.hotelBookingInfoTable = hotelPackage;
                this.hotelBookingInfoTableDataSource.data = this.hotelBookingInfoTable;
            })
    }


    public pickPackage(hotelPackage: HotelPackage) {
        if (hotelPackage.availabilityCount === 0) {
            this.snackBar.open('Package not available', 'Error', <MatSnackBarConfig>{
                duration: 6000,
                panelClass: ['red-snackbar']
            });
            return;
        }

        if (hotelPackage.availabilityCount > 0) {
            this.hotelBooking.hotelPackageId = hotelPackage.hotelPackageId
            this.availableCount = hotelPackage.availabilityCount;
            this.total = hotelPackage.amount * this.hotelBooking.roomCount;
        }
    }

    public setTotal() {
        this.total = 0;
    }

    public resetForm() {
        this.hotelBookingForm.resetForm();
        this.hotelBookingInfoTable = [];
        this.hotelBookingInfoTableDataSource.data = this.hotelBookingInfoTable;
        this.total = 0.00;
    }


    public createHotelBooking(): void {
        if (this.hotelBooking.roomCount > this.availableCount) {
            this.snackBar.open('Package availability exceeded', 'Error', <MatSnackBarConfig>{
                duration: 6000,
                panelClass: ['red-snackbar']
            });
            return;
        }
        if (this.total === 0) {
            this.snackBar.open('Total not allow', 'Error', <MatSnackBarConfig>{
                duration: 6000,
                panelClass: ['red-snackbar']
            });
            return;
        }
        this.hotelBooking.organizationId = Number(window.sessionStorage.getItem('organizationId'));
        this.hotelBooking.total = this.total;
        this.bookingService.postHotelBooking(this.hotelBooking).pipe(take(1)).subscribe((hotelBooking) => {
            this.hotelBooking = hotelBooking;
            this.snackBar.open('Booking Saved', 'success', <MatSnackBarConfig>{
                duration: 3000
            });
            this.isUpdate = true;
            this.isNew = true;
        }, (error) => {
            this.snackBar.open('Booking already exist', "error", <MatSnackBarConfig>{
                panelClass: ['red-snackbar']
            });
        })
    }

    public updateHotelBooking(): void {
        if (this.hotelBooking.roomCount > this.availableCount) {
            this.snackBar.open('Package availability exceeded', 'Error', <MatSnackBarConfig>{
                duration: 6000,
                panelClass: ['red-snackbar']
            });
            return;
        }
        if (this.total === 0) {
            this.snackBar.open('Total not allow', 'Error', <MatSnackBarConfig>{
                duration: 6000,
                panelClass: ['red-snackbar']
            });
            return;
        }
        this.bookingService.putHotelBooking(this.hotelBooking).subscribe(hotelBooking => {
            this.hotelBooking = hotelBooking;
            this.snackBar.open('Booking updated', 'success', <MatSnackBarConfig>{
                duration: 3000
            });
        }, error => {
            this.snackBar.open('Booking already exist', "error", <MatSnackBarConfig>{
                panelClass: ['red-snackbar']
            });
        })
    }

    public bookingConfirm(): void{
        this.bookingService.bookingConfirm(this.hotelBooking).subscribe(hotelBooking => {
            this.hotelBooking = hotelBooking;
            this.snackBar.open('Booking confirmed', 'success', <MatSnackBarConfig>{
                duration: 3000
            });
        }, error => {
            this.snackBar.open('Booking already exist', "error", <MatSnackBarConfig>{
                panelClass: ['red-snackbar']
            });
        })
    }

    public deleteHotelBooking(): void {
        const hotelBookingId = this.hotelBooking.hotelBookingId;
        const message = 'Are you sure you want to delete this Hotel Booking?';
        const dialogData = new ConfirmDialogModel('Confirm Action', message);
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            maxWidth: '400px',
            data: dialogData
        });
        dialogRef.afterClosed().subscribe(dialogResult => {
            this.bookingService.deleteHotelBooking(this.hotelBooking).subscribe(hotelBooking => {
                this.snackBar.open('Role deleted', 'success', {
                    duration: 3000
                });
                this.isUpdate = false;
                this.isNew = false;
                this.onDelete.emit(hotelBookingId);
                this.resetForm();
                this.hotelBooking.hotelBookingId = null;
            }, error => {
                this.snackBar.open(error.error, 'error', <MatSnackBarConfig>{
                    panelClass: ['red-snackbar']
                });
            });
        });
    }
}
