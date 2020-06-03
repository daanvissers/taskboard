import { Component, Input, OnInit } from '@angular/core';
import { Project } from '../../../interfaces/project';
import { AuthenticationService } from '../../../services/authentication.service';
import { ProjectsService } from '../../../services/projects.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.css']
})
export class ProjectAddComponent implements OnInit {

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
      owner: this.authService.userData.uid,
      isArchived: false,
      members: [
        {
          'role': 'Owner',
          'uid': this.authService.userData.uid
        }
      ],
    };
    // Use the service to create project on FireBase
    this.projectsService.create(project);
    this.dialog.closeAll();
  }

}
