import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisabilitasComponent } from './disabilitas.component';

describe('DisabilitasComponent', () => {
  let component: DisabilitasComponent;
  let fixture: ComponentFixture<DisabilitasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisabilitasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisabilitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
