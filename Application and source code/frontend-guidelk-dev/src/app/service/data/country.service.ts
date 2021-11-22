import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {HttpService} from "../../core/utill/http.service";
import {catchError, map, retry} from "rxjs/operators";
import {Country} from "../../masterInfo/country/country";
import {Module} from "../../config/module/module";
import {MasterStatus} from "../../util/master-status";
import {ModuleVo} from "../../config/module/module-vo";
import {CountryVo} from "../../masterInfo/country/country-vo";

@Injectable({
    providedIn: 'root'
})
export class CountryService{
    constructor(private http: HttpClient) {
    }

    httpHeader = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    postCountry(country: Country): Observable<Country> {
        return this.http.post<Country>(HttpService.SERVICE_PATH + 'countries/', JSON.stringify(country), this.httpHeader)
            .pipe(
                retry(1),
                catchError(this.processError)
            )
    }

    putCountry(country: Country): Observable<Country> {
        return this.http.put<Country>(HttpService.SERVICE_PATH + 'countries/', JSON.stringify(country), this.httpHeader)
            .pipe(
                retry(1),
                catchError(this.processError)
            )
    }

    deleteCountry(country: Country) {
        return this.http.delete<Country>(HttpService.SERVICE_PATH + 'countries/' + country.countryId, this.httpHeader)
            .pipe(
                retry(1),
                catchError(this.processError)
            )
    }

    getCountryList(): Observable<Country[]> {
        return this.http.get(HttpService.SERVICE_PATH + 'countries/getCountryList', this.httpHeader)
            .pipe(map(response => <Country[]>response));
    }

    countrySearch(countryVo: CountryVo): Observable<Country[]> {
        return this.http.post<Country[]>(HttpService.SERVICE_PATH + 'countries/countrySearch', JSON.stringify(countryVo), this.httpHeader)
            .pipe(
                retry(1),
                catchError(this.processError)
            )
    }

    getMasterDataStatus(filter: string): Observable<MasterStatus[]> {
        let params = new HttpParams();
        params = params.set('filter', filter);
        return this.http.get(HttpService.SERVICE_PATH + 'countries/getMasterStatusList', {
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