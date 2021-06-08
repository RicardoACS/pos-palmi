import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Response } from 'src/app/classes/Response';
import { Category } from 'src/app/classes/Category';
import { PosService } from 'src/app/services/pos.service';
import { ModalService } from 'src/app/view/utils/modal/modal.service';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css'],
})
export class ListCategoryComponent implements OnInit {
  dataCategory: Category[];
  load = {
    data: false,
  };

  constructor(
    private _ModalService: ModalService,
    private posService: PosService
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.posService.getCategories().subscribe(
      (data: Response) => {
        setTimeout(() => {
          this.dataCategory = <Category[]>data.data;
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
