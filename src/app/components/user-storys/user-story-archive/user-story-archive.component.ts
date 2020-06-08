import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {UserStoryService} from "../../../services/user-story.service";
import { ProjectsService } from 'src/app/services/projects.service';
import {ActivatedRoute} from "@angular/router";
import {SprintsService} from "../../../services/sprints.service";



@Component({
  selector: 'app-user-story-archive',
  templateUrl: './user-story-archive.component.html',
  styleUrls: ['./user-story-archive.component.css']
})
export class UserStoryArchiveComponent implements OnInit {

  userStorys: any;
  sprint: any;
  projectId: string;
  sprintId: string;

  constructor(private route: ActivatedRoute,
              public dialog: MatDialog, private userStorysService: UserStoryService,
              private sprintsService: SprintsService) {
    this.sprintId = this.route.snapshot.paramMap.get('id');

  }

  ngOnInit(): void {
    this.getSprint();
    this.getUserStorys();
  }

  getUserStorys(){
    this.userStorys = this.userStorysService.getBySprint(this.sprintId);

  }


  getSprint(){
    this.sprint = this.sprintsService.get(this.sprintId).subscribe(res => {
      this.sprint = res;
    });
  }

}
