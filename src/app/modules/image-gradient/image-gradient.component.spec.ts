import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageGradientComponent } from './image-gradient.component';

describe('ImageGradientComponent', () => {
  let component: ImageGradientComponent;
  let fixture: ComponentFixture<ImageGradientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageGradientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageGradientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
