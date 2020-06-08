import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStoryArchiveComponent } from './user-story-archive.component';

describe('UserStoryArchiveComponent', () => {
  let component: UserStoryArchiveComponent;
  let fixture: ComponentFixture<UserStoryArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserStoryArchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserStoryArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
