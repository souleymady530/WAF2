import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoansPerProfessionComponent } from './loans-per-profession.component';

describe('LoansPerProfessionComponent', () => {
  let component: LoansPerProfessionComponent;
  let fixture: ComponentFixture<LoansPerProfessionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoansPerProfessionComponent]
    });
    fixture = TestBed.createComponent(LoansPerProfessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
