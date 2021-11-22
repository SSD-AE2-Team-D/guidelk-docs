import {SharedModel} from "../../util/shared-model";
import {Country} from "../../masterInfo/country/country";
import {Location} from "../../masterInfo/location/location";

export class AddressBook extends SharedModel{
    addressBookId: number;
    addressOne: string;
    addressTwo: string;
    countryId: number;
    locationId: number;
    postalCode: string;
    fax: string;
    email: string;
    telephone: string;
    mobile: string;
    website: string;

    country: Country;
    location: Location;

}