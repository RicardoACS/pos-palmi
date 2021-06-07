import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IClient } from 'src/app/classes/IClient';
import { Response } from 'src/app/classes/Response';
import { PosService } from 'src/app/services/pos.service';
import { ModalService } from '../../utils/modal/modal.service';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css']
})
export class ListClientComponent implements OnInit {

  dataClient: IClient[]
  load = {
    data: false
  };

  constructor(
    private _ModalService: ModalService,
    private posService: PosService
  ) {
  }

  ngOnInit(): void {
    this.getClient();
  }

  getClient() {
    this.posService.getClient().subscribe(
      (data: Response) => {
        setTimeout(() => {
          this.dataClient = <IClient[]> data.data;
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
