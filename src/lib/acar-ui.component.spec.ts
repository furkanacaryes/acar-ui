import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcarUiComponent } from './acar-ui.component';

describe('AcarUiComponent', () => {
  let component: AcarUiComponent;
  let fixture: ComponentFixture<AcarUiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcarUiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcarUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
