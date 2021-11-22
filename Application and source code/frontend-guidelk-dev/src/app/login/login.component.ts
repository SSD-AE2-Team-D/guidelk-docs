import {Component, OnInit} from '@angular/core';
import {take} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from '@angular/router';
import {AuthRequest} from "./auth-request";
import {JwtClientService} from "../service/data/jwt-client.service";
import {UserService} from "../service/data/user.service";
import {AuthorityService} from "../service/data/authority.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    authRequest: AuthRequest;
    errorMsg = ''
    invalidLogin = false

    constructor(private snackBar: MatSnackBar,
                private router: Router,
                private jwtClientService: JwtClientService,
                private userService: UserService,
                private authorityService: AuthorityService) {
        this.authRequest = new AuthRequest();
    }

    ngOnInit(): void {
    }

    public checkLogin(): void {
        this.jwtClientService.authenticate(this.authRequest).pipe(take(1))
            .subscribe((data: any) => {
                window.sessionStorage.setItem('access_token', data.token);
                window.sessionStorage.setItem('refresh_token', data.refreshToken);
                this.saveDataLocalStorage(data, this.authRequest);
            }, error => {
                this.invalidLogin = true;
                this.errorMsg = 'Invalid Credentials';
                return;
            });
    }

    public saveDataLocalStorage(data: any, userData: AuthRequest) {
        this.userService.getUserData(userData.userName).pipe(take(1))
            .subscribe(user => {
                if (user) {
                    this.authorityService.getUserAuthorities(userData.userName, user.organizationId).pipe(take(1))
                        .subscribe(authorities => {
                            if (authorities) {
                                window.sessionStorage.setItem('username', userData.userName);
                                window.sessionStorage.setItem('userId', JSON.stringify(user.userId));
                                window.sessionStorage.setItem('organizationId', JSON.stringify(user.organizationId));
                                window.sessionStorage.setItem('userAuthorityList', JSON.stringify(authorities));
                                this.router.navigate(['main']);
                            }
                        })
                } else {
                    this.invalidLogin = true;
                    this.errorMsg = 'Invalid Credentials';
                    return;
                }
            }, error => {
                this.invalidLogin = true;
                this.errorMsg = 'Invalid Credentials';
                return;
            })
    }

}