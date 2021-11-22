import {Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation} from "@angular/core";
import {PackageFeedback} from "../package-feedback";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {NgForm} from "@angular/forms";
import {PackageService} from "../../../../service/data/package.service";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Component({
    selector: 'app-feedback',
    templateUrl: './stay-feedback.component.html',
    styleUrls: ['./stay-feedback.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class StayFeedbackComponent implements OnInit {

    @Input() packageFeedback: PackageFeedback;
    @Input() packageId: number;
    @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();
    @ViewChild('feedbackForm') feedbackForm: NgForm;

    constructor(private snackBar: MatSnackBar,
                private dialog: MatDialog,
                private packageService: PackageService,) {

    }

    ngOnInit() {
        if (this.packageFeedback == null) {
            this.packageFeedback = new PackageFeedback();
        }
    }

    public feedback(): void {
        this.packageFeedback.packageId = this.packageId;
        this.packageService.postFeedback(this.packageFeedback).subscribe(packageFeedback => {
            this.packageFeedback = packageFeedback;
            this.snackBar.open('Feedback updated', 'success', <MatSnackBarConfig>{
                duration: 3000
            });
        }, error => {
            this.snackBar.open('Feedback already exist', "error", <MatSnackBarConfig>{
                panelClass: ['red-snackbar']
            });
        })
    }
}