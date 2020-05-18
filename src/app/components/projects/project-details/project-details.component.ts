import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Project } from 'src/app/interfaces/project';
import { ProjectsService } from 'src/app/services/projects.service';
import { SprintsService } from 'src/app/services/sprints.service';
import { switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ProjectAddComponent } from '../project-add/project-add.component';
import { ProjectEditComponent } from '../project-edit/project-edit.component';
import { stringify } from 'querystring';


@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {

  project: any;
  projects: any;
  sprints: any;

  constructor(private route: ActivatedRoute, private projectsService: ProjectsService,
              public dialog: MatDialog, private sprintsService: SprintsService) { }

  ngOnInit(): void {
    this.getProject();
    this.getSprints();
  }

  getProject() {
    const id = this.route.snapshot.paramMap.get('id');
    this.project = this.projectsService.get(id).subscribe(res => {
      this.project = res;
    });
  }

  openCreate() {
    this.dialog.open(ProjectAddComponent, {
      height: '360px',
      width: '600px'
    });
  }

  getSprints() {
    this.sprintsService.getAll().subscribe(res => {
      this.sprints = res;
    })
  }

  editSprint(id: string) {
    this.dialog.open(ProjectEditComponent, {
      width: '450px',
      height: '400px',
      data: { id: id },
    });
  }

  deleteSprint(id: string) {
    this.sprintsService.delete(id);
  }


}
