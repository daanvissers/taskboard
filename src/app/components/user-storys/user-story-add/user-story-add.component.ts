import {Component, Inject, Input, OnInit} from '@angular/core';
import {Sprint} from "../../../interfaces/sprint";
import { Project } from '../../../interfaces/project';
import {AuthenticationService} from "../../../services/authentication.service";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {SprintsService} from "../../../services/sprints.service";
import {FormControl} from "@angular/forms";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {ProjectsService} from "../../../services/projects.service";
import {UserStory} from "../../../interfaces/user-story";
import {UserStoryService} from "../../../services/user-story.service";

@Component({
  selector: 'app-user-story-add',
  templateUrl: './user-story-add.component.html',
  styleUrls: ['./user-story-add.component.css']
})
export class UserStoryAddComponent implements OnInit {

  @Input() title: string;
  @Input() description: string;
  @Input() storyPoints: number;

  constructor(private route: ActivatedRoute, private authService: AuthenticationService,
              public dialog: MatDialog,
              private sprintService: SprintsService, private projectsService: ProjectsService,
              private userStoryService: UserStoryService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log(this.data.sprintId)
  }

  create() {
    // Create new User Story object
    const userStory: UserStory = {
      title: this.title,
      description: this.description,
      status: "new",
      storyPoints: this.storyPoints,
      owner: "XXXX",
      isArchived: false,
      sprintId: this.data.sprintId,
      projectId: this.data.projectId
    };
    // Use the service to create User Story on FireBase
    this.userStoryService.create(userStory);
    this.dialog.closeAll();
  }

}
