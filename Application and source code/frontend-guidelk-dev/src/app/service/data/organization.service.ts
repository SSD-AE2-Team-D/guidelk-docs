import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {HttpService} from "../../core/utill/http.service";
import {catchError, map, retry} from "rxjs/operators";
import {Organization} from "../../config/organization/organization";
import {OrganizationVo} from "../../config/organization/organization-vo";
import {MasterStatus} from "../../util/master-status";

@Injectable({
    providedIn: 'root'
})
export class OrganizationService {
    constructor(private http: HttpClient) {
    }

    httpHeader = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    postOrganization(organization: Organization): Observable<Organization> {
        return this.http.post<Organization>(HttpService.SERVICE_PATH + 'organizations/', JSON.stringify(organization), this.httpHeader)
            .pipe(
                retry(1),
                catchError(this.processError)
            )
    }

    putOrganization(organization: Organization): Observable<Organization> {
        return this.http.put<Organization>(HttpService.SERVICE_PATH + 'organizations/', JSON.stringify(organization), this.httpHeader)
            .pipe(
                retry(1),
                catchError(this.processError)
            )
    }

    deleteOrganization(organization: Organization) {
        return this.http.delete<Organization>(HttpService.SERVICE_PATH + 'organizations/' + organization.organizationId, this.httpHeader)
            .pipe(
                retry(1),
                catchError(this.processError)
            )
    }

    organizationSearch(organizationVo: OrganizationVo): Observable<Organization[]> {
        return this.http.post<Organization[]>(HttpService.SERVICE_PATH + 'organizations/organizationSearch', JSON.stringify(organizationVo), this.httpHeader)
            .pipe(
                retry(1),
                catchError(this.processError)
            )
    }

    getMasterDataStatus(filter: string): Observable<MasterStatus[]> {
        let params = new HttpParams();
        params = params.set('filter', filter);
        return this.http.get(HttpService.SERVICE_PATH + 'organizations/getMasterStatusList', {
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