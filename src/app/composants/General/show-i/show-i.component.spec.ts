import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SHowIComponent } from './show-i.component';

describe('SHowIComponent', () => {
  let component: SHowIComponent;
  let fixture: ComponentFixture<SHowIComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SHowIComponent]
    });
    fixture = TestBed.createComponent(SHowIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
