import {Component, Inject, Input, OnInit, ViewChild, ViewEncapsulation} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {RoleVo} from "../role-vo";
import {NgForm} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MasterStatus} from "../../../util/master-status";
import {Role} from "../role";
import {RoleService} from "../../../service/data/role.service";
import {take} from "rxjs/operators";

@Component({
    selector: 'app-role-search',
    templateUrl: './role-search.component.html',
    styleUrls: ['./role-search.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class RoleSearchComponent implements OnInit {
    @Input() roleVo: RoleVo;
    @ViewChild('roleSearchForm') roleSearchForm: NgForm;
    dialogRef: MatDialogRef<RoleDialogComponent>;
    roleInfoTable: Role[] = [];
    roleInfoTableDataSource = new MatTableDataSource(this.roleInfoTable);
    public displayedColumns = ['RoleName', 'CreatedBy', 'CreatedDate', 'LastModifiedBy', 'LastModifiedDate', 'Status', 'Action'];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    statusList: MasterStatus[];

    constructor(private dialog: MatDialog,
                private roleService: RoleService) {

    }

    ngOnInit() {
        this.roleInfoTableDataSource.paginator = this.paginator;
        this.roleInfoTableDataSource.sort = this.sort;
        if (this.roleVo == null) {
            this.roleVo = new RoleVo();
        }

        this.roleService.getMasterDataStatus('SEARCH')
            .pipe(take(1)).subscribe(
            response => this.statusList = response
        );
    }

    applyFilter(val: any) {
        if (val) {
            this.roleInfoTableDataSource.filter = val.trim().toLowerCase();
            if (this.roleInfoTableDataSource.paginator) {
                this.roleInfoTableDataSource.paginator.firstPage();
            }
        }

    }

    openDialog(role: any) {
        this.dialogRef = this.dialog.open(RoleDialogComponent, {
            disableClose: false,
            width: 'inherit',
            data: {
                role: role,
                actionType: 'Update'
            },
            height: '75%'
        });
        this.dialogRef.afterClosed().pipe(take(1))
            .subscribe((role: Role[]) => {
                this.searchRole();
            });
    }

    public searchRole(): void {
        this.roleService.roleSearch(this.roleVo).pipe(take(1))
            .subscribe((role) => {
                this.roleInfoTable = role;
                this.roleInfoTableDataSource.data = this.roleInfoTable;
            })
    }

}

@Component({
    selector: 'app-page-search-modal',
    template: '<app-role-creation [role]="data.role" [isUpdate]="true" [isNew]="false" [isDisabled]="true" [actionType]="data.actionType" (onDelete)="closeModal($event)" (onCancel)="closeModal($event)"></app-role-creation>'
})
export class RoleDialogComponent {
    constructor(public dialogRef: MatDialogRef<RoleDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    closeModal(roleId: any) {
        this.dialogRef.close(roleId);
    }

}