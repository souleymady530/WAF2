import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditLevelFormule2Component } from './add-edit-level-formule2.component';

describe('AddEditLevelFormule2Component', () => {
  let component: AddEditLevelFormule2Component;
  let fixture: ComponentFixture<AddEditLevelFormule2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditLevelFormule2Component]
    });
    fixture = TestBed.createComponent(AddEditLevelFormule2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
