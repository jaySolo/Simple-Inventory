import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DataSource } from "ng2-smart-table/lib/lib/data-source/data-source";
import { InventoriesData } from "../../@core/interfaces/inventory";

@Component({
    selector: 'ngx-inventories',
    templateUrl: './inventories.component.html',
    styleUrls: [ './inventories.component.scss' ],
})
export class InventoriesComponent implements OnInit {
    
    data: DataSource;

    count: number = 0;

    loading: boolean = true;


    constructor(private router: Router, private api: InventoriesData) { }


    ngOnInit(): void {
        this.data = this.api.gridDataSource;

        this.data.onChanged().subscribe((_) => {
            this.count = this.data.count()
            this.loading = false;
        }, (e) => {
            // console.log(e)
        }, () => { });
    }
}
