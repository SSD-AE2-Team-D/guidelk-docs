import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {MasterStatus} from "../../util/master-status";
import {HttpService} from "../../core/utill/http.service";
import {catchError, map, retry} from "rxjs/operators";
import {TitleType} from "../../util/title-type";
import {GenderType} from "../../util/gender-type";
import {CustomerType} from "../../util/customer-type";
import {Customer} from "../../operationalInfo/customer/customer";
import {CustomerVo} from "../../operationalInfo/customer/customer-vo";

@Injectable({
    providedIn: 'root'
})
export class CustomerService {

    constructor(private http: HttpClient) {
    }

    httpHeader = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    postCustomer(customer: Customer): Observable<Customer> {
        return this.http.post<Customer>(HttpService.SERVICE_PATH + 'customers/', JSON.stringify(customer), this.httpHeader)
            .pipe(
                retry(1),
                catchError(this.processError)
            )
    }

    putCustomer(customer: Customer): Observable<Customer> {
        return this.http.put<Customer>(HttpService.SERVICE_PATH + 'customers/', JSON.stringify(customer), this.httpHeader)
            .pipe(
                retry(1),
                catchError(this.processError)
            )
    }

    deleteCustomer(customer: Customer) {
        return this.http.delete<Customer>(HttpService.SERVICE_PATH + 'customers/' + customer.customerId, this.httpHeader)
            .pipe(
                retry(1),
                catchError(this.processError)
            )
    }

    customerSearch(customerVo: CustomerVo): Observable<Customer[]> {
        return this.http.post<Customer[]>(HttpService.SERVICE_PATH + 'customers/customerSearch', JSON.stringify(customerVo), this.httpHeader)
            .pipe(
                retry(1),
                catchError(this.processError)
            )
    }

    getCustomerList(): Observable<Customer[]> {
        return this.http.get(HttpService.SERVICE_PATH + 'customers/getCustomerList', this.httpHeader)
            .pipe(map(response => <Customer[]>response));
    }

    getTitleList(): Observable<TitleType[]> {
        return this.http.get(HttpService.SERVICE_PATH + 'customers/getTitleList', this.httpHeader)
            .pipe(map(response => <TitleType[]>response));
    }

    getGenderList(): Observable<GenderType[]> {
        return this.http.get(HttpService.SERVICE_PATH + 'customers/getGenderList', this.httpHeader)
            .pipe(map(response => <GenderType[]>response));
    }

    getCustomerTypeList(): Observable<CustomerType[]> {
        return this.http.get(HttpService.SERVICE_PATH + 'customers/getCustomerTypeList', this.httpHeader)
            .pipe(map(response => <CustomerType[]>response));
    }

    getMasterDataStatus(filter: string): Observable<MasterStatus[]> {
        let params = new HttpParams();
        params = params.set('filter', filter);
        return this.http.get(HttpService.SERVICE_PATH + 'customers/getMasterStatusList', {
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