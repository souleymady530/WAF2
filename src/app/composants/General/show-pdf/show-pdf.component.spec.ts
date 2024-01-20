import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPDFComponent } from './show-pdf.component';

describe('ShowPDFComponent', () => {
  let component: ShowPDFComponent;
  let fixture: ComponentFixture<ShowPDFComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowPDFComponent]
    });
    fixture = TestBed.createComponent(ShowPDFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
