import { ModalMessageModel } from '../../../classes/ModalMessage';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ModalService {

    subject = new BehaviorSubject<ModalMessageModel>({action: 'CLOSE'});
    constructor() { }

    // used by the component calling the modal service
    open(data: any, nameModal:string) {
        this.subject.next({data, nameModal, action: 'OPEN'});
    }

    close() {
        this.subject.next({action: 'CLOSE'});
    }

    // used by modal template to receive data
    getMyModalSubjectRef(): Observable<ModalMessageModel> {
        return this.subject.asObservable();
    }

}