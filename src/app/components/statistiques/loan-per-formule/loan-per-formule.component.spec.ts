import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanPerFormuleComponent } from './loan-per-formule.component';

describe('LoanPerFormuleComponent', () => {
  let component: LoanPerFormuleComponent;
  let fixture: ComponentFixture<LoanPerFormuleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoanPerFormuleComponent]
    });
    fixture = TestBed.createComponent(LoanPerFormuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
