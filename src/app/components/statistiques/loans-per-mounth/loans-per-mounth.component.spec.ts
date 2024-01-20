import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoansPerMounthComponent } from './loans-per-mounth.component';

describe('LoansPerMounthComponent', () => {
  let component: LoansPerMounthComponent;
  let fixture: ComponentFixture<LoansPerMounthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoansPerMounthComponent]
    });
    fixture = TestBed.createComponent(LoansPerMounthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
