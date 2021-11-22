import {Component, Input, OnInit, Output, EventEmitter, ViewEncapsulation, ViewChild} from "@angular/core";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {Module} from "../module";
import {NgForm} from "@angular/forms";
import {MasterStatus} from "../../../util/master-status";
import {ModuleService} from "../../../service/data/module.service";
import {take} from "rxjs/operators";
import {RolePermission} from "../../../shared/rolePermission/rolePermission";
import {ConfirmDialogComponent, ConfirmDialogModel} from "../../../shared/confirm-dialog/confirm-dialog.component";

@Component({
    selector: 'app-module-creation',
    templateUrl: './module-creation.component.html',
    styleUrls: ['./module-creation.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class ModuleCreationComponent implements OnInit {
    @Input() module: Module;
    @Input() isUpdate: Boolean;
    @Input() isNew: Boolean;
    @Output() onDelete: EventEmitter<number> = new EventEmitter<number>();
    @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();
    @ViewChild('moduleForm') moduleForm: NgForm;
    statusList: MasterStatus[];

    constructor(private snackBar: MatSnackBar,
                public dialog: MatDialog,
                private moduleService: ModuleService,
                public rolePermission: RolePermission) {
    }

    ngOnInit() {
        if (this.module == null) {
            this.module = new Module();
            this.isUpdate = false;
            this.isNew = false;
        }

        if (this.isUpdate) {
            this.moduleService.getMasterDataStatus('UPDATE')
                .pipe(take(1)).subscribe(
                response => this.statusList = response
            );
        } else {
            this.moduleService.getMasterDataStatus('CREATE')
                .pipe(take(1)).subscribe(
                response => this.statusList = response
            );
        }
    }

    public resetForm() {
        this.moduleForm.resetForm();
    }

   public createModule(): void {
        this.module.organizationId = Number(window.sessionStorage.getItem('organizationId'));
        this.moduleService.postModule(this.module).pipe(take(1)).subscribe((module) => {
            this.module = module;
            this.snackBar.open('Module Saved', 'success', <MatSnackBarConfig>{
                duration: 3000
            });
            this.isUpdate = true;
            this.isNew = true;
        }, (error) => {
            this.snackBar.open('Module name or code already exist', "error", <MatSnackBarConfig>{
                panelClass: ['red-snackbar']
            });
        })
    }


    public updateModule(): void {
        this.moduleService.putModule(this.module).subscribe(module => {
            this.module = module;
            this.snackBar.open('Module updated', 'success', <MatSnackBarConfig>{
                duration: 3000
            });
        }, error => {
            this.snackBar.open('Module name or code already exist', "error", <MatSnackBarConfig>{
                panelClass: ['red-snackbar']
            });
        })
    }

    public deleteModule(): void {
        const moduleId = this.module.moduleId;
        const message = 'Are you sure you want to delete this Module?';
        const dialogData = new ConfirmDialogModel('Confirm Action', message);
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            maxWidth: '400px',
            data: dialogData
        });
        dialogRef.afterClosed().subscribe(dialogResult => {
            this.moduleService.deleteModule(this.module).subscribe(module => {
                this.snackBar.open('Module deleted', 'success', {
                    duration: 3000
                });
                this.isUpdate = false;
                this.isNew = false;
                this.onDelete.emit(moduleId);
                this.resetForm();
                this.module.moduleId = null;
            }, error => {
                this.snackBar.open(error.error, 'error', <MatSnackBarConfig>{
                    panelClass: ['red-snackbar']
                });
            });
        });

    }

}