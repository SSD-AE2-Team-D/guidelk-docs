import {SharedModel} from "../../util/shared-model";
import {Page} from "../page/page";

export class Role extends SharedModel {
    roleId: any;
    roleName: string;
    roleDescription: string;

    pages: Page[];

    isAssigned: boolean;
}