import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectMemberEditComponent } from './project-member-edit.component';

describe('ProjectMemberEditComponent', () => {
  let component: ProjectMemberEditComponent;
  let fixture: ComponentFixture<ProjectMemberEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectMemberEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectMemberEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
