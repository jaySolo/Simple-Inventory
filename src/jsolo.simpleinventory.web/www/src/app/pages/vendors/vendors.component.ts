import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vendor, VendorsData } from '../../@core/interfaces/vendor';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';

@Component({
    selector: 'ngx-vendors',
    templateUrl: './vendors.component.html',
    styleUrls: ['./vendors.component.scss'],
})
export class VendorsComponent implements OnInit {

    data: DataSource;

    count: Number = 0;

    loading: boolean = true;


    constructor(private router: Router, private api: VendorsData) { }


    ngOnInit(): void {
        this.data = this.api.gridDataSource;

        this.data?.onChanged().subscribe((_) => {
            this.count = this.data.count()
            this.loading = false;
        }, (e) => {
            // console.log(e)
        }, () => { });
    }
}
