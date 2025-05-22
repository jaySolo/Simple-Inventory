import { HttpParams } from "@angular/common/http";
import { ServerDataSource } from "ng2-smart-table";
import { DataSource } from "ng2-smart-table/lib/lib/data-source/data-source";
import { Observable } from "rxjs";

export interface Vendor {
    id: Number;
    businessName: string;
    contactTitle?: string;
    contactLastName?: string;
    contactFirstName?: string;
    contactMobile: string;
    contactTelephone: string;
    contactFax: string;
    contactEmail: string;
    address: string;
}



export abstract class VendorsData {
  abstract get gridDataSource(): DataSource;
  abstract listAll(): Observable<Vendor[]>;
  abstract list(pageNumber: number, pageSize: number, query?: string): Observable<Vendor[]>;
  abstract get(id: number): Observable<Vendor>;
  abstract create(Vendor: Vendor): Observable<Vendor>;
  abstract update(Vendor: Vendor): Observable<Vendor>;
  abstract delete(id: number): Observable<any>;
}