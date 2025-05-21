import { Component, OnInit } from '@angular/core';



@Component({
  template: `
    <nb-card>
      <ngx-user-roles-list></ngx-user-roles-list>
    </nb-card>
  `,
  styleUrls: ['./roles.component.scss']
})
export class UserRolesComponent implements OnInit {


  constructor() { }


  ngOnInit(): void { }
}
