import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStoryDoneEditComponent } from './user-story-done-edit.component';

describe('UserStoryDoneEditComponent', () => {
  let component: UserStoryDoneEditComponent;
  let fixture: ComponentFixture<UserStoryDoneEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserStoryDoneEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserStoryDoneEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
