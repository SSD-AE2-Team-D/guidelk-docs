import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthRequest} from "../../login/auth-request";
import {HttpService} from "../../core/utill/http.service";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";

let HTTPOptions: Object = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    }),
    responseType: 'text as json'
}

@Injectable({providedIn: 'root'})
export class JwtClientService {

    httpHeader = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    constructor(private router: Router,
                private http: HttpClient) {
    }

    authenticate(authRequest: AuthRequest): Observable<any> {
        return this.http.post<any>(HttpService.SERVICE_PATH + 'api/auth/authenticate', JSON.stringify(authRequest), this.httpHeader)
            .pipe(
                retry(1),
                catchError(this.processError)
            )
    }

    refreshToken(token: string): Observable<any> {
        return this.http.post<any>(HttpService.SERVICE_PATH + 'api/auth/refreshToken', {refreshToken: token}, this.httpHeader)
            .pipe(
                retry(1),
                catchError(this.processError)
            )
    }

    doLogout(userId: any): Observable<any> {
        return this.http.post<any>(HttpService.SERVICE_PATH + 'api/auth/logout', {userId: userId}, this.httpHeader)
            .pipe(
                retry(1),
                catchError(this.processError)
            )
    }

    public tokenExpired(token: any) {
        const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
        return (Math.floor((new Date).getTime() / 1000)) >= expiry;
    }

    public getToken() {
        return window.sessionStorage.getItem('access_token');
    }

    public getRefreshToken() {
        return window.sessionStorage.getItem('refresh_token');
    }

    get isLoggedIn(): boolean {
        let authToken = window.sessionStorage.getItem('access_token');
        return (authToken !== null);
    }

    processError(err: any) {
        let message = '';
        if (err.error instanceof ErrorEvent) {
            message = err.error.message;
        } else {
            message = `Error Code: ${err.status}\nMessage: ${err.message}`;
        }
        console.log(message);
        return throwError(message);
    }

}
