import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, throwError} from "rxjs";
import {HttpService} from "../../core/utill/http.service";
import {catchError, map, retry} from "rxjs/operators";
import {Page} from "../../config/page/page";
import {PageVo} from "../../config/page/page-vo";
import {MasterStatus} from "../../util/master-status";
import {Authority} from "../../config/authority/authority";

@Injectable({
    providedIn: 'root'
})
export class PageService {
    constructor(private http: HttpClient) {
    }

    httpHeader = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    postPage(page: Page): Observable<Page> {
        return this.http.post<Page>(HttpService.SERVICE_PATH + 'pages/', JSON.stringify(page), this.httpHeader)
            .pipe(
                retry(1),
                catchError(this.processError)
            )
    }

    putPage(page: Page): Observable<Page> {
        return this.http.put<Page>(HttpService.SERVICE_PATH + 'pages/', JSON.stringify(page), this.httpHeader)
            .pipe(
                retry(1),
                catchError(this.processError)
            )
    }

    deletePage(page: Page) {
        return this.http.delete<Page>(HttpService.SERVICE_PATH + 'pages/' + page.pageId, this.httpHeader)
            .pipe(
                retry(1),
                catchError(this.processError)
            )
    }

    pageSearch(pageVo: PageVo): Observable<Page[]> {
        return this.http.post<Page[]>(HttpService.SERVICE_PATH + 'pages/pageSearch', JSON.stringify(pageVo), this.httpHeader)
            .pipe(
                retry(1),
                catchError(this.processError)
            )
    }

    getPagesByModule(moduleId: number, userId: number): Observable<Page[]> {
        let params = new HttpParams();
        params = params.set('moduleId', moduleId.toString());
        params = params.set('userId', userId.toString());
        return this.http.get(HttpService.SERVICE_PATH + 'pages/getPagesByModule', {
            params: params
        }).pipe(map(response => <Page[]>response));
    }

    getAuthoritiesByPageId(pageId: number): Observable<Authority[]> {
        let params = new HttpParams();
        params = params.set('pageId', pageId.toString());
        return this.http.get(HttpService.SERVICE_PATH + 'pages/', {params: params})
            .pipe(map(response => <Authority[]>response));
    }

    getPageList(): Observable<Page[]> {
        return this.http.get(HttpService.SERVICE_PATH + 'pages/getPageList', this.httpHeader)
            .pipe(map(response => <Page[]>response));
    }

    getMasterDataStatus(filter: string): Observable<MasterStatus[]> {
        let params = new HttpParams();
        params = params.set('filter', filter);
        return this.http.get(HttpService.SERVICE_PATH + 'pages/getMasterStatusList', {
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