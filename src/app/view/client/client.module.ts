import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListClientComponent } from './list-client/list-client.component';
import { ClientRoutingModule } from './client-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { NewUpdateClientComponent } from './modal/new-update-client/new-update-client.component';
import { PosService } from 'src/app/services/pos.service';
import { ModalService } from '../utils/modal/modal.service';
import { BackofficeService } from 'src/app/services/backoffice.service';
import { UtilModule } from '../utils/util.module';
import { NgSelect2Module } from 'ng-select2';
import { Ng9RutModule } from 'ng9-rut';

@NgModule({
  declarations: [ListClientComponent, NewUpdateClientComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    DataTablesModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    UtilModule,
    NgSelect2Module,
    Ng9RutModule
  ],
  providers: [ModalService, PosService, BackofficeService]
})
export class ClientModule { }
