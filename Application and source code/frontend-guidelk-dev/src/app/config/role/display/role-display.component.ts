import {Component, Input, OnInit, ViewEncapsulation} from "@angular/core";
import {RoleService} from "../../../service/data/role.service";
import {UserService} from "../../../service/data/user.service";
import {Role} from "../role";
import {take} from "rxjs/operators";
import {Authority} from "../../authority/authority";

@Component({
    selector: 'role-display',
    templateUrl: './role-display.component.html',
    encapsulation: ViewEncapsulation.None
})
export class RoleDisplayComponent implements OnInit {
    @Input() userId: number;
    @Input() actionType: string;
    @Input() roleList: Role[];
    displayRoleList: Role[];

    constructor(private roleService: RoleService,
                private userService: UserService) {

    }

    ngOnInit() {
        if (this.actionType === 'Create') {
            this.roleService.getRoleList().pipe(take(1))
                .subscribe(roleList => this.roleList = roleList);
        }

        if (this.actionType === 'Update') {
            this.roleService.getRoleList()
                .pipe(take(1)).subscribe(
                response => {
                    this.roleList = response;
                    if (this.userId) {
                        this.assignRole(this.roleList);
                    }
                }
            );
        }
    }

    private assignRole(roles: Role[]) {
        this.userService.getRolesByUserId(this.userId).pipe(take(1))
            .subscribe(displayRoleList => {
                this.displayRoleList = displayRoleList;
                if (this.displayRoleList) {
                    this.displayRoleList.forEach(displayRole => {
                        roles.forEach(role => {
                            if (displayRole.status !== 0) {
                                if (role.roleId === displayRole.roleId) {
                                    role.isAssigned = true;
                                }
                            }

                        })
                    });
                }
            })
    }

    public isUnassigned(): void {
        if (this.roleList.length !== null && this.roleList.length > 0) {
            this.roleList.forEach(role => {
                if (role.isAssigned) {
                    role.isAssigned = false;
                }
            })
        }
    }
}