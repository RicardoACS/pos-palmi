import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListBuyesComponent } from './list-buyes/list-buyes.component';
import { BuyRoutingModule } from './buy-routing.module';
import { PosService } from 'src/app/services/pos.service';
import { ModalService } from '../utils/modal/modal.service';
import { HttpClientModule } from '@angular/common/http';
import { NewUpdateBuyesComponent } from './modal/new-update-buyes/new-update-buyes.component';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UtilModule } from '../utils/util.module';
import { NgSelect2Module } from 'ng-select2';


@NgModule({
  declarations: [ListBuyesComponent, NewUpdateBuyesComponent],
  imports: [
    CommonModule,
    BuyRoutingModule,
    DataTablesModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    UtilModule,
    NgSelect2Module
  ],
  providers: [ModalService, PosService]
})
export class BuyModule { }
