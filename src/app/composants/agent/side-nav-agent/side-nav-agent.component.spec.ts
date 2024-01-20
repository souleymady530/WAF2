import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavAgentComponent } from './side-nav-agent.component';

describe('SideNavAgentComponent', () => {
  let component: SideNavAgentComponent;
  let fixture: ComponentFixture<SideNavAgentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SideNavAgentComponent]
    });
    fixture = TestBed.createComponent(SideNavAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
