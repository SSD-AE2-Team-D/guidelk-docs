import {SharedModel} from "../../../util/shared-model";

export class PackageFeedback extends SharedModel{
    feedbackId: number;
    packageId: number;
    comment: string;
}