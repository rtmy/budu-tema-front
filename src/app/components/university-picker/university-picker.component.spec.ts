import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversityPickerComponent } from './university-picker.component';

describe('UniversityPickerComponent', () => {
  let component: UniversityPickerComponent;
  let fixture: ComponentFixture<UniversityPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniversityPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversityPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
