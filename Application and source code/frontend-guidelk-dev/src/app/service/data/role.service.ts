import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {HttpService} from "../../core/utill/http.service";
import {catchError, map, retry} from "rxjs/operators";
import {Role} from "../../config/role/role";
import {RoleVo} from "../../config/role/role-vo";
import {MasterStatus} from "../../util/master-status";
import {Page} from "../../config/page/page";

@Injectable({
    providedIn: 'root'
})
export class RoleService {
    constructor(private http: HttpClient) {
    }

    httpHeader = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    postRole(role: Role): Observable<Role> {
        return this.http.post<Role>(HttpService.SERVICE_PATH + 'roles/', JSON.stringify(role), this.httpHeader)
            .pipe(
                retry(1),
                catchError(this.processError)
            )
    }

    putRole(role: Role): Observable<Role> {
        return this.http.put<Role>(HttpService.SERVICE_PATH + 'roles/', JSON.stringify(role), this.httpHeader)
            .pipe(
                retry(1),
                catchError(this.processError)
            )
    }

    deleteRole(role: Role) {
        return this.http.delete<Role>(HttpService.SERVICE_PATH + 'roles/' + role.roleId, this.httpHeader)
            .pipe(
                retry(1),
                catchError(this.processError)
            )
    }

    roleSearch(roleVo: RoleVo): Observable<Role[]> {
        return this.http.post<Role[]>(HttpService.SERVICE_PATH + 'roles/roleSearch', JSON.stringify(roleVo), this.httpHeader)
            .pipe(
                retry(1),
                catchError(this.processError)
            )
    }

    getPagesByRoleId(roleId: number): Observable<Page[]> {
        let params = new HttpParams();
        params = params.set('roleId', roleId.toString());
        return this.http.get(HttpService.SERVICE_PATH + 'roles/', {params: params})
            .pipe(map(response => <Page[]>response));
    }

    getRoleList(): Observable<Role[]> {
        return this.http.get(HttpService.SERVICE_PATH + 'roles/getRoleList', this.httpHeader)
            .pipe(map(response => <Role[]>response));
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