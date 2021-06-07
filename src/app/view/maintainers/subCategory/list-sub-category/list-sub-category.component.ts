import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Response } from 'src/app/classes/Response';
import { SubCategory } from 'src/app/classes/SubCategory';
import { PosService } from 'src/app/services/pos.service';
import { ModalService } from 'src/app/view/utils/modal/modal.service';

@Component({
  selector: 'app-list-sub-category',
  templateUrl: './list-sub-category.component.html',
  styleUrls: ['./list-sub-category.component.css']
})
export class ListSubCategoryComponent implements OnInit {

  dataSubCategory: SubCategory[];
  load = {
    data: false
  };

  constructor(
    private _ModalService: ModalService,
    private posService: PosService
  ) {
  }

  ngOnInit(): void {
    this.getSubCategories();
  }

  getSubCategories() {
    this.posService.getSubCategories().subscribe(
      (data: Response) => {
        setTimeout(() => {
          this.dataSubCategory = <SubCategory[]> data.data;
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
