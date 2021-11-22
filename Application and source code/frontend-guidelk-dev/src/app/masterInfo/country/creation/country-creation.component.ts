import {Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation} from "@angular/core";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {RolePermission} from "../../../shared/rolePermission/rolePermission";
import {CountryService} from "../../../service/data/country.service";
import {NgForm} from "@angular/forms";
import {Country} from "../country";
import {MasterStatus} from "../../../util/master-status";
import {take} from "rxjs/operators";
import {ConfirmDialogComponent, ConfirmDialogModel} from "../../../shared/confirm-dialog/confirm-dialog.component";

@Component({
    selector: 'app-country-creation',
    templateUrl: './country-creation.component.html',
    styleUrls: ['./country-creation.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class CountryCreationComponent implements OnInit {
    @Input() country: Country;
    @Input() isUpdate: Boolean;
    @Input() isNew: Boolean;
    @Output() onDelete: EventEmitter<number> = new EventEmitter<number>();
    @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();
    @ViewChild('countryForm') countryForm: NgForm;
    statusList: MasterStatus[];

    constructor(private snackBar: MatSnackBar,
                public dialog: MatDialog,
                private countryService: CountryService,
                public rolePermission: RolePermission) {
    }

    ngOnInit() {
        if (this.country == null) {
            this.country = new Country();
            this.isUpdate = false;
            this.isNew = false;
        }

        if (this.isUpdate) {
            this.countryService.getMasterDataStatus('UPDATE')
                .pipe(take(1)).subscribe(
                response => this.statusList = response
            );
        } else {
            this.countryService.getMasterDataStatus('CREATE')
                .pipe(take(1)).subscribe(
                response => this.statusList = response
            );
        }
    }

    public resetForm() {
        this.countryForm.resetForm();
    }

    public createCountry(): void {
        this.countryService.postCountry(this.country).pipe(take(1)).subscribe((country) => {
            this.country = country;
            this.snackBar.open('Country Saved', 'success', <MatSnackBarConfig>{
                duration: 3000
            });
            this.isUpdate = true;
            this.isNew = true;
        }, (error) => {
            this.snackBar.open('Country already exist', "error", <MatSnackBarConfig>{
                panelClass: ['red-snackbar']
            });
        })
    }

    public updateCountry(): void {
        this.countryService.putCountry(this.country).subscribe(country => {
            this.country = country;
            this.snackBar.open('Country updated', 'success', <MatSnackBarConfig>{
                duration: 3000
            });
        }, error => {
            this.snackBar.open('Organization already exist', "error", <MatSnackBarConfig>{
                panelClass: ['red-snackbar']
            });
        })
    }

    public deleteCountry(): void {
        const countryId = this.country.countryId;
        const message = 'Are you sure you want to delete this Country?';
        const dialogData = new ConfirmDialogModel('Confirm Action', message);
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            maxWidth: '400px',
            data: dialogData
        });
        dialogRef.afterClosed().subscribe(dialogResult => {
            this.countryService.deleteCountry(this.country).subscribe(country => {
                this.snackBar.open('Country deleted', 'success', {
                    duration: 3000
                });
                this.isUpdate = false;
                this.isNew = false;
                this.onDelete.emit(countryId);
                this.resetForm();
                this.country.countryId = null;
            }, error => {
                this.snackBar.open(error.error, 'error', <MatSnackBarConfig>{
                    panelClass: ['red-snackbar']
                });
            });
        });
    }
}