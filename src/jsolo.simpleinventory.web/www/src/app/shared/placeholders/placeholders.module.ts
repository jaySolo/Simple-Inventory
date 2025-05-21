import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingPlaceholderComponent } from './loading-placeholder/loading-placeholder.component';



@NgModule({
  declarations: [
    LoadingPlaceholderComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    LoadingPlaceholderComponent,
  ],
})
export class SharedPlaceholdersModule { }
