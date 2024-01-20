import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoansPerAgentComponent } from './loans-per-agent.component';

describe('LoansPerAgentComponent', () => {
  let component: LoansPerAgentComponent;
  let fixture: ComponentFixture<LoansPerAgentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoansPerAgentComponent]
    });
    fixture = TestBed.createComponent(LoansPerAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
