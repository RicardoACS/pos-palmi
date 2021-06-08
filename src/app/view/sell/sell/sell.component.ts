import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IProductIdentifier } from 'src/app/classes/IProductIdentifier';
import { Response } from 'src/app/classes/Response';
import { PosService } from 'src/app/services/pos.service';
import { ModalService } from '../../utils/modal/modal.service';
import * as moment from 'moment';
import { IClient } from 'src/app/classes/IClient';
import { Select2OptionData } from 'ng-select2';
@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css'],
})
export class SellComponent implements OnInit {
  code;
  sellDate = moment().format('yyyy-MM-DD');
  totalSell: number = 0;
  clientId: number = 0;
  submitted = false;
  dataSell = [];
  dataClient: Array<Select2OptionData>;
  load = {
    sell: false,
    dataSell: false,
    dataClient: false,
  };

  constructor(
    private _ModalService: ModalService,
    private posService: PosService
  ) {}

  ngOnInit(): void {
    this.getClient();
  }

  getClient() {
    var clientSelect2 = [];
    this.posService.getClient().subscribe(
      (data: Response) => {
        var clients = data.data as IClient[];
        clients.forEach(fe => {
          clientSelect2.push({
            id: fe.id,
            text: `${fe.name + ' ' + fe.last_name} - ${fe.email}`
          })
        });
        this.dataClient = clientSelect2;
        this.load.dataClient = true;
      },
      (error: HttpErrorResponse) => {
        //this.toastr.error(null, error.error.error);
      }
    );
  }

  searchProduct = () => {
    if (this.code.length >= 4) {
      this.load.sell = true;
      this.load.dataSell = false;
      var code = this.code.replace('-', "'");
      var productExistent = this.dataSell.find(
        (f) => f.product.identifier === code
      );
      if (productExistent !== undefined) {
        console.log(productExistent);
        productExistent.quantity += 1;
        productExistent.valueSell =
          productExistent.value * productExistent.quantity;
        this.load.dataSell = true;
      } else {
        this.posService.getProductsByIdentifier(code).subscribe(
          (data: Response) => {
            var dataProduct = data.data as IProductIdentifier;
            this.totalSell += Number(dataProduct.value);
            this.dataSell.push({
              value: dataProduct.value,
              valueSell: dataProduct.value,
              product: dataProduct.product,
              quantity: 1,
            });
            this.load.dataSell = true;
          },
          (error: HttpErrorResponse) => {
            this.load.dataSell = true;
            //this.toastr.error(null, error.error.error);
          }
        );
      }
      this.configSell();
    }
  };

  configSell = () => {
    this.totalSell = 0;
    this.dataSell.map((m) => {
      this.totalSell += Number(m.valueSell);
    });
    this.code = '';
  };

  deleteSell = (index) => {
    this.dataSell.splice(index, 1);
    this.configSell();
  };
}
