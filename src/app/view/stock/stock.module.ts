import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PosService } from 'src/app/services/pos.service';
import { ModalService } from '../utils/modal/modal.service';
import { HttpClientModule } from '@angular/common/http';
import { ListStockComponent } from './list-stock/list-stock.component';
import { StockRoutingModule } from './stock-routing.module';
import { UtilModule } from '../utils/util.module';


@NgModule({
  declarations: [ListStockComponent],
  imports: [
    CommonModule,
    StockRoutingModule,
    HttpClientModule,
    UtilModule
  ],
  providers: [ModalService, PosService]
})
export class StockModule { }
