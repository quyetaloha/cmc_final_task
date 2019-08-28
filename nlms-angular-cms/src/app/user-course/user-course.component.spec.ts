import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCourseComponent } from './user-course.component';

describe('UserCourseComponent', () => {
  let component: UserCourseComponent;
  let fixture: ComponentFixture<UserCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
