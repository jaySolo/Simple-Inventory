import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagnitudeBarsComponent } from './magnitude-bars/magnitude-bars.component';
import { AnglesGuageComponent } from './angles-guage/angles-guage.component';
import { NgxEchartsModule } from 'ngx-echarts';



@NgModule({
  declarations: [
    MagnitudeBarsComponent,
    AnglesGuageComponent,
  ],
  imports: [
    CommonModule,
    NgxEchartsModule,
  ],
  exports: [
    MagnitudeBarsComponent,
    AnglesGuageComponent,
  ],
})
export class PhasorsSharedModule { }
