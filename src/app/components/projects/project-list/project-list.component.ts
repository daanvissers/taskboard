import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProjectAddComponent } from '../project-add/project-add.component';
import { ProjectsService } from 'src/app/services/projects.service';
import { Project } from 'src/app/interfaces/project';
import { ProjectEditComponent } from '../project-edit/project-edit.component';
import { stringify } from 'querystring';

import { flatMap, filter, map, switchMap } from 'rxjs/operators';
import { Observable, observable, combineLatest } from 'rxjs';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  projects: any;

  constructor(public dialog: MatDialog, private projectsService: ProjectsService) { }

  ngOnInit(): void {
    this.getProjects();
  }

  openCreate() {
    this.dialog.open(ProjectAddComponent, {
      height: '360px',
      width: '600px'
    });
  }

  getProjects() {
    this.projectsService.getAll().subscribe(res => {
      this.projects = res;
      console.log(this.projects);
    });
  }

  editProject(id: string) {
    this.dialog.open(ProjectEditComponent, {
      width: '450px',
      height: '400px',
      data: { id: id },
    });
  }

  deleteProject(id: string) {
    this.projectsService.delete(id);
  }

  archiveProject(id: string) {
    this.projectsService.archive(id);
  }

}
