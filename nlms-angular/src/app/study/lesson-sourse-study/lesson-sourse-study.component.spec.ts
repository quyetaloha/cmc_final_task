import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonSourseStudyComponent } from './lesson-sourse-study.component';

describe('LessonSourseStudyComponent', () => {
  let component: LessonSourseStudyComponent;
  let fixture: ComponentFixture<LessonSourseStudyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonSourseStudyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonSourseStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
