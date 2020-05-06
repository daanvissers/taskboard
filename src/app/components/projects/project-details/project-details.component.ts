import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Project } from 'src/app/interfaces/project';
import { ProjectsService } from 'src/app/services/projects.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {

  project: any;

  constructor(private route: ActivatedRoute, private projectsService: ProjectsService) { }

  ngOnInit(): void {
    this.getProject();
  }

  getProject() {
    const id = this.route.snapshot.paramMap.get('id');
    this.project = this.projectsService.get(id).subscribe(res => {
      this.project = res;
    });
  }

}
