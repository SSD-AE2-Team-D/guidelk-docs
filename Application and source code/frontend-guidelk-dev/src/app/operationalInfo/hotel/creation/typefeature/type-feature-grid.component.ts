import {Component, Input, OnInit, QueryList, ViewChild, ViewChildren, ViewEncapsulation} from "@angular/core";
import {RoomType} from "../../room-type";
import {MatTableDataSource} from "@angular/material/table";
import {RoomFeature} from "../../room-feature";
import {NgForm} from "@angular/forms";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {FeatureDisplayComponent} from "./featureDisplay/feature-display.component";
import {HotelService} from "../../../../service/data/hotel.service";
import {take} from "rxjs/operators";

@Component({
    selector: 'app-hotel-type-feature',
    templateUrl: './type-feature-grid.component.html',
    styleUrls: ['./type-feature-grid.component.css'],
})
export class TypeFeatureGridComponent implements OnInit {
    displayedColumns = ['RoomType', 'Feature', 'Actions'];
    dataSource: MatTableDataSource<rt>;
    @ViewChild('roomTypeForm') roomTypeForm: NgForm;
    @Input() actionType: string;
    @Input() roomTypeList: RoomType[] = [];
    @ViewChildren(FeatureDisplayComponent) roomFeatureDisplayList: QueryList<FeatureDisplayComponent>;

    constructor(private snackBar: MatSnackBar,
                private hotelService: HotelService) {
        const roomTypes: rt[] = [];
        this.dataSource = new MatTableDataSource(roomTypes);
    }

    ngOnInit() {
        if (this.actionType === 'Create') {
            this.addRow();
        }

        if (this.actionType === 'Update') {
            if (this.roomTypeList) {
                if (this.roomTypeList.length !== null && this.roomTypeList.length > 0) {
                    this.roomTypeList.forEach(rtType => {
                        this.dataSource.data.push(this.setRowData(rtType));
                        this.dataSource.filter = "";
                    })
                }
            }
        }
    }

    createEmptyRow(): rt {
        return {
            roomTypeId: null,
            roomType: '',
            roomTypeDescription: '',
            status: null,
            roomFeatures: [],
        };
    }

    setRowData(roomType: RoomType): rt {
        return {
            roomTypeId: roomType.roomTypeId,
            roomType: roomType.roomType,
            roomTypeDescription: '',
            status: roomType.status,
            roomFeatures: roomType.roomFeatures,
        };
    }

    public addRow() {
        this.dataSource.data.push(this.createEmptyRow());
        this.dataSource.filter = "";
    }

    delete(elm: any, id: any) {
        if (id === null) {
            if (this.dataSource.data.length > 1) {
                this.dataSource.data = this.dataSource.data.filter(i => i !== elm)
            } else {
                this.snackBar.open('row remove not allow', 'Error', <MatSnackBarConfig>{
                    duration: 6000,
                    panelClass: ['red-snackbar']
                });
                return;
            }
        } else {
            if (this.dataSource.data.length > 1) {
                this.hotelService.deleteRoomTypeLineItem(id).pipe(take(1)).subscribe(roomType => {
                    this.snackBar.open('Room Type Line Deleted', 'success', <MatSnackBarConfig>{
                        duration: 3000
                    });
                    this.dataSource.data = this.dataSource.data.filter(i => i !== elm)
                });
            } else {
                this.snackBar.open('row remove not allow', 'Error', <MatSnackBarConfig>{
                    duration: 6000,
                    panelClass: ['red-snackbar']
                });
                return;
            }
        }
    }

    resetTable() {
        this.dataSource.data = [];
        this.addRow();
    }
}

export interface rt {
    roomTypeId: any;
    roomType: string;
    roomTypeDescription: string;
    status: any;
    roomFeatures: RoomFeature[];
}