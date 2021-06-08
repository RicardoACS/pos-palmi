import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Select2OptionData } from 'ng-select2';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/classes/Category';
import { Response } from 'src/app/classes/Response';
import { PosService } from 'src/app/services/pos.service';
import { ModalService } from 'src/app/view/utils/modal/modal.service';

@Component({
  selector: 'app-new-update-sub-category',
  templateUrl: './new-update-sub-category.component.html',
  styleUrls: ['./new-update-sub-category.component.css'],
})
export class NewUpdateSubCategoryComponent implements OnInit {
  @ViewChild('modalNewUpdateSubCategory') modalTemplateRef: ElementRef;
  subscription: Subscription;
  modalInstance: NgbModalRef;
  newUpdateSubCategory: FormGroup;
  submitted = false;
  load = {
    title: 'Crear nueva',
    createUpdateSubCategory: false,
    data: false,
    createUpdate: 'Creando',
  };
  dataCategory: Array<Select2OptionData>;

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
    this.getCategories();
  }

  getCategories() {
    let categories = [];
    this.posService.getCategories().subscribe(
      (data: Response) => {
        setTimeout(() => {
          var cat = data.data as object[];
          cat.forEach((element: Category) => {
            categories.push({
              id: element.id,
              text: element.name,
            });
          });
          this.load.data = true;
        }, 2000);
        this.dataCategory = categories;
      },
      (error: HttpErrorResponse) => {
        //this.toastr.error(null, error.error.error);
      }
    );
  }

  formGroupValidation(data) {
    data != null ? (this.load.title = 'Editar') : undefined;
    this.newUpdateSubCategory = this.fb.group({
      id: [data == null ? undefined : data.id],
      name: [
        data == null ? '' : data.name,
        [Validators.required, Validators.maxLength(100)],
      ],
      categoryId: [data == null ? '' : data.category.id, [Validators.required]],
    });
  }

  get f() {
    return this.newUpdateSubCategory.controls;
  }

  async onSubmit() {
    this.load.createUpdateSubCategory = true;
    this.submitted = true;
    if (this.newUpdateSubCategory.invalid) {
      this.load.createUpdateSubCategory = false;
      return;
    }

    await this.createUpdateSubCategory(this.newUpdateSubCategory.value);
  }

  async createUpdateSubCategory(data) {
    console.log('data', data);
    if (data.id === null) {
      this.load.createUpdate = 'Creando';
      this.posService
        .createSubCategory(data)
        .subscribe((response: Response) => {
          this.load.createUpdateSubCategory = false;
          this.cleanForm();
        });
    } else {
      this.load.createUpdate = 'Modificando';
      this.posService
        .updateSubCategory(data.id, data)
        .subscribe((response: Response) => {
          this.load.createUpdateSubCategory = false;
          this.closeModalReload();
        });
    }
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

  cleanForm() {
    this.newUpdateSubCategory.reset();
    this.submitted = false;
    this.newUpdateSubCategory.get('categoryId').setValue('');
  }
}
