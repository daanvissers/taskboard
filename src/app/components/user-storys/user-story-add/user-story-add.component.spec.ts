import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStoryAddComponent } from './user-story-add.component';

describe('UserStoryAddComponent', () => {
  let component: UserStoryAddComponent;
  let fixture: ComponentFixture<UserStoryAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserStoryAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserStoryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
