import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from "../../../../environments/environment";
import { HttpService } from "../common/http.service";
import { ProductType, ProductTypesData } from "../../interfaces/product-type";
import { DataSource } from "ng2-smart-table/lib/lib/data-source/data-source";

@Injectable()
export class ProductTypesService extends ProductTypesData {

    private readonly url: string;

    constructor(private api: HttpService) {
        super();
        this.url = 'producttypes';
    }

    get gridDataSource(): DataSource {
        return this.api.getServerDataSource(`${environment.apiUri}/${this.url}`);
    }


    listAll(): Observable<{ total: number, items: ProductType[] }> {
        let params: HttpParams = new HttpParams()
            .append('pageIndex', '-1')
            .append('pageSize', -1);

        return this.api.get(this.url, { params });
    }


    list(pageNumber: number, pageSize: number, query: string = ''): Observable<{ total: number, items: ProductType[] }> {
        let params: HttpParams = new HttpParams();

        if (pageSize > 0) {
            params = params.append('pageSize', `${pageSize}`)
        }

        if (pageNumber > 0) {
            params = params.append('pageIndex', `${pageNumber}`)
        }

        return this.api.get(`${this.url}${query}`, { params });
    }


    get(id: number): Observable<ProductType> {
        return this.api.get(`${this.url}/${id}`);
    }


    create(producttype: ProductType): Observable<ProductType> {
        return this.api.post(this.url, producttype);
    }


    update(producttype: ProductType): Observable<ProductType> {
        return this.api.put(`${this.url}/${producttype.name}`, producttype);
    }


    delete(id: number): Observable<any> {
        return this.api.delete(`${this.url}/${id}`);
    }
}
