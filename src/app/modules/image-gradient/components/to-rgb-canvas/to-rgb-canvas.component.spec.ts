import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToRgbCanvasComponent } from './to-rgb-canvas.component';

describe('ToRgbCanvasComponent', () => {
  let component: ToRgbCanvasComponent;
  let fixture: ComponentFixture<ToRgbCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToRgbCanvasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToRgbCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
