import {SharedModel} from "../../util/shared-model";
import {AddressBook} from "../../shared/entity/address-book";
import {RoomType} from "./room-type";

export class Hotel extends SharedModel {
    hotelId: any;
    hotelName: string;
    categoryId: number;
    starGradingId: number;
    roomCount: number;
    dateOfStart: Date;
    organizationId: number;
    hotelDescription: string;
    addressBookId: number;

    addressBook: AddressBook;

    roomTypes: RoomType[];

    categoryDescription: string;
    starGradingDescription: string;
}