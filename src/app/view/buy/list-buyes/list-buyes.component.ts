import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IStock } from 'src/app/classes/IStock';
import { Response } from 'src/app/classes/Response';
import { PosService } from 'src/app/services/pos.service';
import { ModalService } from '../../utils/modal/modal.service';

@Component({
  selector: 'app-list-buyes',
  templateUrl: './list-buyes.component.html',
  styleUrls: ['./list-buyes.component.css'],
})
export class ListBuyesComponent implements OnInit {
  dataStock: IStock[];
  load = {
    data: false,
  };

  constructor(
    private _ModalService: ModalService,
    private posService: PosService
  ) {}

  ngOnInit(): void {
    this.getAllBuyes();
  }

  getAllBuyes() {
    this.posService.getAllBuyes().subscribe(
      (data: Response) => {
        this.dataStock = data.data as IStock[];
        this.load.data = true;
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
