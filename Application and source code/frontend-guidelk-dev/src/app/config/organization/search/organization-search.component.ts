import {Component, Inject, Input, OnInit, ViewChild, ViewEncapsulation} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {OrganizationService} from "../../../service/data/organization.service";
import {NgForm} from "@angular/forms";
import {Module} from "../../module/module";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MasterStatus} from "../../../util/master-status";
import {OrganizationVo} from "../organization-vo";
import {Organization} from "../organization";
import {take} from "rxjs/operators";

@Component({
    selector: 'app-organization-search',
    templateUrl: './organization-search.component.html',
    styleUrls: ['./organization-search.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class OrganizationSearchComponent implements OnInit {
    @Input() organizationVo: OrganizationVo;
    @ViewChild('organizationSearchForm') organizationSearchForm: NgForm;
    dialogRef: MatDialogRef<OrganizationDialogComponent>;
    organizationInfoTable: Organization[] = [];
    organizationInfoTableDataSource = new MatTableDataSource(this.organizationInfoTable);
    public displayedColumns = ['OrganizationName', 'OrganizationCode', 'CreatedBy', 'CreatedDate', 'LastModifiedBy', 'LastModifiedDate', 'Status', 'Action'];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    statusList: MasterStatus[];

    constructor(private dialog: MatDialog,
                private organizationService: OrganizationService){

    }

    ngOnInit() {
        this.organizationInfoTableDataSource.paginator = this.paginator;
        this.organizationInfoTableDataSource.sort = this.sort;
        if (this.organizationVo == null) {
            this.organizationVo = new OrganizationVo();
        }

        this.organizationService.getMasterDataStatus('SEARCH')
            .pipe(take(1)).subscribe(
            response => this.statusList = response
        );
    }

    applyFilter(val: any) {
        if (val) {
            this.organizationInfoTableDataSource.filter = val.trim().toLowerCase();
            if (this.organizationInfoTableDataSource.paginator) {
                this.organizationInfoTableDataSource.paginator.firstPage();
            }
        }
    }

    openDialog(organization: any) {
        this.dialogRef = this.dialog.open(OrganizationDialogComponent, {
            disableClose: false,
            width: 'inherit',
            data: {organization: organization},
            height: '100%'
        });
        this.dialogRef.afterClosed().pipe(take(1))
            .subscribe((module: Module[]) => {
                this.searchOrganization();
            });
    }

    public searchOrganization(): void {
        this.organizationService.organizationSearch(this.organizationVo).pipe(take(1))
            .subscribe((organization) => {
                this.organizationInfoTable = organization;
                this.organizationInfoTableDataSource.data = this.organizationInfoTable;
            })
    }
}

@Component({
    selector: 'app-organization-search-modal',
    template: '<app-organization-creation [organization]="data.organization" [isUpdate]="true" [isNew]="false" (onDelete)="closeModal($event)" (onCancel)="closeModal($event)"></app-organization-creation>'
})
export class OrganizationDialogComponent {
    constructor(public dialogRef: MatDialogRef<OrganizationDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    closeModal(organizationId: any) {
        this.dialogRef.close(organizationId);
    }

}