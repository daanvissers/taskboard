import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProjectAddComponent } from '../project-add/project-add.component';
import { ProjectsService } from 'src/app/services/projects.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { Project } from 'src/app/interfaces/project';
import { ProjectEditComponent } from '../project-edit/project-edit.component';
import { stringify } from 'querystring';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from "src/app/interfaces/user";

import { flatMap, filter, map, switchMap, tap, zip } from 'rxjs/operators';
import { Observable, observable, combineLatest } from 'rxjs';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  projects: any;
  selectedProject: any;

  constructor(public dialog: MatDialog, private projectsService: ProjectsService,
              private afStore: AngularFirestore, private userService: UserService,
              private auth: AuthenticationService) { }

  ngOnInit(): void {
    this.projects = this.projectsService.getAll();

    // Promise gets fulfilled when user selects a Project
    this.selectedProject = new Promise<Project>(null);
  }

  openCreate() {
    this.dialog.open(ProjectAddComponent, {
      height: '360px',
      width: '600px'
    });
  }

  getProjects() {
    //
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

  openProject(project: Project) {
    this.selectedProject = project;

    // Retrieve the Project's Members as Users
    this.selectedProject.members.forEach(member => {
        member.user = this.userService.getUser(member.uid);
    });

    // Determine whether the currently logged in user can edit
    let canEdit = (this.selectedProject.members
                            .map(x => x.uid)
                            .includes(this.auth.userData.uid));

    // Overwrite canEdit if the logged in user is the owner
    if (this.auth.userData.uid === this.selectedProject.owner)
      canEdit = true;

    this.selectedProject.canEdit = canEdit;
  }

}
