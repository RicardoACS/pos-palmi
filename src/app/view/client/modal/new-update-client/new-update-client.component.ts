import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Select2OptionData } from 'ng-select2';
import { Subscription } from 'rxjs';
import { IClient } from 'src/app/classes/IClient';
import { Response } from 'src/app/classes/Response';
import { BackofficeService } from 'src/app/services/backoffice.service';
import { PosService } from 'src/app/services/pos.service';
import { ModalService } from 'src/app/view/utils/modal/modal.service';

@Component({
  selector: 'app-new-update-client',
  templateUrl: './new-update-client.component.html',
  styleUrls: ['./new-update-client.component.css'],
})
export class NewUpdateClientComponent implements OnInit {
  @ViewChild('modalNewUpdateClient') modalTemplateRef: ElementRef;
  subscription: Subscription;
  modalInstance: NgbModalRef;
  newUpdateClient: FormGroup;
  submitted = false;
  dataCity: Array<Select2OptionData>;
  dataState: Array<Select2OptionData>;
  load = {
    title: 'Crear nueva',
    createUpdate: false,
    dataState: false,
    dataCity: false,
  };

  constructor(
    private _modalService: NgbModal,
    private _myModalSerive: ModalService,
    private fb: FormBuilder,
    private posService: PosService,
    private backofficeService: BackofficeService
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
    this.newUpdateClient = this.fb.group({
      id: [data == null ? undefined : data.id],
      identifier: [
        data == null ? '' : data.identifier,
        [Validators.maxLength(100)],
      ],
      name: [
        data == null ? '' : data.name,
        [Validators.required, Validators.maxLength(100)],
      ],
      lastName: [
        data == null ? '' : data.last_name,
        [Validators.required, Validators.maxLength(100)],
      ],
      email: [
        data == null ? '' : data.email,
        [Validators.required, Validators.maxLength(100)],
      ],
      instagram: [
        data == null ? '' : data.instagram,
        [Validators.maxLength(100)],
      ],
      address: [data == null ? '' : data.address, [Validators.maxLength(100)]],
      deptoNumber: [
        data == null ? '' : data.depto_number,
        [Validators.maxLength(100)],
      ],
      cityId: ['', [Validators.required, Validators.maxLength(100)]],
      city: [
        data == null ? '' : data.city,
        [Validators.required, Validators.maxLength(100)],
      ],
      stateId: ['', [Validators.required, Validators.maxLength(100)]],
      state: [
        data == null ? '' : data.state,
        [Validators.required, Validators.maxLength(100)],
      ],
      numberHouse: [
        data == null ? '' : data.number_house,
        [Validators.required, Validators.maxLength(100)],
      ],
    });
    if (data != null) {
      this.load.title = 'Editar';
      this.getCities(data.city, data.state);
    } else {
      this.getCities(null, null);
    }
  }

  get f() {
    return this.newUpdateClient.controls;
  }

  getCities(cityName: string, stateName: string) {
    var cities = [];
    this.backofficeService.getCities().subscribe(
      (data: Response) => {
        data.data.forEach((element => {
          cities.push({
            id: element["id"],
            text: element["name"]
          })
        }));
        this.dataCity = cities;
        this.load.dataCity = true;
        if (cityName) {
          var cityId = this.dataCity.filter((f) => cityName.includes(f.text))[0]
            .id;
          this.newUpdateClient.get('cityId').setValue(cityId);
          this.getStateByCity(Number(cityId), stateName);
        }
      },
      (error: HttpErrorResponse) => {
        //this.toastr.error(null, error.error.error);
      }
    );
  }

  getStateByCity(cityId: number, stateName: string) {
    this.load.dataState = false;
    var states = [];
    this.backofficeService.getStateByCityId(cityId).subscribe(
      (data: Response) => {
        data.data.forEach((element => {
          states.push({
            id: element["id"],
            text: element["name"]
          })
        }));
        this.dataState = states;
        this.load.dataState = true;
        if (stateName) {
          var stateId = this.dataState.filter((f) =>
            stateName.includes(f.text)
          )[0].id;
          this.newUpdateClient.get('stateId').setValue(stateId);
        }
      },
      (error: HttpErrorResponse) => {
        //this.toastr.error(null, error.error.error);
      }
    );
  }

  async onSubmit() {
    this.load.createUpdate = true;
    this.submitted = true;
    if (this.newUpdateClient.invalid) {
      this.load.createUpdate = false;
      return;
    }

    await this.createUpdateClient(this.newUpdateClient.value);
  }

  async createUpdateClient(data) {
    var client: IClient = {
      id: data.id,
      identifier: data.id,
      name: data.name,
      lastName: data.last_name,
      email: data.email,
      instagram: data.instagram,
      address: data.address,
      state: data.state,
      city: data.city,
      deptoNumber: data.deptoNumber,
      numberHouse: data.numberHouse,
    };
    if (data.id === null) {
      this.posService.createClient(data).subscribe((response: Response) => {
        this.load.createUpdate = false;
        this.cleanForm();
      });
    } else {
      this.posService
        .updateClient(data.id, data)
        .subscribe((response: Response) => {
          this.load.createUpdate = false;
          this.closeModalReload();
        });
    }
  }

  updateCityText(value) {
    this.newUpdateClient.get('city').setValue(this.dataCity.filter(f => Number(f.id) === Number(value))[0].text)
    
  }

  updateStateText(value) {
    this.newUpdateClient.get('state').setValue(this.dataState.filter(f => Number(f.id) === Number(value))[0].text)
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
    this.newUpdateClient.reset();
    this.submitted = false;
  }
}
