import {Customer} from "../../../operationalInfo/customer/customer";
import {SharedModel} from "../../../util/shared-model";
import {HotelPackage} from "../../../operationalInfo/package/creation/stay/hotel-package";
import {Hotel} from "../../../operationalInfo/hotel/hotel";

export class HotelBooking extends SharedModel {
    hotelBookingId: any;
    bookingNumber: string;
    hotelId: number;
    checkInDate: Date;
    checkOutDate: Date;
    hotelPackageId: number;
    adultCount: number;
    childCount: number;
    roomCount: number;
    total: number;
    bookingStatus: number;
    customerId: number;
    organizationId: number;

    customer: Customer;
    hotel: Hotel;
    hotelPackage: HotelPackage;

    bookingStatusDescription: string;
}