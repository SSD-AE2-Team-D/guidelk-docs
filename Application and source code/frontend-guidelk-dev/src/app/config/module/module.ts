import {SharedModel} from "../../util/shared-model";

export class Module extends SharedModel{
    moduleId: any;
    moduleName: string;
    description: string;
    moduleCode: string;
    urlPattern: string;
    icon: string;
    organizationId: number;
}