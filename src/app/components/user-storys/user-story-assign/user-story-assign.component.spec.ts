import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStoryAssignComponent } from './user-story-assign.component';

describe('UserStoryAssignComponent', () => {
  let component: UserStoryAssignComponent;
  let fixture: ComponentFixture<UserStoryAssignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserStoryAssignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserStoryAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
