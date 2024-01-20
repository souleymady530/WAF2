import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditApplicantComponent } from './add-edit-applicant.component';

describe('AddEditApplicantComponent', () => {
  let component: AddEditApplicantComponent;
  let fixture: ComponentFixture<AddEditApplicantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditApplicantComponent]
    });
    fixture = TestBed.createComponent(AddEditApplicantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
