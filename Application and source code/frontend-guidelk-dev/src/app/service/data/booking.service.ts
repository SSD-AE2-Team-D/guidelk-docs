import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {MasterStatus} from "../../util/master-status";
import {HttpService} from "../../core/utill/http.service";
import {catchError, map, retry} from "rxjs/operators";
import {HotelPackage} from "../../operationalInfo/package/creation/stay/hotel-package";
import {HotelBooking} from "../../operationalAction/booking/hotelBooking/hotel-booking";
import {HotelBookingVo} from "../../operationalAction/booking/hotelBooking/hotel-booking-vo";
import {BookingStatus} from "../../util/booking-status";

@Injectable({
    providedIn: 'root'
})
export class BookingService {
    constructor(private http: HttpClient) {
    }

    httpHeader = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    postHotelBooking(hotelBooking: HotelBooking): Observable<HotelBooking> {
        return this.http.post<HotelBooking>(HttpService.SERVICE_PATH + 'hotelBookings/', JSON.stringify(hotelBooking), this.httpHeader)
            .pipe(
                retry(1),
                catchError(this.processError)
            )
    }

    putHotelBooking(hotelBooking: HotelBooking): Observable<HotelBooking> {
        return this.http.put<HotelBooking>(HttpService.SERVICE_PATH + 'hotelBookings/', JSON.stringify(hotelBooking), this.httpHeader)
            .pipe(
                retry(1),
                catchError(this.processError)
            )
    }

    bookingConfirm(hotelBooking: HotelBooking): Observable<HotelBooking> {
        return this.http.put<HotelBooking>(HttpService.SERVICE_PATH + 'hotelBookings/confirm', JSON.stringify(hotelBooking), this.httpHeader)
            .pipe(
                retry(1),
                catchError(this.processError)
            )
    }

    deleteHotelBooking(hotelBooking: HotelBooking) {
        return this.http.delete<HotelBooking>(HttpService.SERVICE_PATH + 'hotelBookings/' + hotelBooking.hotelBookingId, this.httpHeader)
            .pipe(
                retry(1),
                catchError(this.processError)
            )
    }

    getBookingStatus(): Observable<BookingStatus[]> {
        return this.http.get(HttpService.SERVICE_PATH + 'hotelBookings/getBookingStatusList', this.httpHeader)
            .pipe(map(response => <BookingStatus[]>response));
    }

    hotelBookingSearch(hotelBookingVo: HotelBookingVo): Observable<HotelBooking[]> {
        return this.http.post<HotelBooking[]>(HttpService.SERVICE_PATH + 'hotelBookings/hotelBookingSearch', JSON.stringify(hotelBookingVo), this.httpHeader)
            .pipe(
                retry(1),
                catchError(this.processError)
            )
    }

    getMasterDataStatus(filter: string): Observable<MasterStatus[]> {
        let params = new HttpParams();
        params = params.set('filter', filter);
        return this.http.get(HttpService.SERVICE_PATH + 'hotelBookings/getMasterStatusList', {
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