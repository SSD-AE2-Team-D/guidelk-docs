import {SharedModel} from "../../util/shared-model";

export class RoomFeature extends SharedModel {
    roomFeatureId: any;
    featureTypeId: number;
    feature: string;
    featureDescription: string;

    isAssigned: boolean;

    roomTypeId: any;
}