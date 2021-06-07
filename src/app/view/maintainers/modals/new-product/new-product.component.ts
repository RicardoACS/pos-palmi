import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Select2OptionData } from 'ng-select2';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/classes/Category';
import { IProductRequest } from 'src/app/classes/IProductRequest';
import { Response } from 'src/app/classes/Response';
import { SubCategory } from 'src/app/classes/SubCategory';
import { PosService } from 'src/app/services/pos.service';
import { ModalService } from 'src/app/view/utils/modal/modal.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css'],
})
export class NewProductComponent implements OnInit {
  @ViewChild('modalNewUpdateProduct') modalTemplateRef: ElementRef;
  subscription: Subscription;
  modalInstance: NgbModalRef;
  newUpdateProduct: FormGroup;
  submitted = false;
  dataCategory: Array<Select2OptionData>;
  dataSubCategory: Array<Select2OptionData>;
  load = {
    title: 'Crear nueva',
    createUpdateProduct: false,
    dataCategory: false,
    dataSubCategory: false,
    createUpdate: '',
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

  formGroupValidation(data) {
    if (data != null) {
      this.getSubCategory(data.product.sub_category.category.id);
      this.load.title = 'Editar';
    }
    this.newUpdateProduct = this.fb.group({
      id: [data == null ? undefined : data.product.id],
      identifier: [
        data == null ? '' : data.product.identifier.replace("'", '-'),
        [Validators.required, Validators.maxLength(100)],
      ],
      name: [
        data == null ? '' : data.product.name,
        [Validators.required, Validators.maxLength(100)],
      ],
      description: [
        data == null ? '' : data.product.description,
        [Validators.maxLength(100)],
      ],
      photo: [data == null ? '' : data.product.photo, [Validators.maxLength(255)]],
      state: [1],
      categoryId: [data == null ? '' : data.product.sub_category.category.id],
      subCategoryId: [
        data == null ? '' : data.product.sub_category.id,
        [Validators.required],
      ],
      price: [
        data == null ? '' : data.value,
        [Validators.maxLength(100)],
      ]
    });
  }

  get f() {
    return this.newUpdateProduct.controls;
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    let categories = [];
    this.posService.getCategories().subscribe(
      (data: Response) => {
        setTimeout(() => {
          data.data.forEach((element: Category) => {
            categories.push({
              id: element.id,
              text: element.name
            })
          });
          this.load.dataCategory = true;
        }, 2000);
        this.dataCategory = categories;
      },
      (error: HttpErrorResponse) => {
        //this.toastr.error(null, error.error.error);
      }
    );
  }

  getSubCategory(categoryId: number) {
    var subCategory = [];
    this.load.dataSubCategory = false;
    this.posService.getSubCategoriesByCategoryId(categoryId).subscribe(
      (data: Response) => {
        data.data.forEach((element: SubCategory) => {
          subCategory.push({
            id: element.id,
            text: element.name
          })
        });
        this.dataSubCategory = subCategory;
        this.load.dataSubCategory = true;
      },
      (error: HttpErrorResponse) => {
        //this.toastr.error(null, error.error.error);
      }
    );
  }

  async onSubmit() {
    this.load.createUpdateProduct = true;
    this.submitted = true;
    if (this.newUpdateProduct.invalid) {
      this.load.createUpdateProduct = false;
      return;
    }

    await this.createUpdateProduct(this.newUpdateProduct.value);
  }

  async createUpdateProduct(data) {
    var product: IProductRequest = {
      id: data.id,
      description: data.description,
      identifier: data.identifier,
      name: data.name,
      photo: data.photo,
      price: {
        state: 1,
        value: data.price,
      },
      state: data.state,
      subCategoryId: data.subCategoryId,
    };
    if (product.id === null) {
      this.load.createUpdate = 'Creando';
      this.posService.createProduct(product).subscribe((response: Response) => {
        this.load.createUpdateProduct = false;
        this.cleanForm();
      });
    } else {
      this.load.createUpdate = 'Modificando';
      this.posService
        .updateProduct(product.id, product)
        .subscribe((response: Response) => {
          this.load.createUpdateProduct = false;
          this.closeModalReload();
        });
    }
  }

  cleanForm() {
    this.newUpdateProduct.reset();
    this.submitted = false;
    this.newUpdateProduct.get('categoryId').setValue('');
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
    window.location.reload();
    this.modalInstance ? this.modalInstance.close() : null;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
