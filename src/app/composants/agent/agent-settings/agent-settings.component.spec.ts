import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentSettingsComponent } from './agent-settings.component';

describe('AgentSettingsComponent', () => {
  let component: AgentSettingsComponent;
  let fixture: ComponentFixture<AgentSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgentSettingsComponent]
    });
    fixture = TestBed.createComponent(AgentSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
