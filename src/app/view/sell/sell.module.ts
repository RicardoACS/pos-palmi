import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PosService } from 'src/app/services/pos.service';
import { ModalService } from '../utils/modal/modal.service';
import { HttpClientModule } from '@angular/common/http';
import { UtilModule } from '../utils/util.module';
import { SellComponent } from './sell/sell.component';
import { SellRoutingModule } from './sell-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelect2Module } from 'ng-select2';
import { Ng9RutModule } from 'ng9-rut';


@NgModule({
  declarations: [SellComponent],
  imports: [
    CommonModule,
    SellRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    UtilModule,
    NgSelect2Module,
    Ng9RutModule
  ],
  providers: [ModalService, PosService]
})
export class SellModule { }
