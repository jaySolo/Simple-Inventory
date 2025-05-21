import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnglesGuageComponent } from './angles-guage.component';

describe('AnglesGuageComponent', () => {
  let component: AnglesGuageComponent;
  let fixture: ComponentFixture<AnglesGuageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnglesGuageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnglesGuageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
