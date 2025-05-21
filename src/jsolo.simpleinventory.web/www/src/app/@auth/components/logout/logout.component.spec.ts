import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxLogoutComponent } from './logout.component';

describe('LogoutComponent', () => {
  let component: NgxLogoutComponent;
  let fixture: ComponentFixture<NgxLogoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxLogoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
