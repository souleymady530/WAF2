import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeEndorserComponent } from './liste-endorser.component';

describe('ListeEndorserComponent', () => {
  let component: ListeEndorserComponent;
  let fixture: ComponentFixture<ListeEndorserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeEndorserComponent]
    });
    fixture = TestBed.createComponent(ListeEndorserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
