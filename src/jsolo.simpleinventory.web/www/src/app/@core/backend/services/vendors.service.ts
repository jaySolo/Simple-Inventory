import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from "../../../../environments/environment";
import { HttpService } from "../common/http.service";
import { Vendor, VendorsData } from "../../interfaces/vendor";
import { DataSource } from "ng2-smart-table/lib/lib/data-source/data-source";

@Injectable()
export class VendorService extends VendorsData {

    private readonly url: string;

    constructor(private api: HttpService) {
        super();
        this.url = 'vendors';
    }

    get gridDataSource(): DataSource {
        return this.api.getServerDataSource(`${environment.apiUri}/${this.url}`);
    }


    listAll(): Observable<Vendor[]> {
        let params: HttpParams = new HttpParams()
            .append('pagination[limit]', '-1')
            .append('pagination[start]', 0);

        return this.api.get(this.url, { params });
    }


    list(pageNumber: number, pageSize: number, query: string = ''): Observable<Vendor[]> {
        let params: HttpParams = new HttpParams().append('populate', 'deep,2');

        if (pageSize > 0) {
            params = params.append('pagination[pageSize]', `${pageSize}`)
        }

        if (pageNumber > 0) {
            params = params.append('pagination[page]', `${pageNumber}`)
        }

        return this.api.get(`${this.url}${query}`, { params });
    }


    get(id: number): Observable<Vendor> {
        return this.api.get(`${this.url}/${id}`);
    }


    create(vendor: Vendor): Observable<Vendor> {
        return this.api.post(this.url, vendor);
    }


    update(vendor: Vendor): Observable<Vendor> {
        return this.api.put(`${this.url}/${vendor.id}`, vendor);
    }


    delete(id: number): Observable<any> {
        return this.api.delete(`${this.url}/${id}`);
    }
}
