import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-loading-placeholder',
  template: `
    <div id="nb-global-spinner" class="spinner">
      <div class="rect1"></div>
      <div class="rect2"></div>
      <div class="rect3"></div>
      <div class="rect4"></div>
      <div class="rect5"></div>
      <p class="h3 loading-msg">{{loadingMessage}}</p>
    </div>
  `,
  styleUrls: ['./loading-placeholder.component.scss'],
})
export class LoadingPlaceholderComponent implements OnInit {

  @Input() loadingMessage: string = 'Loading . . .';

  constructor() { }

  ngOnInit(): void {
  }

}
