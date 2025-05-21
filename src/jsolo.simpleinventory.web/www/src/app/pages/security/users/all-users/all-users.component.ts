import { Component, OnInit } from '@angular/core';



@Component({
  template: `
    <nb-card>
      <ngx-list-users></ngx-list-users>
    </nb-card>
  `,
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit {


  constructor () { }


  ngOnInit(): void { }
}
