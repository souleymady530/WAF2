import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportFIleComponent } from './import-file.component';

describe('ImportFIleComponent', () => {
  let component: ImportFIleComponent;
  let fixture: ComponentFixture<ImportFIleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImportFIleComponent]
    });
    fixture = TestBed.createComponent(ImportFIleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
