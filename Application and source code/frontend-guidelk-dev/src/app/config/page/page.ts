import {SharedModel} from "../../util/shared-model";
import {Module} from "../module/module";
import {Authority} from "../authority/authority";

export class Page extends SharedModel {
    pageId: any;
    pageName: string;
    description: string;
    moduleId: number;
    urlPattern: string;
    orderIndex: number;
    icon: string;

    module: Module;

    authorities: Authority[];

    isAssigned: boolean;
}