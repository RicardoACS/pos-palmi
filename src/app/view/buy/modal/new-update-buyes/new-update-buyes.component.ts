import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Select2OptionData } from 'ng-select2';
import { Subscription } from 'rxjs';
import { IPrice } from 'src/app/classes/IPrice';
import { IStockRequest } from 'src/app/classes/IStockRequest';
import { ISupplier } from 'src/app/classes/ISupplier';
import { Response } from 'src/app/classes/Response';
import { PosService } from 'src/app/services/pos.service';
import { ModalService } from 'src/app/view/utils/modal/modal.service';
import * as moment from 'moment';

@Component({
  selector: 'app-new-update-buyes',
  templateUrl: './new-update-buyes.component.html',
  styleUrls: ['./new-update-buyes.component.scss'],
})
export class NewUpdateBuyesComponent implements OnInit {
  @ViewChild('modalNewUpdateBuy') modalTemplateRef: ElementRef;
  subscription: Subscription;
  modalInstance: NgbModalRef;
  dataProduct: Array<Select2OptionData>;
  dataSupplier: Array<Select2OptionData>;
  dataChannel: Array<Select2OptionData>;
  newUpdateBuy: FormGroup;
  submitted = false;
  load = {
    title: 'Crear nueva',
    dataProduct: false,
    dataSupplier: false,
    dataChannel: false,
    createUpdate: false,
  };

  constructor(
    private _modalService: NgbModal,
    private _myModalSerive: ModalService,
    private fb: FormBuilder,
    private posService: PosService
  ) {
    this.subscription = this._myModalSerive
      .getMyModalSubjectRef()
      .subscribe((msg) => {
        switch (msg.action) {
          case 'OPEN':
            this.openModal(msg.data);
            break;
          case 'CLOSE':
            this.closeModal();
            break;
        }
      });
  }

  ngOnInit(): void {
    this.getProducts();
    this.getSupplier();
    this.getChannel();
  }

  getProducts() {
    let products = [];
    this.posService.getProducts('1').subscribe(
      (data: Response) => {
        var p = data.data as object[];
        p.forEach((element: IPrice) => {
          console.log(element);
          products.push({
            id: element.product.id,
            text: `${element.product.identifier.replace("'", '-')} - ${
              element.product.sub_category.category.name
            } ${element.product.sub_category.name} ${element.product.name}`,
          });
        });
        this.dataProduct = products;
        console.log(this.dataProduct);
        this.load.dataProduct = true;
      },
      (error: HttpErrorResponse) => {
        //this.toastr.error(null, error.error.error);
      }
    );
  }

  getSupplier() {
    var suppliers = [];
    this.posService.getSuppliers().subscribe(
      (data: Response) => {
        var s = data.data as object[];
        s.forEach((element: ISupplier) => {
          suppliers.push({
            id: element.id,
            text: element.name,
          });
        });
        this.dataSupplier = suppliers;
        this.load.dataSupplier = true;
      },
      (error: HttpErrorResponse) => {
        //this.toastr.error(null, error.error.error);
      }
    );
  }

  getChannel() {
    var channels = [];
    this.posService.getChannels().subscribe(
      (data: Response) => {
        var channel = data.data as object[];
        channel.forEach((element: ISupplier) => {
          channels.push({
            id: element.id,
            text: element.name,
          });
        });
        this.dataChannel = channels;
        this.load.dataChannel = true;
      },
      (error: HttpErrorResponse) => {
        //this.toastr.error(null, error.error.error);
      }
    );
  }

  formGroupValidation(data) {
    if (data != null) {
      this.load.title = 'Editar';
    }
    this.newUpdateBuy = this.fb.group({
      id: [data == null ? undefined : data.id],
      buy_id: [data == null ? undefined : data.buy.id],
      productId: [
        data == null ? '' : data.product.id,
        [Validators.required, Validators.maxLength(100)],
      ],
      buyDate: [
        data == null
          ? moment().format('yyyy-MM-DD')
          : moment(data.buy.buy_date).format('yyyy-MM-DD'),
        [Validators.required, Validators.maxLength(100)],
      ],
      invoiceNumber: [
        data == null ? '' : data.buy.invoice_number,
        [Validators.maxLength(100)],
      ],
      price: [data == null ? '' : data.buy.price, [Validators.maxLength(255)]],
      stock_quantity: [data == null ? '' : data.quantity],
      supplierId: [
        data == null ? '' : data.buy.supplier.id,
        [Validators.required],
      ],
      channelId: [
        data == null ? '' : data.buy.channel.id,
        [Validators.maxLength(100)],
      ],
    });
  }

  get f() {
    return this.newUpdateBuy.controls;
  }

  async onSubmit() {
    this.load.createUpdate = true;
    this.submitted = true;
    console.log(this.newUpdateBuy.value);
    if (this.newUpdateBuy.invalid) {
      this.load.createUpdate = false;
      return;
    }

    await this.createUpdateBuy(this.newUpdateBuy.value);
  }

  async createUpdateBuy(data) {
    var stock: IStockRequest = {
      id: data.id,
      quantity: data.stock_quantity,
      productId: data.productId,
      buy: {
        id: data.buy_id,
        buyDate: data.buyDate,
        channelId: data.channelId,
        invoiceNumber: data.invoiceNumber,
        price: data.price,
        supplierId: data.supplierId,
      },
    };
    if (stock.id === null) {
      this.posService.createStock(stock).subscribe((response: Response) => {
        this.load.createUpdate = false;
        this.cleanForm();
      });
    } else {
      this.posService
        .updateStock(stock.buy.id, stock.id, stock)
        .subscribe((response: Response) => {
          this.load.createUpdate = false;
          this.load.title = '';
          this.closeModalReload();
        });
    }
  }

  cleanForm() {
    this.newUpdateBuy.reset();
    this.submitted = false;
  }

  openModal(data: any) {
    this.formGroupValidation(data);
    this.modalInstance = this._modalService.open(this.modalTemplateRef, {
      size: 'lg',
      backdrop: 'static',
    });
  }

  closeModal() {
    this.modalInstance ? this.modalInstance.close() : null;
  }

  closeModalReload() {
    if (this.load.title !== 'Editar') {
      window.location.reload();
    }
    this.modalInstance ? this.modalInstance.close() : null;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
