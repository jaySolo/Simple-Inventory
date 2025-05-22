import { Observable } from "rxjs";
import { Inventory } from "./inventory";
import { DataSource } from "ng2-smart-table/lib/lib/data-source/data-source";



export interface InventoryTransaction {
    id: string;
    inventory: Inventory;
    type: InventoryTransaction;
    timeStamp: string;
    amount: number;
}



export interface InventoryTransaction {
    value: string;
    name: string;
}



export abstract class InventoryTransactionsData {
  abstract get gridDataSource(): DataSource;
  abstract listAll(): Observable<InventoryTransaction[]>;
  abstract list(pageNumber: number, pageSize: number, query?: string): Observable<InventoryTransaction[]>;
  abstract get(id: string): Observable<InventoryTransaction>;
  abstract create(Vendor: InventoryTransaction): Observable<InventoryTransaction>;
  abstract update(Vendor: InventoryTransaction): Observable<InventoryTransaction>;
  abstract delete(id: string): Observable<any>;
}
