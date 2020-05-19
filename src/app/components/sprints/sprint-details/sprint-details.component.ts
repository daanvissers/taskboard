import { Component, OnInit } from '@angular/core';
import {SprintsService} from "../../../services/sprints.service";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {SprintAddComponent} from "../sprint-add/sprint-add.component";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'app-sprint-details',
  templateUrl: './sprint-details.component.html',
  styleUrls: ['./sprint-details.component.css']
})
export class SprintDetailsComponent implements OnInit {

  sprint: any;

  constructor(private route: ActivatedRoute, private sprintsService: SprintsService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getSprint();
  }

  getSprint() {
    const id = this.route.snapshot.paramMap.get('id');
    this.sprint = this.sprintsService.get(id).subscribe(res => {
      this.sprint = res;
    });
  }

  //TODO vervangen naar user story create
  openCreate() {
    this.dialog.open(SprintAddComponent, {
      height: '500px',
      width: '600px'
    });
  }
}
