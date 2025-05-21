import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxChangePasswordComponent } from './change-password.component';

describe('ChangePasswordComponent', () => {
  let component: NgxChangePasswordComponent;
  let fixture: ComponentFixture<NgxChangePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxChangePasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
