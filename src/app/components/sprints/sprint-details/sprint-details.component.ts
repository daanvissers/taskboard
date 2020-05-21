import { Component, OnInit } from '@angular/core';
import {SprintsService} from "../../../services/sprints.service";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {SprintAddComponent} from "../sprint-add/sprint-add.component";
import {MatDialog} from "@angular/material/dialog";
import {UserStoryAddComponent} from "../../user-storys/user-story-add/user-story-add.component";
import {UserStoryDetailsComponent} from "../../user-storys/user-story-details/user-story-details.component";
import {UserStoryService} from "../../../services/user-story.service";


@Component({
  selector: 'app-sprint-details',
  templateUrl: './sprint-details.component.html',
  styleUrls: ['./sprint-details.component.css']
})

export class SprintDetailsComponent implements OnInit {

  sprint: any;
  userStorys: any[];

  constructor(private route: ActivatedRoute, private sprintsService: SprintsService,
              public dialog: MatDialog, private userStoryService: UserStoryService) { }

  ngOnInit(): void {
    this.getSprint();
    this.getUserStorys();
  }

  getSprint() {
    const id = this.route.snapshot.paramMap.get('id');
    this.sprint = this.sprintsService.get(id).subscribe(res => {
      this.sprint = res;
    });
  }

  getUserStorys() {
    this.sprintsService.getAll().subscribe(res => {
      this.userStorys = res;
    })
  }


  openCreate() {
    this.dialog.open(UserStoryAddComponent, {
      height: '500px',
      width: '600px'
    });
  }
}
