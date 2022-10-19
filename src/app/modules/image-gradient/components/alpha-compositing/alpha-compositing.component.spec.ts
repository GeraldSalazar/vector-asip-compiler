import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlphaCompositingComponent } from './alpha-compositing.component';

describe('AlphaCompositingComponent', () => {
  let component: AlphaCompositingComponent;
  let fixture: ComponentFixture<AlphaCompositingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlphaCompositingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlphaCompositingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
