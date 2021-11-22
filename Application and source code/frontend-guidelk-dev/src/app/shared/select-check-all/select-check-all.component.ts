import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {NgModel} from '@angular/forms';
import {fadeInAnimation} from "../../core/route-animation/route.animation";
import {MatCheckboxChange} from "@angular/material/checkbox";

@Component({
    selector: 'app-select-check-all',
    templateUrl: './select-check-all.html',
    styles: [''],
    encapsulation: ViewEncapsulation.None,
    host: {
        '[@fadeInAnimation]': 'true'
    },
    animations: [fadeInAnimation]
})

export class SelectCheckAllComponent implements OnInit {
    @Input() model: NgModel;
    @Input() values: any[];
    @Input() type: string;
    @Input() text = 'Select All';

    constructor() {
    }

    ngOnInit() {
    }

    isChecked(): boolean {
        return this.model.value && this.values.length
            && this.model.value.length === this.values.length;
    }

    isIndeterminate(): boolean {
        return this.model.value && this.values.length && this.model.value.length
            && this.model.value.length < this.values.length;
    }

    toggleSelection(change: MatCheckboxChange): void {
        const selectedList: any[] = [];
        if (this.type === 'Org') {
            this.values.forEach(val => {
                selectedList.push(val);
            });
        }

        if (change.checked) {
            this.model.update.emit(selectedList);
        } else {
            this.model.update.emit([]);
        }

    }

}
