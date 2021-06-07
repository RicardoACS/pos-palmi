import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { ModalService } from '../utils/modal/modal.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ListCategoryComponent } from './category/list-category/list-category.component';
import { MaintainersRoutingModule } from './maintainers-routing.module';
import { NewCategoryComponent } from './modals/new-category/new-category.component';
import { PosService } from 'src/app/services/pos.service';
import { ListSubCategoryComponent } from './subCategory/list-sub-category/list-sub-category.component';
import { NewUpdateSubCategoryComponent } from './modals/new-update-sub-category/new-update-sub-category.component';
import { ListProductComponent } from './product/list-product/list-product.component';
import { NewProductComponent } from './modals/new-product/new-product.component';
import { UtilModule } from '../utils/util.module';
import { NgSelect2Module } from 'ng-select2';
import { ListSupplierComponent } from './supplier/list-supplier/list-supplier.component';
import { NewUpdateSupplierComponent } from './modals/new-update-supplier/new-update-supplier.component';

@NgModule({
  declarations: [
    ListCategoryComponent,
    NewCategoryComponent,
    ListSubCategoryComponent,
    NewUpdateSubCategoryComponent,
    ListProductComponent,
    NewProductComponent,
    ListSupplierComponent,
    NewUpdateSupplierComponent,
  ],
  imports: [
    CommonModule,
    MaintainersRoutingModule,
    DataTablesModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    UtilModule,
    NgSelect2Module
  ],
  providers: [ModalService, PosService],
})
export class MaintainersModule {}
