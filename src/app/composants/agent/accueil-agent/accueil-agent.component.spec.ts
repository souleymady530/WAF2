import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilAgentComponent } from './accueil-agent.component';

describe('AccueilAgentComponent', () => {
  let component: AccueilAgentComponent;
  let fixture: ComponentFixture<AccueilAgentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccueilAgentComponent]
    });
    fixture = TestBed.createComponent(AccueilAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
