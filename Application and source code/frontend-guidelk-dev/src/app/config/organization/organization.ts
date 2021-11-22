import {SharedModel} from "../../util/shared-model";
import {AddressBook} from "../../shared/entity/address-book";
import {Module} from "../module/module";

export class Organization extends SharedModel {
    organizationId: any;
    organizationName: string;
    shortCode: string;
    description: string;
    vatNo: string;
    sVatNo: string;
    addressBookId: string;

    addressBook: AddressBook;

    modules: Module[];

}