import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeApplicantsComponent } from './liste-applicants.component';

describe('ListeApplicantsComponent', () => {
  let component: ListeApplicantsComponent;
  let fixture: ComponentFixture<ListeApplicantsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeApplicantsComponent]
    });
    fixture = TestBed.createComponent(ListeApplicantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
