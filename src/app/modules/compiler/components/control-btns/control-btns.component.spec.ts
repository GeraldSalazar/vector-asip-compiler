import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlBtnsComponent } from './control-btns.component';

describe('ControlBtnsComponent', () => {
  let component: ControlBtnsComponent;
  let fixture: ComponentFixture<ControlBtnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlBtnsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlBtnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
