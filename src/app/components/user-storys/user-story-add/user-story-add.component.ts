import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { ProjectsService } from "../../../services/projects.service";
import { UserStory } from "../../../interfaces/user-story";
import { UserStoryService } from "../../../services/user-story.service";
import { Observable, Subscription } from 'rxjs';
import { Project } from 'src/app/interfaces/project';
import { UserService } from 'src/app/services/user.service';
import { findIndex } from 'rxjs/operators';

@Component({
  selector: 'app-user-story-add',
  templateUrl: './user-story-add.component.html',
  styleUrls: ['./user-story-add.component.css']
})
export class UserStoryAddComponent implements OnInit {

  @Input() title: string;
  @Input() description: string;
  @Input() storyPoints: number;

  currentProject: any;
  private sub: Subscription;

  // UID of the Assignee
  selected: string;

  members = [];

  constructor(public dialog: MatDialog, 
              private userService: UserService,
              private projectService: ProjectsService,
              private userStoryService: UserStoryService, 
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.getProject();
  }

  getProject() {
    this.sub = this.projectService.get(this.data.projectId).subscribe(project => {
      this.currentProject = project;
    });
  }

  getMembers() {
    if(!this.members.length) {
      // TODO: Fix Select Box click bug
      this.currentProject.members.forEach(element => {
        this.members.push(this.userService.getUser(element.uid));
      });
    }  
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  create() {
    // Create new User Story object
    const userStory: UserStory = {
      title: this.title,
      description: this.description,
      status: 'To Do', // Default
      storyPoints: this.storyPoints,
      assignee: this.selected, // Nullable
      isArchived: false,
      sprintId: this.data.sprintId,
      projectId: this.data.projectId
    };
    // Use the service to create User Story on FireBase
    this.userStoryService.create(userStory);
    this.dialog.closeAll();
  }

}
