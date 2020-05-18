import { Component, OnInit, Inject, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Project } from 'src/app/interfaces/project';
import { ProjectsService } from 'src/app/services/projects.service';
import { switchMap } from 'rxjs/operators';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

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

  constructor(private route: ActivatedRoute, private projectsService: ProjectsService, 
                      @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.getProject();
  }

  getProject() {
    // Get the project from the id passed onto the Material Dialog
    this.project = this.projectsService.get(this.data.id).subscribe(res => {
      this.project = res;
    });
  }

  update() {
    let project = {
      name: this.name,
      description: this.description,
      owner: this.owner,
    };

    this.projectsService.update(this.data.id, project);
  }

}
