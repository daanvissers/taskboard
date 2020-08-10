import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Project } from 'src/app/interfaces/project';
import { Sprint } from 'src/app/interfaces/sprint';
import { ProjectsService } from 'src/app/services/projects.service';
import { SprintsService } from 'src/app/services/sprints.service';
import { switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ProjectAddComponent } from '../project-add/project-add.component';
import { SprintEditComponent } from '../../sprints/sprint-edit/sprint-edit.component';
import { stringify } from 'querystring';
import { SprintAddComponent } from "../../sprints/sprint-add/sprint-add.component";
import { UserStoryService } from 'src/app/services/user-story.service';
import {MatSelectModule, MatSelectChange} from '@angular/material/select';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {

  project: any;
  projects: any;
  sprints: any;
  selectedSprint = [];

  unassignedUserStories: any;

  projectId: string;

  constructor(private route: ActivatedRoute, private projectsService: ProjectsService,
              public dialog: MatDialog, private sprintsService: SprintsService,
              private userStoryService: UserStoryService)
  {
      this.projectId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getProject();
    this.getSprints(this.projectId);
    this.getUnassigned(this.projectId);
  }

  getProject() {
    this.project = this.projectsService.get(this.projectId).subscribe(res => {
      this.project = res;
    });
  }

  openCreate() {
    this.dialog.open(SprintAddComponent, {
      height: '500px',
      width: '600px',
      data: { projectId: this.projectId }
    });
  }

  getSprints(projectId: string) {
    this.sprintsService.getByProject(projectId).subscribe(res => {
      this.sprints = res;
    })
  }

  getUnassigned(projectId: string) {
    this.unassignedUserStories = this.userStoryService.getUnassignedByProject(this.projectId);
  }

  selectSprint(event: MatSelectChange) {    
    this.selectedSprint[event.source.id] = event.value;
  }

  assignToSprint(storyId: string) {
    // Grab the Sprint ID from the selectedSprint Array
    const selectedSprintId = this.selectedSprint[storyId];
    
    // Update UserStory SprintId-field with the Sprint ID
    let field: object = {sprintId: selectedSprintId};
    this.userStoryService.updateField(storyId, field);
  }

  editSprint(sprint: any, sprintId: string) {
    this.dialog.open(SprintEditComponent, {
      width: '450px',
      height: '500px',
      data: { 
        sprint: sprint,
        sprintId: sprintId 
      },
    });
  }

  deleteSprint(id: string) {    
    this.sprintsService.delete(id);
  }

  activateSprint(id: string) {
    this.sprintsService.activate(id, this.projectId);
  }

}
