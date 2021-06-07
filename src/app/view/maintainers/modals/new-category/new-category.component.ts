import { Response } from '../../../../classes/Response';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { PosService } from 'src/app/services/pos.service';
import { ModalService } from 'src/app/view/utils/modal/modal.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit {

  @ViewChild("modalNewCategory") modalTemplateRef: ElementRef;
  subscription: Subscription;
  modalInstance: NgbModalRef;
  newUpdateCategory: FormGroup;
  submitted = false;
  load = {
    title: "Crear nueva",
    createUpdateCategory: false
  }


  constructor(
    private _modalService: NgbModal,
    private _myModalSerive: ModalService,
    private fb: FormBuilder,
    private posService: PosService
  ) { 
    this.subscription = this._myModalSerive
      .getMyModalSubjectRef()
      .subscribe(msg => {
        switch (msg.action) {
          case "OPEN":
            this.openModal(msg.data);
            break;
          case "CLOSE":
            this.closeModal();
            break;
        }
      });
  }

  ngOnInit(): void {
  }

  formGroupValidation(data) {
    data != null ? this.load.title = "Editar" : undefined;
    this.newUpdateCategory = this.fb.group({
      id: [data == null ? undefined : data.id],
      name: [data == null ? '' : data.name, [Validators.required, Validators.maxLength(100)]],
    })
  }

  get f() {
    return this.newUpdateCategory.controls;
  }

  async onSubmit() {
    this.load.createUpdateCategory = true;
    this.submitted = true;
    if(this.newUpdateCategory.invalid) {
      this.load.createUpdateCategory = false;
      return;
    }

    await this.createUpdateCategory(this.newUpdateCategory.value);

  }

  async createUpdateCategory (data) {
    console.log("data", data)
    if(data.id === null) {
      this.posService.createCategory(data).subscribe((response:Response) => {
        this.load.createUpdateCategory = false;
        this.cleanForm();
      })
    } else {
      this.posService.updateCategory(data.id, data).subscribe((response: Response) => {
        this.load.createUpdateCategory = false;
        this.closeModalReload();
      });
    }
  }

  openModal(data: any) {
    this.formGroupValidation(data);
    this.modalInstance = this._modalService.open(this.modalTemplateRef, { size: 'lg', backdrop: 'static' });
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
    this.newUpdateCategory.reset();
    this.submitted = false;
  }

}
