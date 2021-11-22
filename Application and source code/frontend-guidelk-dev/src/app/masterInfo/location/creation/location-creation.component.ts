import {Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation} from "@angular/core";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {CountryService} from "../../../service/data/country.service";
import {RolePermission} from "../../../shared/rolePermission/rolePermission";
import {LocationService} from "../../../service/data/location.service";
import {take} from "rxjs/operators";
import {Country} from "../../country/country";
import {NgForm} from "@angular/forms";
import {MasterStatus} from "../../../util/master-status";
import {Location} from "../location";
import {ConfirmDialogComponent, ConfirmDialogModel} from "../../../shared/confirm-dialog/confirm-dialog.component";

@Component({
    selector: 'app-location-creation',
    templateUrl: './location-creation.component.html',
    styleUrls: ['./location-creation.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class LocationCreationComponent implements OnInit {
    @Input() location: Location;
    @Input() isUpdate: Boolean;
    @Input() isNew: Boolean;
    @Output() onDelete: EventEmitter<number> = new EventEmitter<number>();
    @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();
    @ViewChild('locationForm') locationForm: NgForm;
    countryList: Country[];
    statusList: MasterStatus[];

    constructor(private snackBar: MatSnackBar,
                public dialog: MatDialog,
                private countryService: CountryService,
                private locationService: LocationService,
                public rolePermission: RolePermission) {
    }

    ngOnInit() {
        if (this.location == null) {
            this.location = new Location();
            this.isUpdate = false;
            this.isNew = false;
        }
        if (this.isUpdate) {
            this.locationService.getMasterDataStatus('UPDATE')
                .pipe(take(1)).subscribe(
                response => this.statusList = response
            );
        } else {
            this.locationService.getMasterDataStatus('CREATE')
                .pipe(take(1)).subscribe(
                response => this.statusList = response
            );
        }

        this.countryService.getCountryList()
            .pipe(take(1)).subscribe(
            response => this.countryList = response
        );
    }

    public resetForm() {
        this.locationForm.resetForm();
    }

    public createLocation(): void {
        this.locationService.postLocation(this.location).pipe(take(1)).subscribe((location) => {
            this.location = location;
            this.snackBar.open('Location Saved', 'success', <MatSnackBarConfig>{
                duration: 3000
            });
            this.isUpdate = true;
            this.isNew = true;
        }, (error) => {
            this.snackBar.open('Location already exist', "error", <MatSnackBarConfig>{
                panelClass: ['red-snackbar']
            });
        })
    }

    public updateLocation(): void {
        this.locationService.putLocation(this.location).subscribe(location => {
            this.location = location;
            this.snackBar.open('Location updated', 'success', <MatSnackBarConfig>{
                duration: 3000
            });
        }, error => {
            this.snackBar.open('Location already exist', "error", <MatSnackBarConfig>{
                panelClass: ['red-snackbar']
            });
        })
    }

    public deleteLocation(): void {
        const locationId = this.location.locationId;
        const message = 'Are you sure you want to delete this Location?';
        const dialogData = new ConfirmDialogModel('Confirm Action', message);
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            maxWidth: '400px',
            data: dialogData
        });
        dialogRef.afterClosed().subscribe(dialogResult => {
            this.locationService.deleteLocation(this.location).subscribe(country => {
                this.snackBar.open('Location deleted', 'success', {
                    duration: 3000
                });
                this.isUpdate = false;
                this.isNew = false;
                this.onDelete.emit(locationId);
                this.resetForm();
                this.location.locationId = null;
            }, error => {
                this.snackBar.open(error.error, 'error', <MatSnackBarConfig>{
                    panelClass: ['red-snackbar']
                });
            });
        });

    }
}