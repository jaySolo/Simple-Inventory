import { Observable } from "rxjs";
import { Product } from "././product";
import { InventoryTransaction } from './inventory-transaction';
import { DataSource } from "ng2-smart-table/lib/lib/data-source/data-source";



export interface Inventory {
    id: string;
    product: Product;
    stockCount: number;
    minimumStockCount: number;
    minimumReorderQuantity: number;
    transactions: InventoryTransaction[];
}



export abstract class InventoriesData {
  abstract get gridDataSource(): DataSource;
  abstract listAll(): Observable<Inventory[]>;
  abstract list(pageNumber: number, pageSize: number, query?: string): Observable<Inventory[]>;
  abstract get(id: number): Observable<Inventory>;
  abstract create(Vendor: Inventory): Observable<Inventory>;
  abstract update(Vendor: Inventory): Observable<Inventory>;
  abstract delete(id: number): Observable<any>;
}
