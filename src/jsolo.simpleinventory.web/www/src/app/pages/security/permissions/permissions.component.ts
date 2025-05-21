import { Component, OnInit } from '@angular/core';



@Component({
  template: `
    <div class="h2 mb-3 font-weight-light">System Permissions</div>
    <nb-card accent="warning">
      <ngx-permissions-list></ngx-permissions-list>
    </nb-card>
  `,
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit {


  constructor() { }


  ngOnInit(): void { }
}
