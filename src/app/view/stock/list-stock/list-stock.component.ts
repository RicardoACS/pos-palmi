import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IStockQuantity } from 'src/app/classes/IStockQuantity';
import { Response } from 'src/app/classes/Response';
import { PosService } from 'src/app/services/pos.service';
import { ModalService } from '../../utils/modal/modal.service';

@Component({
  selector: 'app-list-stock',
  templateUrl: './list-stock.component.html',
  styleUrls: ['./list-stock.component.css']
})
export class ListStockComponent implements OnInit {

  public dataStock: IStockQuantity[];
  load = {
    data: false
  }

  constructor(
    private _ModalService: ModalService,
    private posService: PosService
  ) {
  }

  ngOnInit(): void {
    this.getStock();
  }

  getStock() {
    this.posService.getAllStock().subscribe(
      (data: Response) => {
        setTimeout(() => {
          this.dataStock = <IStockQuantity[]> data.data;
          this.load.data = true;
        }, 2000);
      },
      (error: HttpErrorResponse) => {
        //this.toastr.error(null, error.error.error);
      }
    );
  }

}
