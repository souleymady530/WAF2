import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditEndorserComponent } from './add-edit-endorser.component';

describe('AddEditEndorserComponent', () => {
  let component: AddEditEndorserComponent;
  let fixture: ComponentFixture<AddEditEndorserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditEndorserComponent]
    });
    fixture = TestBed.createComponent(AddEditEndorserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
