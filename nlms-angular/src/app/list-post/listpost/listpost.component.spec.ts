import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListpostComponent } from './listpost.component';

describe('ListpostComponent', () => {
  let component: ListpostComponent;
  let fixture: ComponentFixture<ListpostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListpostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
