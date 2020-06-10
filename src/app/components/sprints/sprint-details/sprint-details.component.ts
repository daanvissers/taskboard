import { Component, OnInit } from '@angular/core';
import { SprintsService } from "../../../services/sprints.service";
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from "@angular/material/dialog";
import { UserStoryAddComponent } from "../../user-storys/user-story-add/user-story-add.component";
import { UserStoryService } from "../../../services/user-story.service";


@Component({
  selector: 'app-sprint-details',
  templateUrl: './sprint-details.component.html',
  styleUrls: ['./sprint-details.component.css']
})

export class SprintDetailsComponent implements OnInit {

  sprint: any;
  userStorys: any;

  sprintId: string;
  projectId: string;

  constructor(private route: ActivatedRoute, private sprintsService: SprintsService,
              public dialog: MatDialog, private userStoryService: UserStoryService) { }

  ngOnInit(): void {
    this.sprintId = this.route.snapshot.paramMap.get('sprint-id');
    this.projectId = this.route.snapshot.paramMap.get('project-id');

    this.getSprint();
    this.getUserStorys();
  }

  getSprint() {
    this.sprint = this.sprintsService.get(this.sprintId);
  }

  getUserStorys() {
    // Get all user stories that belong to this sprint
    this.userStorys = this.userStoryService.getBySprint(this.sprintId);
  }

  openCreate() {
    this.dialog.open(UserStoryAddComponent, {
      height: '500px',
      width: '600px',
      data: {
        projectId: this.projectId,
        sprintId: this.sprintId,
      }
    });
  }
}
