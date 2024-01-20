import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoansPerSexComponent } from './loans-per-sex.component';

describe('LoansPerSexComponent', () => {
  let component: LoansPerSexComponent;
  let fixture: ComponentFixture<LoansPerSexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoansPerSexComponent]
    });
    fixture = TestBed.createComponent(LoansPerSexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
