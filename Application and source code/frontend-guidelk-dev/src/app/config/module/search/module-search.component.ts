import {Component, Inject, Input, OnInit, ViewChild, ViewEncapsulation} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ModuleVo} from "../module-vo";
import {NgForm} from "@angular/forms";
import {MasterStatus} from "../../../util/master-status";
import {take} from "rxjs/operators";
import * as moment from 'moment';
import {ModuleService} from "../../../service/data/module.service";
import {Module} from "../module";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
    selector: 'app-module-search',
    templateUrl: './module-search.component.html',
    styleUrls: ['./module-search.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class ModuleSearchComponent implements OnInit {
    @Input() moduleVo: ModuleVo;
    @ViewChild('moduleSearchForm') moduleSearchForm: NgForm;
    dialogRef: MatDialogRef<ModuleDialogComponent>;
    moduleInfoTable: Module[] = [];
    moduleInfoTableDataSource = new MatTableDataSource(this.moduleInfoTable);
    public displayedColumns = ['ModuleName', 'ModuleCode', 'CreatedBy', 'CreatedDate', 'LastModifiedBy', 'LastModifiedDate', 'Status', 'Action'];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    statusList: MasterStatus[];

    constructor(private dialog: MatDialog,
                private moduleService: ModuleService,) {
    }

    ngOnInit() {
        this.moduleInfoTableDataSource.paginator = this.paginator;
        this.moduleInfoTableDataSource.sort = this.sort;
        if (this.moduleVo == null) {
            this.moduleVo = new ModuleVo();
        }

        this.moduleService.getMasterDataStatus('SEARCH')
            .pipe(take(1)).subscribe(
            response => this.statusList = response
        );
    }

    applyFilter(val: any) {
        if (val) {
            this.moduleInfoTableDataSource.filter = val.trim().toLowerCase();
            if (this.moduleInfoTableDataSource.paginator) {
                this.moduleInfoTableDataSource.paginator.firstPage();
            }
        }

    }


    openDialog(module: any) {
        this.dialogRef = this.dialog.open(ModuleDialogComponent, {
            disableClose: false,
            width: 'inherit',
            data: {module: module},
            height: '70%'
        });
        this.dialogRef.afterClosed().pipe(take(1))
            .subscribe((module: Module[]) => {
                this.searchModule();
            });
    }

    public searchModule(): void {
        this.moduleVo.organizationId = Number(window.sessionStorage.getItem('organizationId'));
        this.moduleService.moduleSearch(this.moduleVo).pipe(take(1))
            .subscribe((module) => {
                this.moduleInfoTable = module;
                this.moduleInfoTableDataSource.data = this.moduleInfoTable;
            })
    }

}

@Component({
    selector: 'app-module-search-modal',
    template: '<app-module-creation [module]="data.module" [isUpdate]="true" [isNew]="false" (onDelete)="closeModal($event)" (onCancel)="closeModal($event)"></app-module-creation>'
})
export class ModuleDialogComponent {
    constructor(public dialogRef: MatDialogRef<ModuleDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    closeModal(moduleId: any) {
        this.dialogRef.close(moduleId);
    }

}