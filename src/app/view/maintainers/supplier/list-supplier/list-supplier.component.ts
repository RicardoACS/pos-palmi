import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ISupplier } from 'src/app/classes/ISupplier';
import { Response } from 'src/app/classes/Response';
import { PosService } from 'src/app/services/pos.service';
import { ModalService } from 'src/app/view/utils/modal/modal.service';

@Component({
  selector: 'app-list-supplier',
  templateUrl: './list-supplier.component.html',
  styleUrls: ['./list-supplier.component.css']
})
export class ListSupplierComponent implements OnInit {

  dataSupplier: ISupplier[];
  load = {
    data: false
  };

  constructor(
    private _ModalService: ModalService,
    private posService: PosService
  ) {
  }

  ngOnInit(): void {
    this.getSupplier();
  }

  getSupplier() {
    this.posService.getSuppliers().subscribe(
      (data: Response) => {
        setTimeout(() => {
          this.dataSupplier = <ISupplier[]> data.data;
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
