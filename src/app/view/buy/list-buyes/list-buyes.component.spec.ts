import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBuyesComponent } from './list-buyes.component';

describe('ListBuyesComponent', () => {
  let component: ListBuyesComponent;
  let fixture: ComponentFixture<ListBuyesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBuyesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBuyesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
