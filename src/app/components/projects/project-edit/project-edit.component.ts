import { Component, OnInit, Inject, Input } from '@angular/core';
import { ProjectsService } from 'src/app/services/projects.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {

  project: any;

  @Input() name: string;
  @Input() description: string;
  @Input() owner: string;

  selectedStatus: string;
  statuses = [
    { viewValue: 'Not Started' },
    { viewValue: 'In Progress' },
    { viewValue: 'Finished' }
  ];

  constructor(private projectsService: ProjectsService, 
              private dialog: MatDialogRef<ProjectEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    // Pass the Project from the Material Dialog Data
    this.project = this.data.project;

    // Fill the Input fields
    this.name = this.project.name;
    this.description = this.project.description;
    this.owner = this.project.owner;
    this.selectedStatus = this.project.status;
  }

  update() {   
    // Validation check for empty fields
    if (this.name && this.description) {

      const project = {
        name: this.name,
        description: this.description,
        // owner: this.owner,
        status: this.selectedStatus
      };

      this.projectsService.update(this.data.id, project);
      this.dialog.close();
    }
  }
}
