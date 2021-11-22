import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {HttpService} from "../../core/utill/http.service";
import {catchError, map, retry} from "rxjs/operators";
import {Location} from "../../masterInfo/location/location";
import {LocationVo} from "../../masterInfo/location/location-vo";
import {MasterStatus} from "../../util/master-status";

@Injectable({
    providedIn: 'root'
})
export class LocationService {
    constructor(private http: HttpClient) {
    }

    httpHeader = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    postLocation(location: Location): Observable<Location> {
        return this.http.post<Location>(HttpService.SERVICE_PATH + 'locations/', JSON.stringify(location), this.httpHeader)
            .pipe(
                retry(1),
                catchError(this.processError)
            )
    }

    putLocation(location: Location): Observable<Location> {
        return this.http.put<Location>(HttpService.SERVICE_PATH + 'locations/', JSON.stringify(location), this.httpHeader)
            .pipe(
                retry(1),
                catchError(this.processError)
            )
    }

    deleteLocation(location: Location) {
        return this.http.delete<Location>(HttpService.SERVICE_PATH + 'locations/' + location.locationId, this.httpHeader)
            .pipe(
                retry(1),
                catchError(this.processError)
            )
    }


    getLocationList(countryId: number): Observable<Location[]> {
        let params = new HttpParams();
        params = params.set('countryId', countryId.toString());
        return this.http.get(HttpService.SERVICE_PATH + 'locations/getLocationList', {
            params: params
        }).pipe(map(response => <Location[]>response));
    }

    locationSearch(locationVo: LocationVo): Observable<Location[]> {
        return this.http.post<Location[]>(HttpService.SERVICE_PATH + 'locations/locationSearch', JSON.stringify(locationVo), this.httpHeader)
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