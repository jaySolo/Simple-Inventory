import { Observable } from "rxjs";
import { Inventory } from "./inventory";
import { DataSource } from "ng2-smart-table/lib/lib/data-source/data-source";



export interface InventoryTransaction {
    id: string;
    inventory: Inventory;
    type: InventoryTransactionType;
    timeStamp: string;
    amount: number;
}



export interface InventoryTransactionType {
    value: string;
    name: string;
}



export abstract class InventoryTransactionsData {
  abstract get gridDataSource(): DataSource;
  abstract listAll(): Observable<InventoryTransactionType[]>;
  abstract list(pageNumber: number, pageSize: number, query?: string): Observable<InventoryTransactionType[]>;
  abstract get(id: number): Observable<InventoryTransactionType>;
  abstract create(Vendor: InventoryTransactionType): Observable<InventoryTransactionType>;
  abstract update(Vendor: InventoryTransactionType): Observable<InventoryTransactionType>;
  abstract delete(id: number): Observable<any>;
}
