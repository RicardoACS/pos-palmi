import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUpdateClientComponent } from './new-update-client.component';

describe('NewUpdateClientComponent', () => {
  let component: NewUpdateClientComponent;
  let fixture: ComponentFixture<NewUpdateClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewUpdateClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUpdateClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
