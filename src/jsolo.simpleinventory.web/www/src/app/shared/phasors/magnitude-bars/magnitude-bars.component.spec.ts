import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagnitudeBarsComponent } from './magnitude-bars.component';

describe('MagnitudeBarsComponent', () => {
  let component: MagnitudeBarsComponent;
  let fixture: ComponentFixture<MagnitudeBarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MagnitudeBarsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MagnitudeBarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
