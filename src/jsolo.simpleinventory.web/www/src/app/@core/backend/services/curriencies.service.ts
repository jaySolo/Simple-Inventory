import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from "../../../../environments/environment";
import { HttpService } from "../common/http.service";
import { Currency, CurrenciesData } from "../../interfaces/currency";
import { DataSource } from "ng2-smart-table/lib/lib/data-source/data-source";

@Injectable()
export class CurrenciesService extends CurrenciesData {

    private readonly url: string;

    constructor(private api: HttpService) {
        super();
        this.url = 'currencies';
    }

    get gridDataSource(): DataSource {
        return this.api.getServerDataSource(`${environment.apiUri}/${this.url}`);
    }


    listAll(): Observable<{ total: number, items: Currency[] }> {
        let params: HttpParams = new HttpParams()
            .append('pageIndex', '-1')
            .append('pageSize', -1);

        return this.api.get(this.url, { params });
    }


    list(pageNumber: number, pageSize: number, query: string = ''): Observable<{ total: number, items: Currency[]}> {
        let params: HttpParams = new HttpParams();

        if (pageSize > 0) {
            params = params.append('pageSize', `${pageSize}`)
        }

        if (pageNumber > 0) {
            params = params.append('pageIndex', `${pageNumber}`)
        }

        return this.api.get(`${this.url}${query}`, { params });
    }


    get(code: string): Observable<Currency> {
        return this.api.get(`${this.url}/${code}`);
    }


    create(currency: Currency): Observable<Currency> {
        return this.api.post(this.url, currency);
    }


    update(currency: Currency): Observable<Currency> {
        return this.api.put(`${this.url}/${currency.code}`, currency);
    }


    delete(code: string): Observable<any> {
        return this.api.delete(`${this.url}/${code}`);
    }
}
