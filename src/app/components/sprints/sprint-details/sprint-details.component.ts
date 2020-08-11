import { Component, OnInit } from '@angular/core';
import { SprintsService } from "../../../services/sprints.service";
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from "@angular/material/dialog";
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { UserStoryAddComponent } from "../../user-storys/user-story-add/user-story-add.component";
import { UserStoryService } from "../../../services/user-story.service";
import { map, filter } from 'rxjs/operators';
import { Sprint } from 'src/app/interfaces/sprint';
import { BurndownChartComponent } from '../../burndown-chart/burndown-chart.component';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';

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

  sub: Subscription;

  item: any;

  statuses = [
    'To Do',
    'In Progress',
    'Review',
    'Done'
  ];
  todo = [];
  inProgress = [];
  review = [];
  done = [];

  constructor(private route: ActivatedRoute, private sprintsService: SprintsService,
              private userService: UserService,
              public dialog: MatDialog, private userStoryService: UserStoryService) { }

  ngOnInit() {
    this.sprintId = this.route.snapshot.paramMap.get('sprint-id');
    this.projectId = this.route.snapshot.paramMap.get('project-id');

    this.getSprint();
    this.getUserStorys();

    this.userStorys.subscribe(stories => {
      this.todo = stories.filter(story => story.status == 'To Do');
      this.inProgress = stories.filter(story => story.status == 'In Progress');
      this.review = stories.filter(story => story.status == 'Review');
      this.done = stories.filter(story => story.status == 'Done');
    })
  }

  ngOnDestroy() {
    // Check if something is subscribed to to begin with
    if(this.sub) {
      this.sub.unsubscribe();
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {

      // Get the new Status
      const status = event.container.id;
      
      // Update the User Story with the new Status
      let story = event.item.data;
      story.status = status;
      
      // Set timestamp when it was done
      if(story.status === 'Done') {
        story.doneAt = Date.now();
      } else {
        // When it gets removed from Done status, wipe DoneAt timestamp
        story.doneAt = null;
      }
      
      // Let the UserStoryService handle the update in the background
      this.userStoryService.update(story.id, story);
      
      // Front end moves the DragDropItem around
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  getSprint() {
    this.sprint = this.sprintsService.get(this.sprintId);
  }

  getUserStorys() {
    // Get all user stories that belong to this sprint
    this.userStorys = this.userStoryService.getBySprint(this.sprintId)
    .pipe(map(x => {
      x.map(i => {
        if (i['assignee']) {
          this.sub = this.userService.getUser(i['assignee']).subscribe(res => {
            i['displayName'] = res.displayName;
          });
        }
        return i;
      });
      return x;
    }));    
  }

  openCreate() {
    this.dialog.open(UserStoryAddComponent, {
      height: '385px',
      width: '450px',
      data: {
        projectId: this.projectId,
        sprintId: this.sprintId,
      }
    });
  }

  openBurndown(sprint: Sprint) {
    this.dialog.open(BurndownChartComponent, {
      height: '500px',
      width: '800px',
      data: {
        sprint: sprint,
        sprintId: this.sprintId
      }
    });
  }
}
