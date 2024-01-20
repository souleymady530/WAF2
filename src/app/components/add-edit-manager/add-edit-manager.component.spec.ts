import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditManagerComponent } from './add-edit-manager.component';

describe('AddEditManagerComponent', () => {
  let component: AddEditManagerComponent;
  let fixture: ComponentFixture<AddEditManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditManagerComponent]
    });
    fixture = TestBed.createComponent(AddEditManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
