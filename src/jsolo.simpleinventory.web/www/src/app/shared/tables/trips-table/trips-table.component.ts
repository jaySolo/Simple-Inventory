import { Component, Input, OnInit } from '@angular/core';
import { Trip } from '../../../@core/models/trip';

@Component({
  selector: 'ngx-trips-table',
  template: `
    <ng2-smart-table
        [settings]="config"
        [source]="trips"
        (custom)="onCustomAction($event)">
    </ng2-smart-table>`,
  styleUrls: ['./trips-table.component.scss'],
})
export class TripsTableComponent implements OnInit {

  @Input() trips: Trip[];

  config: any;


  constructor() { }


  ngOnInit(): void {
    this.config = {

      pager: { perPage: 5 },
      actions: {
        add: false,
        edit: false,
        delete: false,
        // custom: [

        // ],
        position: 'right',
      },
      columns: {
        date: {
          title: 'Date',
        },
        time: {
          title: 'Time',
        },
        event: {
          title: 'Event',
        },
        tag: {
          title: 'Tag',
        },
        current: {
          title: 'Current',
        },
        frequency: {
          title: 'Frequency',
        },
      },
      noDataMessage: 'No trips on record.',
    };
  }


  onCustomAction(event: any): void {

  }
}
