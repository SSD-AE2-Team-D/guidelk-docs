import {HotelPackageActivity} from "./hotel-package-activity";
import {Hotel} from "../../../hotel/hotel";
import {RoomType} from "../../../hotel/room-type";
import {SharedModel} from "../../../../util/shared-model";

export class HotelPackage extends SharedModel{
    hotelPackageId: any;
    packageName: string;
    hotelId: number;
    roomTypeId: number;
    description: string;
    startDate: Date;
    endDate: Date;
    amount: number;
    availabilityCount: number;
    organizationId: number;

    hotelPackageActivities: HotelPackageActivity[];

    hotel: Hotel;
    roomType: RoomType;
}