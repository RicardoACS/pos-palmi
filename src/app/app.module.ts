import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';



import { AppComponent } from './app.component';
import { PreLoadComponent } from './view/pre-load/pre-load.component';
import { HeaderComponent } from './view/menu/header/header.component';
import { SideBarComponent } from './view/menu/side-bar/side-bar.component';
import { DashboardComponent } from './view/dashboard/dashboard.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    PreLoadComponent,
    HeaderComponent,
    SideBarComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    NgApexchartsModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
