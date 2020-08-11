import { Component, Inject, Input, OnInit } from '@angular/core';
import { ProjectsService } from "../../../services/projects.service";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { UserStoryService } from "../../../services/user-story.service";
import { UserStory } from 'src/app/interfaces/user-story';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-story-edit',
  templateUrl: './user-story-edit.component.html',
  styleUrls: ['./user-story-edit.component.css']
})
export class UserStoryEditComponent implements OnInit {

  project: any;
  userStory: UserStory;
  members = [];

  @Input() title: string;
  @Input() description: string;
  @Input() assignee: string;
  @Input() storyPoints: number;


  constructor(private projectsService: ProjectsService, 
              private userStoryService: UserStoryService,
              private userService: UserService,
              public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.userStory = this.data.userStory;
    this.title = this.userStory.title;
    this.description = this.userStory.description;
    this.storyPoints = this.userStory.storyPoints;
    
    this.project = this.data.project;
  }

  getMembers() {
    if(!this.members.length) {
      // TODO: Fix Select Box click bug
      this.project.members.forEach(element => {
        this.members.push(this.userService.getUser(element.uid));
      });
    }  
  }

  update() {
    const userStory = {
      title: this.title,
      description: this.description,
      storyPoints: this.storyPoints,
      assignee: this.assignee
    };
    
    this.userStoryService.update(this.data.id, userStory);
    this.dialog.closeAll();
  }

}
