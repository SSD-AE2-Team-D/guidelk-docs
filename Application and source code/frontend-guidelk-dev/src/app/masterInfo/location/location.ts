import {Country} from "../country/country";
import {SharedModel} from "../../util/shared-model";

export class Location extends SharedModel{
    locationId: any;
    locationName: string;
    locationCode: string;
    latitude: number;
    longitude: number;
    description: string;
    countryId: number;

    country: Country;
}