import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-info-card',
  template: `
  <nb-card class="col-12 col-lg m-1" [size]="size" [accent]="accent">
    <nb-card-body>
      <span class="h4 mb-0 font-weight-light">{{title}}</span>
      <div [class]="cardValueClasses">{{value}}</div>
      <div class="subtitle text-right"><bdi>{{subtitle}}</bdi></div>
    </nb-card-body>
  </nb-card>
  `,
  styleUrls: ['./info-card.component.scss'],
})
export class InfoCardComponent implements OnInit {

  @Input() accent: string = '';
  @Input() size: string;
  @Input() title: string;
  @Input() value: number | string | any;
  @Input() subtitle: string;


  cardValueClasses = '';

  constructor() { }

  ngOnInit(): void {
    this.cardValueClasses = 'display-1 mb-0 text-' + this.accent + ' text-center';
  }

}
