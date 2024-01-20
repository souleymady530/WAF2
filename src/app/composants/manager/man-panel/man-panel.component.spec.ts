import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManPanelComponent } from './man-panel.component';

describe('ManPanelComponent', () => {
  let component: ManPanelComponent;
  let fixture: ComponentFixture<ManPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManPanelComponent]
    });
    fixture = TestBed.createComponent(ManPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
