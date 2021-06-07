import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUpdateBuyesComponent } from './new-update-buyes.component';

describe('NewUpdateBuyesComponent', () => {
  let component: NewUpdateBuyesComponent;
  let fixture: ComponentFixture<NewUpdateBuyesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewUpdateBuyesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUpdateBuyesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
