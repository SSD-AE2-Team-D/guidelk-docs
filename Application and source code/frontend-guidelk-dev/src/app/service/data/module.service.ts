import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, throwError} from "rxjs";
import {HttpService} from "../../core/utill/http.service";
import {catchError, map, retry} from "rxjs/operators";
import {Module} from "../../config/module/module";
import {MasterStatus} from "../../util/master-status";
import {ModuleVo} from "../../config/module/module-vo";


@Injectable({
    providedIn: 'root'
})
export class ModuleService {
    constructor(private http: HttpClient) {
    }

    httpHeader = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    postModule(module: Module): Observable<Module> {
        return this.http.post<Module>(HttpService.SERVICE_PATH + 'modules/', JSON.stringify(module), this.httpHeader)
            .pipe(
                retry(1),
                catchError(this.processError)
            )
    }

    putModule(module: Module): Observable<Module> {
        return this.http.put<Module>(HttpService.SERVICE_PATH + 'modules/', JSON.stringify(module), this.httpHeader)
            .pipe(
                retry(1),
                catchError(this.processError)
            )
    }

    deleteModule(module: Module) {
        return this.http.delete<Module>(HttpService.SERVICE_PATH + 'modules/' + module.moduleId, this.httpHeader)
            .pipe(
                retry(1),
                catchError(this.processError)
            )
    }

    getUserModules(userName: string, organizationId: number): Observable<Module[]> {
        let params = new HttpParams();
        params = params.set('userName', userName);
        params = params.set('organizationId', organizationId.toString());
        return this.http.get(HttpService.SERVICE_PATH + 'modules/getUserModules', {
            params: params
        }).pipe(map(response => <Module[]>response));
    }

    getUserModuleList(): Observable<Module[]> {
        return this.http.get(HttpService.SERVICE_PATH + 'modules/getUserModuleList', this.httpHeader)
            .pipe(map(response => <Module[]>response));
    }

    getModuleData(moduleId: string): Observable<Module> {
        let params = new HttpParams();
        params = params.set('moduleId', moduleId);
        return this.http.get(HttpService.SERVICE_PATH + 'modules/getModuleData', {
            params: params
        }).pipe(map(response => <Module>response));
    }

    moduleSearch(moduleVo: ModuleVo): Observable<Module[]> {
        return this.http.post<Module[]>(HttpService.SERVICE_PATH + 'modules/moduleSearch', JSON.stringify(moduleVo), this.httpHeader)
            .pipe(
                retry(1),
                catchError(this.processError)
            )
    }

    getMasterDataStatus(filter: string): Observable<MasterStatus[]> {
        let params = new HttpParams();
        params = params.set('filter', filter);
        return this.http.get(HttpService.SERVICE_PATH + 'modules/getMasterStatusList', {
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