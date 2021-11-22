import { Input, ViewEncapsulation, Component } from '@angular/core';

@Component({
    selector: 'app-audit',
    templateUrl: './audit.component.html',
    encapsulation: ViewEncapsulation.None
})
export class AuditComponent {
    @Input() createdBy: String;
    @Input() createdDate: Date;
    @Input() lastModifiedBy: String;
    @Input() lastModifiedDate: Date;
}
