import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUpdateSubCategoryComponent } from './new-update-sub-category.component';

describe('NewUpdateSubCategoryComponent', () => {
  let component: NewUpdateSubCategoryComponent;
  let fixture: ComponentFixture<NewUpdateSubCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewUpdateSubCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUpdateSubCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
