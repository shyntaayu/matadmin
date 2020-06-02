import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDisabilitasComponent } from './delete-disabilitas.component';

describe('DeleteDisabilitasComponent', () => {
  let component: DeleteDisabilitasComponent;
  let fixture: ComponentFixture<DeleteDisabilitasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteDisabilitasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDisabilitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
