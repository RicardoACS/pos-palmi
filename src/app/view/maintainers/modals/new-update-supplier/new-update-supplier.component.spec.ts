import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUpdateSupplierComponent } from './new-update-supplier.component';

describe('NewUpdateSupplierComponent', () => {
  let component: NewUpdateSupplierComponent;
  let fixture: ComponentFixture<NewUpdateSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewUpdateSupplierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUpdateSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
