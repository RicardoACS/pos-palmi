import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { ListCategoryComponent } from './category/list-category/list-category.component';
import { ListProductComponent } from './product/list-product/list-product.component';
import { ListSubCategoryComponent } from './subCategory/list-sub-category/list-sub-category.component';
import { ListSupplierComponent } from './supplier/list-supplier/list-supplier.component';


const routes: Routes = [
  {
    path: 'category',
    component: ListCategoryComponent
  },
  {
    path: 'sub-categories',
    component: ListSubCategoryComponent
  },
  {
    path: 'product',
    component: ListProductComponent
  },
  {
    path: 'supplier',
    component: ListSupplierComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintainersRoutingModule { }
