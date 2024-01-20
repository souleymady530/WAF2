import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerListerComponent } from './manager-lister.component';

describe('ManagerListerComponent', () => {
  let component: ManagerListerComponent;
  let fixture: ComponentFixture<ManagerListerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerListerComponent]
    });
    fixture = TestBed.createComponent(ManagerListerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
