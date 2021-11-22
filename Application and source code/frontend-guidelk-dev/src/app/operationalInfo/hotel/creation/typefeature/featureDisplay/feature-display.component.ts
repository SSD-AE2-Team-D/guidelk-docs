import {Component, Input, OnInit, ViewEncapsulation} from "@angular/core";
import {HotelService} from "../../../../../service/data/hotel.service";
import {take} from "rxjs/operators";
import {RoomFeatureType} from "../../../../../util/room-feature-type";
import {RoomFeature} from "../../../room-feature";
import {Page} from "../../../../../config/page/page";

@Component({
    selector: 'room-feature-display',
    templateUrl: './feature-display.component.html',
    encapsulation: ViewEncapsulation.None
})
export class FeatureDisplayComponent implements OnInit {
    @Input() roomTypeId: number;
    @Input() actionType: string;
    @Input() featureTypeList: RoomFeatureType[];
    @Input() roomFeatureList: RoomFeature[];
    @Input() displayFeatureList: RoomFeature[];

    constructor(private hotelService: HotelService) {
    }

    ngOnInit() {
        if (this.actionType === 'Create') {
            this.hotelService.getRoomFeatureTypeList().pipe(take(1))
                .subscribe(featureTypeList => {
                    this.featureTypeList = featureTypeList
                    if (this.featureTypeList) {
                        this.featureTypeList.forEach((featureType: RoomFeatureType) => {
                            const roomFeature = new RoomFeature();
                            roomFeature.featureTypeId = featureType.featureTypeId;
                            roomFeature.feature = featureType.featureDescription;
                            roomFeature.featureDescription = '';
                            roomFeature.isAssigned = false;
                            this.roomFeatureList.push(roomFeature);
                        })
                    }
                });
        }

        if (this.actionType === 'Update') {
            this.roomFeatureList = [];
            this.hotelService.getRoomFeatureTypeList().pipe(take(1))
                .subscribe(featureTypeList => {
                    this.featureTypeList = featureTypeList
                    if (this.featureTypeList) {
                        this.featureTypeList.forEach((featureType: RoomFeatureType) => {
                            const roomFeature = new RoomFeature();
                            roomFeature.featureTypeId = featureType.featureTypeId;
                            roomFeature.feature = featureType.featureDescription;
                            roomFeature.featureDescription = '';
                            roomFeature.isAssigned = false;
                            this.roomFeatureList.push(roomFeature);
                        })
                        this.assignFeature();
                    }
                });
        }

    }

    private assignFeature() {
        this.displayFeatureList.forEach(dispalyFeature => {
            this.roomFeatureList.forEach(allFeature => {
                if (dispalyFeature.status != 0) {
                    if (allFeature.featureTypeId === dispalyFeature.featureTypeId) {
                        allFeature.isAssigned = true;
                        allFeature.roomFeatureId = dispalyFeature.roomFeatureId;
                        allFeature.status = dispalyFeature.status;
                    }
                }
            })
        })

    }
}

