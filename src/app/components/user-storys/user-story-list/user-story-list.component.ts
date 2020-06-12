import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProjectsService} from "../../../services/projects.service";
import {MatDialog} from "@angular/material/dialog";
import {SprintsService} from "../../../services/sprints.service";
import {UserStoryService} from "../../../services/user-story.service";
import {UserStoryAddComponent} from "../user-story-add/user-story-add.component";
import {UserStoryEditComponent} from "../user-story-edit/user-story-edit.component";


@Component({
  selector: 'app-user-story-list',
  templateUrl: './user-story-list.component.html',
  styleUrls: ['./user-story-list.component.css']
})
export class UserStoryListComponent implements OnInit {

  project: any;
  userStorys: any;
  projectId: string;

  constructor(private route: ActivatedRoute, private projectsService: ProjectsService,
              public dialog: MatDialog, private sprintsService: SprintsService,
              private userStorysService: UserStoryService)
  {
    this.projectId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getProject();
    this.getUserStorys(this.projectId)
  }

  getProject() {
    this.project = this.projectsService.get(this.projectId).subscribe(res => {
      this.project = res;
    });
  }

  openCreate() {
    this.dialog.open(UserStoryAddComponent, {
      height: '500px',
      width: '600px',
      data: { 
        projectId: this.projectId,
        sprintId: null // Choose to assign Sprint later
      }
    });
  }

  getUserStorys(projectId: string){
    this.userStorys = this.userStorysService.getByProject(projectId);
  }

  editUserStory(id: string) {
    this.dialog.open(UserStoryEditComponent, {
      width: '450px',
      height: '400px',
      data: { id: id },
    });
  }

  deleteUserStory(id: string) {
    this.userStorysService.delete(id);
  }

  archiveUserStory(id: string) {
    this.userStorysService.archive(id, true);
  }

}
