import {SharedModel} from "../../util/shared-model";
import {Organization} from "../organization/organization";
import {Role} from "../role/role";

export class User extends SharedModel {
    userId: any;
    userName: string;
    password: string;
    email: string;
    mobileNo: string;
    enabled: boolean;
    organizationId: number;

    organization: Organization;

    roles: Role[];
    confirmPassword: string;
}