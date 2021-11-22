import {Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation} from "@angular/core";
import {NgForm} from "@angular/forms";
import {MasterStatus} from "../../../util/master-status";
import {User} from "../user";
import {Role} from "../../role/role";
import {RoleDisplayComponent} from "../../role/display/role-display.component";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {RoleService} from "../../../service/data/role.service";
import {RolePermission} from "../../../shared/rolePermission/rolePermission";
import {UserService} from "../../../service/data/user.service";
import {take} from "rxjs/operators";
import {ConfirmDialogComponent, ConfirmDialogModel} from "../../../shared/confirm-dialog/confirm-dialog.component";

@Component({
    selector: 'app-user-creation',
    templateUrl: './user-creation.component.html',
    styleUrls: ['./user-creation.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class UserCreationComponent implements OnInit {
    @Input() user: User;
    @Input() isUpdate: Boolean;
    @Input() isNew: Boolean;
    @Input() actionType: string;
    @Input() isDisabled: boolean = false;
    @Output() onDelete: EventEmitter<number> = new EventEmitter<number>();
    @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();
    @ViewChild('userForm') userForm: NgForm;
    statusList: MasterStatus[];
    roleList: Role[];
    emailPattern = '^(([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5}){1,25})*$';
    pWord: string;
    conPword: string;
    @ViewChild(RoleDisplayComponent) roleDisplayComponent: RoleDisplayComponent;

    constructor(private snackBar: MatSnackBar,
                public dialog: MatDialog,
                private userService: UserService,
                private roleService: RoleService,
                public rolePermission: RolePermission) {
    }

    ngOnInit() {
        if (this.user == null) {
            this.user = new User();
            this.isUpdate = false;
            this.isNew = false;
            this.actionType = 'Create';
        }

        if (this.isUpdate) {
            this.roleService.getMasterDataStatus('UPDATE')
                .pipe(take(1)).subscribe(
                response => this.statusList = response
            );
        } else {
            this.roleService.getMasterDataStatus('CREATE')
                .pipe(take(1)).subscribe(
                response => this.statusList = response
            );
        }

        this.roleService.getRoleList().pipe(take(1))
            .subscribe(roleList => this.roleList = roleList);
    }

    public resetForm() {
        this.userForm.resetForm();
        this.roleDisplayComponent.isUnassigned();
        this.isDisabled = false;
    }

    public createUser(): void {
        if (this.user.password !== this.user.confirmPassword) {
            this.snackBar.open('Password not matched', 'Error', <MatSnackBarConfig>{
                duration: 6000,
                panelClass: ['red-snackbar']
            });
            return;
        }

        const roleList: Role[] = [];
        this.roleDisplayComponent.roleList.forEach(selectedRole => {
            if (selectedRole.isAssigned) {
                const role = new Role();
                role.roleId = selectedRole.roleId;
                role.roleName = selectedRole.roleName;
                role.status = selectedRole.status;
                roleList.push(role);
            }
        });

        this.user.roles = roleList;
        this.user.organizationId = Number(window.sessionStorage.getItem('organizationId'));
        this.pWord = this.user.password;
        this.conPword = this.user.confirmPassword;
        this.userService.postUser(this.user).pipe(take(1)).subscribe((user) => {
            this.user = user;
            this.user.password = this.pWord;
            this.user.confirmPassword = this.conPword;
            this.snackBar.open('User Saved', 'success', <MatSnackBarConfig>{
                duration: 3000
            });
            this.isUpdate = true;
            this.isNew = true;
            this.isDisabled = true;
        }, (error) => {
            this.snackBar.open('User already exist', "error", <MatSnackBarConfig>{
                panelClass: ['red-snackbar']
            });
        })
    }

    public updateUser(): void {
        const roleList: Role[] = [];
        this.roleDisplayComponent.roleList.forEach(selectedRole => {
            if (selectedRole.isAssigned) {
                const role = new Role();
                role.roleId = selectedRole.roleId;
                role.roleName = selectedRole.roleName;
                role.status = selectedRole.status;
                roleList.push(role);
            }
        });

        this.user.roles = roleList;
        this.pWord = this.user.password;
        this.conPword = this.user.confirmPassword;
        this.userService.putUser(this.user).subscribe(user => {
            this.user = user;
            this.user.password = this.pWord;
            this.user.confirmPassword = this.conPword;
            this.snackBar.open('User updated', 'success', <MatSnackBarConfig>{
                duration: 3000
            });
        }, error => {
            this.snackBar.open('User already exist', "error", <MatSnackBarConfig>{
                panelClass: ['red-snackbar']
            });
        })
    }

    public deleteUser(): void {
        const userId = this.user.userId;
        const message = 'Are you sure you want to delete this User?';
        const dialogData = new ConfirmDialogModel('Confirm Action', message);
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            maxWidth: '400px',
            data: dialogData
        });
        dialogRef.afterClosed().subscribe(dialogResult => {
            this.userService.deleteUser(this.user).subscribe(user => {
                this.snackBar.open('User deleted', 'success', {
                    duration: 3000
                });
                this.isUpdate = false;
                this.isNew = false;
                this.onDelete.emit(userId);
                this.resetForm();
                this.user.userId = null;
            }, error => {
                this.snackBar.open(error.error, 'error', <MatSnackBarConfig>{
                    panelClass: ['red-snackbar']
                });
            });
        });
    }

    isNumber(event: KeyboardEvent) {
        const allowedChars = new Set('0123456789'.split('').map(c => c.charCodeAt(0)));
        if (event.keyCode > 31 && !allowedChars.has(event.keyCode)) {
            event.preventDefault();
        }
    }

}