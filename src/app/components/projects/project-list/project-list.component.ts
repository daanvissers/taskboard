import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProjectAddComponent } from '../project-add/project-add.component';
import { ProjectsService } from 'src/app/services/projects.service';
import { Project } from 'src/app/interfaces/project';

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
    })
  }

  deleteProject(id: string) {
    this.projectsService.delete(id);
  }

}
