import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './view/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'maintainers',
    loadChildren: () => import('./view/maintainers/maintainers.module').then(m => m.MaintainersModule)
  },
  {
    path: 'client',
    loadChildren: () => import('./view/client/client.module').then(m => m.ClientModule)
  },
  {
    path: 'buy',
    loadChildren: () => import('./view/buy/buy.module').then(m => m.BuyModule)
  },
  {
    path: 'stock',
    loadChildren: () => import('./view/stock/stock.module').then(m => m.StockModule)
  },
  {
    path: 'sell',
    loadChildren: () => import('./view/sell/sell.module').then(m => m.SellModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
