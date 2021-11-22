import {Component, Inject, Input, OnInit, ViewChild, ViewEncapsulation} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ModuleService} from "../../../service/data/module.service";
import {PageService} from "../../../service/data/page.service";
import {NgForm} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MasterStatus} from "../../../util/master-status";
import {PageVo} from "../page-vo";
import {Page} from "../page";
import {take} from "rxjs/operators";
import {Module} from "../../module/module";

@Component({
    selector: 'app-page-search',
    templateUrl: './page-search.component.html',
    styleUrls: ['./page-search.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class PageSearchComponent implements OnInit {
    @Input() pageVo: PageVo;
    @ViewChild('pageSearchForm') pageSearchForm: NgForm;
    dialogRef: MatDialogRef<PageDialogComponent>;
    pageInfoTable: Page[] = [];
    pageInfoTableDataSource = new MatTableDataSource(this.pageInfoTable);
    public displayedColumns = ['PageName', 'Module', 'UrlPattern', 'Icon', 'OrderIndex', 'CreatedBy', 'CreatedDate', 'LastModifiedBy', 'LastModifiedDate', 'Status', 'Action'];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    statusList: MasterStatus[];
    moduleList: Module[];

    constructor(private dialog: MatDialog,
                private moduleService: ModuleService,
                private pageService: PageService) {

    }

    ngOnInit() {
        this.pageInfoTableDataSource.paginator = this.paginator;
        this.pageInfoTableDataSource.sort = this.sort;
        if (this.pageVo == null) {
            this.pageVo = new PageVo();
        }

        this.pageService.getMasterDataStatus('SEARCH')
            .pipe(take(1)).subscribe(
            response => this.statusList = response
        );

        this.moduleService.getUserModuleList()
            .pipe(take(1)).subscribe(
            response => this.moduleList = response
        );
    }

    applyFilter(val: any) {
        if (val) {
            this.pageInfoTableDataSource.filter = val.trim().toLowerCase();
            if (this.pageInfoTableDataSource.paginator) {
                this.pageInfoTableDataSource.paginator.firstPage();
            }
        }

    }

    openDialog(page: any) {
        this.dialogRef = this.dialog.open(PageDialogComponent, {
            disableClose: false,
            width: 'inherit',
            data: {
                page: page,
                actionType: 'Update'
            },
            height: '75%'
        });
        this.dialogRef.afterClosed().pipe(take(1))
            .subscribe((page: Page[]) => {
                this.searchPage();
            });
    }

    public searchPage(): void {
        this.pageService.pageSearch(this.pageVo).pipe(take(1))
            .subscribe((page) => {
                this.pageInfoTable = page;
                this.pageInfoTableDataSource.data = this.pageInfoTable;
            })
    }
}

@Component({
    selector: 'app-page-search-modal',
    template: '<app-page-creation [page]="data.page" [isUpdate]="true" [isNew]="false" [isDisabled]="true" [actionType]="data.actionType" (onDelete)="closeModal($event)" (onCancel)="closeModal($event)"></app-page-creation>'
})
export class PageDialogComponent {
    constructor(public dialogRef: MatDialogRef<PageDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    closeModal(pageId: any) {
        this.dialogRef.close(pageId);
    }

}