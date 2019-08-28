import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourseStudyComponent } from './sourse-study.component';

describe('SourseStudyComponent', () => {
  let component: SourseStudyComponent;
  let fixture: ComponentFixture<SourseStudyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourseStudyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourseStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
