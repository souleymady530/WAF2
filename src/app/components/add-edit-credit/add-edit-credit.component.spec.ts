import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCreditComponent } from './add-edit-credit.component';

describe('AddEditCreditComponent', () => {
  let component: AddEditCreditComponent;
  let fixture: ComponentFixture<AddEditCreditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditCreditComponent]
    });
    fixture = TestBed.createComponent(AddEditCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
