import { Component, Input, OnInit, Inject } from '@angular/core';
import { Sprint } from "../../../interfaces/sprint";
import { Project } from '../../../interfaces/project';
import { AuthenticationService } from "../../../services/authentication.service";
import { MatDialog } from "@angular/material/dialog";
import { SprintsService} from "../../../services/sprints.service";
import { FormControl } from "@angular/forms";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ProjectsService } from "../../../services/projects.service";
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-sprint-add',
  templateUrl: './sprint-add.component.html',
  styleUrls: ['./sprint-add.component.css']
})
export class SprintAddComponent implements OnInit {

  @Input() title: string;
  @Input() description: string;
  @Input() startDate: any;
  @Input() endDate: any;

  project: any;
  todayDate: Date = new Date();

  constructor(private route: ActivatedRoute, private authService: AuthenticationService, public dialog: MatDialog,
              private sprintService: SprintsService, private projectsService: ProjectsService,
              @Inject(MAT_DIALOG_DATA) public data: any)
  { }

  ngOnInit() {
    this.getProject();
  }

  getProject() {
    // Get the project from the id passed onto the Material Dialog
    this.project = this.projectsService.get(this.data.projectId).subscribe(res => {
      this.project = res;
    });
  }

  create() {
    // Create new Sprint object
    const sprint: Sprint = {
      title: this.title,
      description: this.description,
      startDate: this.startDate,
      endDate: this.endDate,
      projectId: this.data.projectId,
      isActive: false,
    };
    // Use the service to create sprint on FireBase
    this.sprintService.create(sprint);
    this.dialog.closeAll();
  }
}
