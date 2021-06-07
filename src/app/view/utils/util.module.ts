import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from '../utils/page-header/page-header.component';


@NgModule({
  declarations: [PageHeaderComponent],
  imports: [
    CommonModule,    
  ],
  exports: [PageHeaderComponent],
  providers: []
})
export class UtilModule { }
