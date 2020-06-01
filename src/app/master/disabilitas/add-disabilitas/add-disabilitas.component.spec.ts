import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDisabilitasComponent } from './add-disabilitas.component';

describe('AddDisabilitasComponent', () => {
  let component: AddDisabilitasComponent;
  let fixture: ComponentFixture<AddDisabilitasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDisabilitasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDisabilitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
