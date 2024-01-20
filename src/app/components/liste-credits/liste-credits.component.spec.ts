import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCreditsComponent } from './liste-credits.component';

describe('ListeCreditsComponent', () => {
  let component: ListeCreditsComponent;
  let fixture: ComponentFixture<ListeCreditsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeCreditsComponent]
    });
    fixture = TestBed.createComponent(ListeCreditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
