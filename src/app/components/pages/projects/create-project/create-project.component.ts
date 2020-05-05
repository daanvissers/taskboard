import {Component, Input, OnInit} from '@angular/core';
import {Project} from '../../../../interfaces/project';
import {AuthenticationService} from '../../../../services/authentication.service';
import {ProjectsService} from '../../../../services/projects.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {

  @Input() title: string;
  @Input() description: string;

  constructor(private authService: AuthenticationService, public dialog: MatDialog,
              private projectsService: ProjectsService) { }

  ngOnInit(): void {
  }

  create() {
    // Create new Project object
    const project: Project = {
      name: this.title,
      description: this.description,
      status: 'Not Started',
      owner: this.authService.userData.uid
    };
    // Use the service to create project on FireBase
    this.projectsService.create(project);
    this.dialog.closeAll();
  }

}
