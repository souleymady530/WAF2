import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewApplicantAntecedantComponent } from './view-applicant-antecedant.component';

describe('ViewApplicantAntecedantComponent', () => {
  let component: ViewApplicantAntecedantComponent;
  let fixture: ComponentFixture<ViewApplicantAntecedantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewApplicantAntecedantComponent]
    });
    fixture = TestBed.createComponent(ViewApplicantAntecedantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
