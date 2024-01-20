import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoansPerRemboursementComponent } from './loans-per-remboursement.component';

describe('LoansPerRemboursementComponent', () => {
  let component: LoansPerRemboursementComponent;
  let fixture: ComponentFixture<LoansPerRemboursementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoansPerRemboursementComponent]
    });
    fixture = TestBed.createComponent(LoansPerRemboursementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
