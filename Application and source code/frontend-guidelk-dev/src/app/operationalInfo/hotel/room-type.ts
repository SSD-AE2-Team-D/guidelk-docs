import {SharedModel} from "../../util/shared-model";
import {RoomFeature} from "./room-feature";

export class RoomType extends SharedModel {
    roomTypeId: any;
    roomType: string;
    roomTypeDescription: string;

    roomFeatures: RoomFeature[] = [];

    hotelId: any;
}