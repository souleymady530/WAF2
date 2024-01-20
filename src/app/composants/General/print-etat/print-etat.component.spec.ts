import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintEtatComponent } from './print-etat.component';

describe('PrintEtatComponent', () => {
  let component: PrintEtatComponent;
  let fixture: ComponentFixture<PrintEtatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrintEtatComponent]
    });
    fixture = TestBed.createComponent(PrintEtatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
