import { Component, OnInit, Inject, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from 'src/app/services/projects.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

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

  constructor(private projectsService: ProjectsService, public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    // TODO: Load existing project values into Input fields
    this.getProject();
  }

  getProject() {
    // Get the project from the id passed onto the Material Dialog
    this.project = this.projectsService.get(this.data.id)
    .subscribe(res => {
      this.project = res;
    });
  }

  update() {
    const project = {
      name: this.name,
      description: this.description,
      // owner: this.owner,
    };
    this.projectsService.update(this.data.id, project);
    this.dialog.closeAll();
  }

}
