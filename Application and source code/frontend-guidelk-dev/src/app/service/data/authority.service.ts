import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Authority} from "../../config/authority/authority";
import {HttpService} from "../../core/utill/http.service";
import {map} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class AuthorityService {
    constructor(private http: HttpClient) {
    }
    httpHeader = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    getDefaultAuthorityList(): Observable<Authority[]> {
        return this.http.get(HttpService.SERVICE_PATH + 'authorities/defaultAuthorities', this.httpHeader)
            .pipe(map(response => <Authority[]>response));
    }

    getUserAuthorities(userName: string, organizationId: number): Observable<Authority[]> {
        let params = new HttpParams();
        params = params.set('userName', userName);
        params = params.set('organizationId', organizationId);
        return this.http.get(HttpService.SERVICE_PATH + 'authorities/getUserAuthorities', {
            params: params
        }).pipe(map(response => <Authority[]>response));
    }
}