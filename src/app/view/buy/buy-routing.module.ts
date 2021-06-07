import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { ListBuyesComponent } from './list-buyes/list-buyes.component';

const routes: Routes = [
  {
    path: '',
    component: ListBuyesComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyRoutingModule { }
