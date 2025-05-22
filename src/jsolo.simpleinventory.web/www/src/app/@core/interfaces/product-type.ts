import { DataSource } from "ng2-smart-table/lib/lib/data-source/data-source";
import { Observable } from "rxjs";


export interface ProductType {
    name: string;
    description: string | null;
}


export abstract class ProductTypesData {
  abstract get gridDataSource(): DataSource;
  abstract listAll(): Observable<ProductType[]>;
  abstract list(pageNumber: number, pageSize: number, query?: string): Observable<ProductType[]>;
  abstract get(id: number): Observable<ProductType>;
  abstract create(Vendor: ProductType): Observable<ProductType>;
  abstract update(Vendor: ProductType): Observable<ProductType>;
  abstract delete(id: number): Observable<any>;
}