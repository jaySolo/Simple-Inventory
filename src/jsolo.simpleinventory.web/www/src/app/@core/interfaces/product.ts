import { DataSource } from "ng2-smart-table/lib/lib/data-source/data-source";
import { Observable } from "rxjs";
import { Vendor } from "./vendor";
import { Money } from "./money";


export interface Product {
    id: number;
    internalProductNumber: string | null;
    externalProductNumber: string | null;
    name: string;
    type: string | null;
    make: string;
    description: string | null;
    marketValue: Money | null;
    barcode: string | null;
    suppliers: Vendor[];
}



export abstract class ProductsData {
  abstract get gridDataSource(): DataSource;
  abstract listAll(): Observable<Product[]>;
  abstract list(pageNumber: number, pageSize: number, query?: string): Observable<Product[]>;
  abstract get(id: number): Observable<Product>;
  abstract create(Vendor: Product): Observable<Product>;
  abstract update(Vendor: Product): Observable<Product>;
  abstract delete(id: number): Observable<any>;
}