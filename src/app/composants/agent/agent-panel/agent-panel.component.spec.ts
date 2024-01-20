import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentPanelComponent } from './agent-panel.component';

describe('AgentPanelComponent', () => {
  let component: AgentPanelComponent;
  let fixture: ComponentFixture<AgentPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgentPanelComponent]
    });
    fixture = TestBed.createComponent(AgentPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
