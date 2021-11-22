import {Component, Inject, Input, OnInit, ViewChild, ViewEncapsulation} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../../service/data/user.service";
import {NgForm} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MasterStatus} from "../../../util/master-status";
import {UserVo} from "../user-vo";
import {User} from "../user";
import {take} from "rxjs/operators";

@Component({
    selector: 'app-user-search',
    templateUrl: './user-search.component.html',
    styleUrls: ['./user-search.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class UserSearchComponent implements OnInit {
    @Input() userVo: UserVo;
    @ViewChild('userSearchForm') userSearchForm: NgForm;
    dialogRef: MatDialogRef<UserDialogComponent>;
    userInfoTable: User[] = [];
    userInfoTableDataSource = new MatTableDataSource(this.userInfoTable);
    public displayedColumns = ['UserName', 'Email', 'CreatedBy', 'CreatedDate', 'LastModifiedBy', 'LastModifiedDate', 'Status', 'Action'];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    statusList: MasterStatus[];


    constructor(private dialog: MatDialog,
                private userService: UserService) {
    }

    ngOnInit() {
        this.userInfoTableDataSource.paginator = this.paginator;
        this.userInfoTableDataSource.sort = this.sort;
        if (this.userVo == null) {
            this.userVo = new UserVo();
        }

        this.userService.getMasterDataStatus('SEARCH')
            .pipe(take(1)).subscribe(
            response => this.statusList = response
        );
    }

    applyFilter(val: any) {
        if (val) {
            this.userInfoTableDataSource.filter = val.trim().toLowerCase();
            if (this.userInfoTableDataSource.paginator) {
                this.userInfoTableDataSource.paginator.firstPage();
            }
        }

    }

    openDialog(user: any) {
        this.dialogRef = this.dialog.open(UserDialogComponent, {
            disableClose: false,
            width: 'inherit',
            data: {
                user: user,
                actionType: 'Update'
            },
            height: '85%'
        });
        this.dialogRef.afterClosed().pipe(take(1))
            .subscribe((user: User[]) => {
                this.searchUser();
            });
    }

    public searchUser(): void {
        this.userVo.organizationId = Number(window.sessionStorage.getItem('organizationId'));
        this.userService.userSearch(this.userVo).pipe(take(1))
            .subscribe((user) => {
                this.userInfoTable = user;
                this.userInfoTableDataSource.data = this.userInfoTable;
            })
    }

}

@Component({
    selector: 'app-user-search-modal',
    template: '<app-user-creation [user]="data.user" [isUpdate]="true" [isNew]="false" [isDisabled]="true" [actionType]="data.actionType" (onDelete)="closeModal($event)" (onCancel)="closeModal($event)"></app-user-creation>'
})
export class UserDialogComponent {
    constructor(public dialogRef: MatDialogRef<UserDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    closeModal(userId: any) {
        this.dialogRef.close(userId);
    }

}