import {SharedModel} from "../../util/shared-model";

export class Authority extends SharedModel {
    authorityId: number;
    authorityName: string;
    description: string;

    isAssigned: boolean;
}