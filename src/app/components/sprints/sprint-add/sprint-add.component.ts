import {Component, Input, OnInit} from '@angular/core';
import {Sprint} from "../../../interfaces/sprint";
import { Project } from '../../../interfaces/project';
import {AuthenticationService} from "../../../services/authentication.service";
import {MatDialog} from "@angular/material/dialog";
import {SprintsService} from "../../../services/sprints.service";
import {FormControl} from "@angular/forms";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {ProjectsService} from "../../../services/projects.service";


@Component({
  selector: 'app-sprint-add',
  templateUrl: './sprint-add.component.html',
  styleUrls: ['./sprint-add.component.css']
})
export class SprintAddComponent implements OnInit {

  @Input() title: string;
  @Input() description: string;
  @Input() startDate: string;
  @Input() endDate: any;

  project: any;

  constructor(private route: ActivatedRoute, private authService: AuthenticationService, public dialog: MatDialog,
              private sprintService: SprintsService, private projectsService: ProjectsService) { }

  ngOnInit(): void {
    const projId = this.route.snapshot.paramMap.get('id');
    console.log(projId);
  }


  public getProjectId(): string {
    const id = this.route.snapshot.paramMap.get('id');
    this.project = this.projectsService.get(id).subscribe(res => {
      this.project = res;
    });

    console.log(id);
    return id;
  }

  create() {
    const projId = this.route.snapshot.paramMap.get('id');
    console.log(projId);

    // Create new Sprint object
    const sprint: Sprint = {
      title: this.title,
      description: this.description,
      startDate: this.startDate,
      endDate: this.endDate,
      // TODO: Huidig project ID ophalen
      projectId: this.route.snapshot.paramMap.get('id')
    };
    // Use the service to create sprint on FireBase
    this.sprintService.create(sprint);
    this.dialog.closeAll();
  }
}
