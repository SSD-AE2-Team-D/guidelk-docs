import {Component, Input, OnInit, ViewEncapsulation} from "@angular/core";
import {HotelPackageActivity} from "../hotel-package-activity";
import {PackageService} from "../../../../../service/data/package.service";
import {take} from "rxjs/operators";
import {HotelPackageActivityType} from "../../../../../util/hotel-package-activity-type";

@Component({
    selector: 'app-package-activity-display',
    templateUrl: './activity-display.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ActivityDisplayComponent implements OnInit {
    @Input() hotelPackageId: number;
    @Input() actionType: string;
    @Input() packageActivityList: HotelPackageActivity[];
    @Input() displayPackageActivityList: HotelPackageActivity[];
    activityTypeList: HotelPackageActivityType[];

    constructor(private packageService: PackageService) {

    }

    ngOnInit() {

        if (this.actionType === 'Create') {
            this.packageActivityList = []
            this.displayPackageActivityList = []
            this.packageService.getHotelActivityTypeList().pipe(take(1))
                .subscribe(activityTypeList => {
                    this.activityTypeList = activityTypeList;
                    if (this.activityTypeList) {
                        this.activityTypeList.forEach(aType => {
                            const packageActivity = new HotelPackageActivity();
                            packageActivity.activityTypeId = aType.activityTypeId;
                            packageActivity.activityName = aType.activityDescription;
                            packageActivity.isAssigned = false;
                            this.packageActivityList.push(packageActivity);
                        })
                    }
                });
        }

        if (this.actionType === 'Update') {
            this.packageActivityList = []
            this.packageService.getHotelActivityTypeList().pipe(take(1))
                .subscribe(activityTypeList => {
                    this.activityTypeList = activityTypeList;
                    if (this.activityTypeList) {
                        this.activityTypeList.forEach(aType => {
                            const packageActivity = new HotelPackageActivity();
                            packageActivity.activityTypeId = aType.activityTypeId;
                            packageActivity.activityName = aType.activityDescription;
                            packageActivity.isAssigned = false;
                            this.packageActivityList.push(packageActivity);
                        })
                    }
                    this.assignActivities(this.packageActivityList);
                });

        }

    }

    private assignActivities(activities: HotelPackageActivity[]) {
        if (this.displayPackageActivityList) {
            this.displayPackageActivityList.forEach(displayActivity => {
                activities.forEach(activity => {
                    if (displayActivity.status !== 0) {
                        if (displayActivity.activityTypeId === activity.activityTypeId) {
                            activity.hotelPackageActivityId = displayActivity.hotelPackageActivityId
                            activity.activityName = displayActivity.activityName
                            activity.isAssigned = true;
                        }
                    }

                })
            })
        }
    }

    public isUnassigned(): void {
        if (this.packageActivityList.length !== null && this.packageActivityList.length > 0) {
            this.packageActivityList.forEach(activity => {
                if (activity.isAssigned) {
                    activity.isAssigned = false;
                }
            })
        }
    }
}