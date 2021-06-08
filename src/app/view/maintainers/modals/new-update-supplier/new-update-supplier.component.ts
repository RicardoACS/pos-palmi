import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { PosService } from 'src/app/services/pos.service';
import { ModalService } from 'src/app/view/utils/modal/modal.service';

@Component({
  selector: 'app-new-update-supplier',
  templateUrl: './new-update-supplier.component.html',
  styleUrls: ['./new-update-supplier.component.css'],
})
export class NewUpdateSupplierComponent implements OnInit {
  @ViewChild('modalNewUpdateSupplier') modalTemplateRef: ElementRef;
  subscription: Subscription;
  modalInstance: NgbModalRef;
  newUpdateSupplier: FormGroup;
  submitted = false;
  load = {
    title: 'Crear nueva',
    createUpdateSupplier: false,
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

  ngOnInit(): void {}

  formGroupValidation(data) {
    data != null ? (this.load.title = 'Editar') : undefined;
    this.newUpdateSupplier = this.fb.group({
      id: [data == null ? undefined : data.id],
      name: [
        data == null ? '' : data.name,
        [Validators.required, Validators.maxLength(100)],
      ],
      description: [
        data == null ? '' : data.description,
        [Validators.maxLength(100)],
      ],
    });
  }

  get f() {
    return this.newUpdateSupplier.controls;
  }

  async onSubmit() {
    this.load.createUpdateSupplier = true;
    this.submitted = true;
    if (this.newUpdateSupplier.invalid) {
      this.load.createUpdateSupplier = false;
      return;
    }

    await this.createUpdateSupplier(this.newUpdateSupplier.value);
  }

  async createUpdateSupplier(data) {
    console.log('data', data);
    if (data.id === null) {
      this.posService.createSupplier(data).subscribe((response: Response) => {
        this.load.createUpdateSupplier = false;
        this.cleanForm();
      });
    } else {
      this.posService
        .updateSupplier(data.id, data)
        .subscribe((response: Response) => {
          this.load.createUpdateSupplier = false;
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
    this.newUpdateSupplier.reset();
    this.submitted = false;
  }
}
