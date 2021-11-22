import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {MasterStatus} from "../../util/master-status";
import {HttpService} from "../../core/utill/http.service";
import {catchError, map, retry} from "rxjs/operators";
import {HotelPackageActivityType} from "../../util/hotel-package-activity-type";
import {HotelPackage} from "../../operationalInfo/package/creation/stay/hotel-package";
import {HotelPackageVo} from "../../operationalInfo/package/search/stayHistory/hotel-package-vo";
import {PackageFeedback} from "../../operationalInfo/package/feedback/package-feedback";
import {Hotel} from "../../operationalInfo/hotel/hotel";

@Injectable({
    providedIn: 'root'
})
export class PackageService {
    constructor(private http: HttpClient) {
    }

    httpHeader = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    postHotelPackage(hotelPackage: HotelPackage): Observable<HotelPackage> {
        return this.http.post<HotelPackage>(HttpService.SERVICE_PATH + 'packages/', JSON.stringify(hotelPackage), this.httpHeader)
            .pipe(
                retry(1),
                catchError(this.processError)
            )
    }

    postFeedback(packageFeedback: PackageFeedback): Observable<PackageFeedback> {
        return this.http.post<PackageFeedback>(HttpService.SERVICE_PATH + 'packages/feedback', JSON.stringify(packageFeedback), this.httpHeader)
            .pipe(
                retry(1),
                catchError(this.processError)
            )
    }

    putHotelPackage(hotelPackage: HotelPackage): Observable<HotelPackage> {
        return this.http.put<HotelPackage>(HttpService.SERVICE_PATH + 'packages/', JSON.stringify(hotelPackage), this.httpHeader)
            .pipe(
                retry(1),
                catchError(this.processError)
            )
    }

    deleteHotelPackage(hotelPackage: HotelPackage) {
        return this.http.delete<HotelPackage>(HttpService.SERVICE_PATH + 'packages/' + hotelPackage.hotelPackageId, this.httpHeader)
            .pipe(
                retry(1),
                catchError(this.processError)
            )
    }

    viewFeedBack(packageId: number): Observable<PackageFeedback[]> {
        let params = new HttpParams();
        params = params.set('packageId', packageId.toString());
        return this.http.get(HttpService.SERVICE_PATH + 'packages/viewFeedBack', {
            params: params
        }).pipe(map(response => <PackageFeedback[]>response));
    }

    getHotelActivityTypeList(): Observable<HotelPackageActivityType[]> {
        return this.http.get(HttpService.SERVICE_PATH + 'packages/getHotelActivityTypeList', this.httpHeader)
            .pipe(map(response => <HotelPackageActivityType[]>response));
    }

    hotelPackageSearch(hotelPackageVo: HotelPackageVo): Observable<HotelPackage[]> {
        return this.http.post<HotelPackage[]>(HttpService.SERVICE_PATH + 'packages/hotelPackageSearch', JSON.stringify(hotelPackageVo), this.httpHeader)
            .pipe(
                retry(1),
                catchError(this.processError)
            )
    }

    getMasterDataStatus(filter: string): Observable<MasterStatus[]> {
        let params = new HttpParams();
        params = params.set('filter', filter);
        return this.http.get(HttpService.SERVICE_PATH + 'packages/getMasterStatusList', {
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