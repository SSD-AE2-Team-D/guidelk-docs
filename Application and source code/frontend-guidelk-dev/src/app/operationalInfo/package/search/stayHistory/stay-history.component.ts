import {Component, Inject, Input, OnInit, ViewChild, ViewEncapsulation} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {PackageService} from "../../../../service/data/package.service";
import {HotelVo} from "../../../hotel/hotel-vo";
import {NgForm} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {HotelPackageVo} from "./hotel-package-vo";
import {HotelPackage} from "../../creation/stay/hotel-package";
import {Hotel} from "../../../hotel/hotel";
import {RoomType} from "../../../hotel/room-type";
import {MasterStatus} from "../../../../util/master-status";
import {HotelPackageActivityType} from "../../../../util/hotel-package-activity-type";
import {take} from "rxjs/operators";
import {HotelService} from "../../../../service/data/hotel.service";

@Component({
    selector: 'app-stay-package-search',
    templateUrl: './stay-history.component.html',
    styleUrls: ['./stay-history.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class StayHistoryComponent implements OnInit {
    @Input() hotelPackageVo: HotelPackageVo;
    @ViewChild('hotelPackageSearchForm') hotelPackageSearchForm: NgForm;
    dialogRef: MatDialogRef<HotelPackageDialogComponent>;
    dialogFeedbackRef: MatDialogRef<HotelPackageViewFeedbackDialogComponent>;
    hotelPackageInfoTable: HotelPackage[] = [];
    hotelPackageInfoTableDataSource = new MatTableDataSource(this.hotelPackageInfoTable);
    public displayedColumns = ['Hotel', 'PackageName', 'RoomType', 'StartDate', 'EndDate', 'AvailabilityCount', 'Amount',
        'CreatedBy', 'CreatedDate', 'LastModifiedBy', 'LastModifiedDate', 'Status', 'Action','ViewFeedback'];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    hotelList: Hotel[];
    roomTypeList: RoomType[];
    statusList: MasterStatus[];
    activityTypeList: HotelPackageActivityType[];

    constructor(private dialog: MatDialog,
                private packageService: PackageService,
                private hotelService: HotelService,) {

    }

    ngOnInit() {
        this.hotelPackageInfoTableDataSource.paginator = this.paginator;
        this.hotelPackageInfoTableDataSource.sort = this.sort;
        if (this.hotelPackageVo == null) {
            this.hotelPackageVo = new HotelPackageVo();
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
    }

    getRoomTypeList() {
        this.hotelService.getRoomTypeListHotelWise(this.hotelPackageVo.hotelId).pipe(take(1)).subscribe(
            response => this.roomTypeList = response
        );
    }

    applyFilter(val: any) {
        if (val) {
            this.hotelPackageInfoTableDataSource.filter = val.trim().toLowerCase();
            if (this.hotelPackageInfoTableDataSource.paginator) {
                this.hotelPackageInfoTableDataSource.paginator.firstPage();
            }
        }
    }

    openDialog(hotelPackage: any) {
        this.dialogRef = this.dialog.open(HotelPackageDialogComponent, {
            disableClose: false,
            width: 'inherit',
            data: {hotelPackage: hotelPackage,
                actionType: 'Update'},
            height: '100%'
        });
        this.dialogRef.afterClosed().pipe(take(1))
            .subscribe((hotel: HotelPackage[]) => {
                this.searchHotelPackage();
            });
    }

    openFeedbackDialog(packageId: any) {
        this.dialogFeedbackRef = this.dialog.open(HotelPackageViewFeedbackDialogComponent, {
            disableClose: false,
            width: 'inherit',
            data: {packageId: packageId,},
            height: '60%'
        });
        this.dialogFeedbackRef.afterClosed().pipe(take(1))
            .subscribe((hotel: HotelPackage[]) => {
                this.searchHotelPackage();
            });
    }

    public searchHotelPackage(): void {
        this.hotelPackageVo.organizationId = Number(window.sessionStorage.getItem('organizationId'));
        this.packageService.hotelPackageSearch(this.hotelPackageVo).pipe(take(1))
            .subscribe((hotelPackage) => {
                this.hotelPackageInfoTable = hotelPackage;
                this.hotelPackageInfoTableDataSource.data = this.hotelPackageInfoTable;
            })
    }
}

@Component({
    selector: 'app-stay-package-search-modal',
    template: '<app-stay-package-creation [hotelPackage]="data.hotelPackage" [isUpdate]="true" [isNew]="false" [actionType]="data.actionType" (onDelete)="closeModal($event)" (onCancel)="closeModal($event)"></app-stay-package-creation>'
})
export class HotelPackageDialogComponent {
    constructor(public dialogRef: MatDialogRef<HotelPackageDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    closeModal(hotelPackageId: any) {
        this.dialogRef.close(hotelPackageId);
    }

}

@Component({
    selector: 'app-stay-package-view-feedback-modal',
    template: '<app-feedback-view [packageId]="data.packageId" (onCancel)="closeModal($event)"></app-feedback-view>'
})
export class HotelPackageViewFeedbackDialogComponent {
    constructor(public dialogRef: MatDialogRef<HotelPackageViewFeedbackDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    closeModal(feedbackId: any) {
        this.dialogRef.close(feedbackId);
    }

}