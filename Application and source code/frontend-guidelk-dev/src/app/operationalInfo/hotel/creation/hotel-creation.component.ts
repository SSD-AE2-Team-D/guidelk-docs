import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output, QueryList,
    ViewChild,
    ViewChildren,
    ViewEncapsulation
} from "@angular/core";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {RolePermission} from "../../../shared/rolePermission/rolePermission";
import {HotelService} from "../../../service/data/hotel.service";
import {AddressBookComponent} from "../../../config/common/addressBook/address-book.component";
import {NgForm} from "@angular/forms";
import {MasterStatus} from "../../../util/master-status";
import {Hotel} from "../hotel";
import {AddressBook} from "../../../shared/entity/address-book";
import {take} from "rxjs/operators";
import {HotelCategoryType} from "../../../util/hotel-category-type";
import {StarGrading} from "../../../util/star-grading";
import {TypeFeatureGridComponent} from "./typefeature/type-feature-grid.component";
import {RoomType} from "../room-type";
import {ConfirmDialogComponent, ConfirmDialogModel} from "../../../shared/confirm-dialog/confirm-dialog.component";

@Component({
    selector: 'app-hotel-creation',
    templateUrl: './hotel-creation.component.html',
    styleUrls: ['./hotel-creation.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class HotelCreationComponent implements OnInit {
    @Input() hotel: Hotel;
    @Input() isUpdate: Boolean;
    @Input() isNew: Boolean;
    @Input() actionType: string;
    @Output() onDelete: EventEmitter<number> = new EventEmitter<number>();
    @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();
    @ViewChild('addressBookComponent') addressBookComponent: AddressBookComponent;
    @ViewChild('hotelForm') hotelForm: NgForm;
    hotelCategoryTypeList: HotelCategoryType[];
    starGradingList: StarGrading[];
    statusList: MasterStatus[];
    public todayDate: any = new Date();
    @ViewChildren(TypeFeatureGridComponent) typeFeatureDisplayList: QueryList<TypeFeatureGridComponent>;

    constructor(private snackBar: MatSnackBar,
                public dialog: MatDialog,
                private hotelService: HotelService,
                public rolePermission: RolePermission) {
    }

    ngOnInit() {
        if (this.hotel == null) {
            this.hotel = new Hotel();
            const addressBook = new AddressBook();
            this.hotel.addressBook = addressBook;
            this.isUpdate = false;
            this.isNew = false;
            this.actionType = 'Create';
        }

        if (this.isUpdate) {
            this.hotelService.getMasterDataStatus('UPDATE')
                .pipe(take(1)).subscribe(
                response => this.statusList = response
            );
        } else {
            this.hotelService.getMasterDataStatus('CREATE')
                .pipe(take(1)).subscribe(
                response => this.statusList = response
            );
        }

        this.hotelService.getHotelCategoryTypeList()
            .pipe(take(1)).subscribe(
            response => this.hotelCategoryTypeList = response
        );

        this.hotelService.getStarGradingList()
            .pipe(take(1)).subscribe(
            response => this.starGradingList = response
        );
    }

    public resetForm() {
        this.hotelForm.resetForm();
        this.addressBookComponent.addressBookForm.resetForm();
    }

    public filterDuplicateRoomType(): any {
        const allList: RoomType[] = [];
        const withDuplicates: any[] = [];
        this.typeFeatureDisplayList.forEach(typeFeature => {
            typeFeature.dataSource.data.forEach(data => {
                if (data.roomType !== "") {
                    const roomTypeData = new RoomType();
                    roomTypeData.roomType = data.roomType
                    data.roomFeatures.forEach(fe => {
                        if (fe.isAssigned) {
                            roomTypeData.roomFeatures.push(fe);
                        }
                    })
                    allList.push(roomTypeData)
                }
            })
        })
        const res: RoomType[] = [];
        allList.map(function (item) {
            const existItem = res.find(x => x.roomType === item.roomType);
            if (existItem) {
                withDuplicates.push(item);
            } else {
                res.push(item);
            }
        });
        return withDuplicates;
    }


    public createHotel(): void {
        const roomTypeList: RoomType[] = [];
        this.typeFeatureDisplayList.forEach(typeFeature => {
            typeFeature.dataSource.data.forEach(data => {
                if (data.roomType !== "") {
                    const roomTypeData = new RoomType();
                    roomTypeData.roomType = data.roomType
                    data.roomFeatures.forEach(fe => {
                        if (fe.isAssigned) {
                            roomTypeData.roomFeatures.push(fe);
                        }
                    })
                    roomTypeList.push(roomTypeData)
                }
            })
        })

        if (this.hotel.addressBook.countryId === undefined || this.hotel.addressBook.countryId === null) {
            this.snackBar.open('Country cannot empty', 'Error', <MatSnackBarConfig>{
                duration: 6000,
                panelClass: ['red-snackbar']
            });
            return;
        }

        if (this.hotel.addressBook.locationId === undefined || this.hotel.addressBook.locationId === null) {
            this.snackBar.open('Location cannot empty', 'Error', <MatSnackBarConfig>{
                duration: 6000,
                panelClass: ['red-snackbar']
            });
            return;
        }

        if (roomTypeList.length === 0) {
            this.snackBar.open('Room type cannot empty', 'Error', <MatSnackBarConfig>{
                duration: 6000,
                panelClass: ['red-snackbar']
            });
            return;
        }

        if (this.filterDuplicateRoomType().length > 0) {
            this.snackBar.open('Duplicate room type', 'Error', <MatSnackBarConfig>{
                duration: 6000,
                panelClass: ['red-snackbar']
            });
            return;
        }

        this.hotel.roomTypes = roomTypeList;
        this.hotel.organizationId = Number(window.sessionStorage.getItem('organizationId'));
        this.hotelService.postHotel(this.hotel).pipe(take(1)).subscribe((hotel) => {
            this.hotel = hotel;
            this.snackBar.open('Hotel Saved', 'success', <MatSnackBarConfig>{
                duration: 3000
            });
            this.isUpdate = true;
            this.isNew = true;
        }, (error) => {
            this.snackBar.open('Hotel already exist', "error", <MatSnackBarConfig>{
                panelClass: ['red-snackbar']
            });
        })
    }

    public updateHotel(): void {
        const roomTypeList: RoomType[] = [];
        this.typeFeatureDisplayList.forEach(typeFeature => {
            typeFeature.dataSource.data.forEach(data => {
                const roomTypeData = new RoomType();
                roomTypeData.roomType = data.roomType
                roomTypeData.roomTypeId = data.roomTypeId
                roomTypeData.status = this.hotel.status;
                data.roomFeatures.forEach(fe => {
                    if (fe.isAssigned && fe.roomFeatureId === null) {
                        roomTypeData.roomFeatures.push(fe);
                    }
                    if (fe.isAssigned && fe.roomFeatureId !== null) {
                        roomTypeData.roomFeatures.push(fe);
                    }
                })
                roomTypeData.roomFeatures = data.roomFeatures;
                roomTypeList.push(roomTypeData)
            })
        })
        if (this.hotel.addressBook.countryId === undefined || this.hotel.addressBook.countryId === null) {
            this.snackBar.open('Country cannot empty', 'Error', <MatSnackBarConfig>{
                duration: 6000,
                panelClass: ['red-snackbar']
            });
            return;
        }

        if (this.hotel.addressBook.locationId === undefined || this.hotel.addressBook.locationId === null) {
            this.snackBar.open('Location cannot empty', 'Error', <MatSnackBarConfig>{
                duration: 6000,
                panelClass: ['red-snackbar']
            });
            return;
        }

        if (this.filterDuplicateRoomType().length > 0) {
            this.snackBar.open('Duplicate room type', 'Error', <MatSnackBarConfig>{
                duration: 6000,
                panelClass: ['red-snackbar']
            });
            return;
        }

        this.hotel.roomTypes = roomTypeList;
        this.hotelService.putHotel(this.hotel).subscribe(hotel => {
            this.hotel = hotel;
            this.snackBar.open('Hotel updated', 'success', <MatSnackBarConfig>{
                duration: 3000
            });
        }, error => {
            this.snackBar.open('Hotel already exist', "error", <MatSnackBarConfig>{
                panelClass: ['red-snackbar']
            });
        })
    }

    public deleteHotel(): void {
        const hotelId = this.hotel.hotelId;
        const message = 'Are you sure you want to delete this Hotel?';
        const dialogData = new ConfirmDialogModel('Confirm Action', message);
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            maxWidth: '400px',
            data: dialogData
        });
        dialogRef.afterClosed().subscribe(dialogResult => {
            this.hotelService.deleteHotel(this.hotel).subscribe(hotel => {
                this.snackBar.open('Role deleted', 'success', {
                    duration: 3000
                });
                this.isUpdate = false;
                this.isNew = false;
                this.onDelete.emit(hotelId);
                this.resetForm();
                this.hotel.hotelId = null;
            }, error => {
                this.snackBar.open(error.error, 'error', <MatSnackBarConfig>{
                    panelClass: ['red-snackbar']
                });
            });
        });
    }
}