import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from "../../../../environments/environment";
import { HttpService } from "../common/http.service";
import { InventoryTransaction, InventoryTransactionsData } from "../../interfaces/inventory-transaction";
import { DataSource } from "ng2-smart-table/lib/lib/data-source/data-source";

@Injectable()
export class InventoryTransactionsService extends InventoryTransactionsData {

    private readonly url: string;

    constructor(private api: HttpService) {
        super();
        this.url = 'inventories';
    }

    get gridDataSource(): DataSource {
        return this.api.getServerDataSource(`${environment.apiUri}/${this.url}`);
    }


    listAll(): Observable<InventoryTransaction[]> {
        let params: HttpParams = new HttpParams()
            .append('pageIndex', '-1')
            .append('pageSize', -1);

        return this.api.get(this.url, { params });
    }


    list(pageNumber: number, pageSize: number, query: string = ''): Observable<InventoryTransaction[]> {
        let params: HttpParams = new HttpParams().append('populate', 'deep,2');

        if (pageSize > 0) {
            params = params.append('pageSize', `${pageSize}`)
        }

        if (pageNumber > 0) {
            params = params.append('pageIndex', `${pageNumber}`)
        }

        return this.api.get(`${this.url}${query}`, { params });
    }


    get(id: string): Observable<InventoryTransaction> {
        return this.api.get(`${this.url}/${id}`);
    }


    create(inventory: InventoryTransaction): Observable<InventoryTransaction> {
        return this.api.post(this.url, inventory);
    }


    update(inventory: InventoryTransaction): Observable<InventoryTransaction> {
        return this.api.put(`${this.url}/${inventory.id}`, inventory);
    }


    delete(id: string): Observable<any> {
        return this.api.delete(`${this.url}/${id}`);
    }
}
