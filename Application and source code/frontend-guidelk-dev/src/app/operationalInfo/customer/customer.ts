import {AddressBook} from "../../shared/entity/address-book";
import {SharedModel} from "../../util/shared-model";

export class Customer extends SharedModel {
    customerId: any;
    firstName: string;
    lastName: string;
    passportNumber: string;
    identificationNumber: string;
    occupation: string;
    titleTypeId: number;
    genderTypeId: number;
    customerTypeId: number;
    organizationId: number;
    addressBookId: number;
    customerTypeDescription: string;
    titleDescription: string;
    genderDescription: string;

    addressBook: AddressBook;


}