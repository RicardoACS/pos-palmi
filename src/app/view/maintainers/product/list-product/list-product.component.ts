import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IPrice } from 'src/app/classes/IPrice';
import { IProduct } from 'src/app/classes/IProduct';
import { Response } from 'src/app/classes/Response';
import { PosService } from 'src/app/services/pos.service';
import { ModalService } from 'src/app/view/utils/modal/modal.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

  public dataProduct: IPrice[];
  load = {
    data: false
  };

  constructor(private _ModalService: ModalService,
    private posService: PosService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.posService.getProducts("1").subscribe(
      (data: Response) => {
        setTimeout(() => {
          this.dataProduct = <IPrice[]> data.data;
          this.load.data = true;
        }, 2000);
      },
      (error: HttpErrorResponse) => {
        //this.toastr.error(null, error.error.error);
      }
    );
  }

  openModal(data) {
    this._ModalService.open(data, null);
  }

}
