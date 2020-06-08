import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStoryEditComponent } from './user-story-edit.component';

describe('UserStoryEditComponent', () => {
  let component: UserStoryEditComponent;
  let fixture: ComponentFixture<UserStoryEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserStoryEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserStoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
