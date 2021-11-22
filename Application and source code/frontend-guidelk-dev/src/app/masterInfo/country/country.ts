import {SharedModel} from "../../util/shared-model";

export class Country extends SharedModel{
    countryId: any;
    countryName: string;
    countryCode: string;
    latitude: number;
    longitude: number;
}