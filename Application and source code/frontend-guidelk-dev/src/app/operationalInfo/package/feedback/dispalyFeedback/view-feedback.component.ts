import {Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation} from "@angular/core";
import {NgForm} from "@angular/forms";
import {PackageService} from "../../../../service/data/package.service";
import {HotelPackage} from "../../creation/stay/hotel-package";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {PackageFeedback} from "../package-feedback";
import {take} from "rxjs/operators";

@Component({
    selector: 'app-feedback-view',
    templateUrl: './view-feedback.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ViewFeedbackComponent implements OnInit {
    @Input() packageId: number;
    @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();
    @ViewChild('feedbackViewForm') feedbackForm: NgForm;
    packageFeedbackInfoTable: PackageFeedback[] = [];
    packageFeedbackInfoTableDataSource = new MatTableDataSource(this.packageFeedbackInfoTable);
    public displayedColumns = ['Feedback', 'CreatedBy', 'CreatedDate'];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private packageService: PackageService,){

    }

    ngOnInit() {
        this.packageFeedbackInfoTableDataSource.paginator = this.paginator;
        this.packageFeedbackInfoTableDataSource.sort = this.sort;
        console.log(this.packageId)
        if(this.packageId){
            this.packageService.viewFeedBack(this.packageId).pipe(take(1)).subscribe(feedback =>{
                this.packageFeedbackInfoTable = feedback;
                this.packageFeedbackInfoTableDataSource.data = this.packageFeedbackInfoTable;
            })
        }
    }
}