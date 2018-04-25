import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Function1DComponent } from './function1d.component';

describe('Function1DComponent', () => {
  let component: Function1DComponent;
  let fixture: ComponentFixture<Function1DComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Function1DComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Function1DComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
