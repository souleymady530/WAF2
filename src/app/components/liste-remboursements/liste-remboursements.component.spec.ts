import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeRemboursementsComponent } from './liste-remboursements.component';

describe('ListeRemboursementsComponent', () => {
  let component: ListeRemboursementsComponent;
  let fixture: ComponentFixture<ListeRemboursementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeRemboursementsComponent]
    });
    fixture = TestBed.createComponent(ListeRemboursementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
