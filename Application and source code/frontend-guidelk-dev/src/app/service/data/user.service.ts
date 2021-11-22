import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {HttpService} from "../../core/utill/http.service";
import {Observable, throwError} from "rxjs";
import {catchError, map, retry} from "rxjs/operators";
import {User} from "../../config/user/user";
import {Role} from "../../config/role/role";
import {MasterStatus} from "../../util/master-status";
import {UserVo} from "../../config/user/user-vo";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) {
    }

    httpHeader = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    postUser(user: User): Observable<User> {
        return this.http.post<User>(HttpService.SERVICE_PATH + 'users/', JSON.stringify(user), this.httpHeader)
            .pipe(
                retry(1),
                catchError(this.processError)
            )
    }

    putUser(user: User): Observable<User> {
        return this.http.put<User>(HttpService.SERVICE_PATH + 'users/', JSON.stringify(user), this.httpHeader)
            .pipe(
                retry(1),
                catchError(this.processError)
            )
    }

    deleteUser(user: User) {
        return this.http.delete<User>(HttpService.SERVICE_PATH + 'users/' + user.userId, this.httpHeader)
            .pipe(
                retry(1),
                catchError(this.processError)
            )
    }

    userSearch(userVo: UserVo): Observable<User[]> {
        return this.http.post<User[]>(HttpService.SERVICE_PATH + 'users/userSearch', JSON.stringify(userVo), this.httpHeader)
            .pipe(
                retry(1),
                catchError(this.processError)
            )
    }

    getRolesByUserId(userId: number): Observable<Role[]> {
        let params = new HttpParams();
        params = params.set('userId', userId.toString());
        return this.http.get(HttpService.SERVICE_PATH + 'users/', {params: params})
            .pipe(map(response => <Role[]>response));
    }

    getUserData(userName: string): Observable<User> {
        let params = new HttpParams();
        params = params.set('userName', userName);
        return this.http.get(HttpService.SERVICE_PATH + 'users/getUserData', {
            params: params
        }).pipe(map(response => <User>response));
    }

    getMasterDataStatus(filter: string): Observable<MasterStatus[]> {
        let params = new HttpParams();
        params = params.set('filter', filter);
        return this.http.get(HttpService.SERVICE_PATH + 'roles/getMasterStatusList', {
            params: params
        }).pipe(map(response => <MasterStatus[]>response));
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