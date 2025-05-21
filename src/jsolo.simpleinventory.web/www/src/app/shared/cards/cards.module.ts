import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoCardComponent } from './info-card/info-card.component';
import { NbCardModule } from '@nebular/theme';



@NgModule({
  declarations: [InfoCardComponent],
  imports: [
    CommonModule,
    NbCardModule,
  ],
  exports: [InfoCardComponent],
})
export class InfoCardsSharedModule { }
