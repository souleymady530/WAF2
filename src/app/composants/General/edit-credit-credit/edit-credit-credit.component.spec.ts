import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCreditCreditComponent } from './edit-credit-credit.component';

describe('EditCreditCreditComponent', () => {
  let component: EditCreditCreditComponent;
  let fixture: ComponentFixture<EditCreditCreditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCreditCreditComponent]
    });
    fixture = TestBed.createComponent(EditCreditCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
