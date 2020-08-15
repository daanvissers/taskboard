import { Component, OnInit, Inject } from '@angular/core';
import { UserStory } from 'src/app/interfaces/user-story';
import { ProjectsService } from 'src/app/services/projects.service';
import { UserStoryService } from 'src/app/services/user-story.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SprintsService } from 'src/app/services/sprints.service';
import { Observable, Subscription } from 'rxjs';
import { Sprint } from 'src/app/interfaces/sprint';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-story-assign',
  templateUrl: './user-story-assign.component.html',
  styleUrls: ['./user-story-assign.component.css']
})
export class UserStoryAssignComponent implements OnInit {

  userStory: UserStory;
  sprints: any;
  selected: string;
  sub: Subscription;

  constructor(private projectsService: ProjectsService, 
              private userStoryService: UserStoryService,
              private sprintService: SprintsService,
              public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.userStory = this.data.userStory;

    // Get Sprints
    const sprints = this.sprintService.getByProject(this.userStory.projectId)
    .pipe(map(sprints => {
      return sprints.map(sprint => {
        if (sprint) {
          const data = sprint.payload.doc.data() as Sprint;
          const id = sprint.payload.doc.id;
          return { id, ...data };
        } else {
          return null;
        }
      })      
    }));

    // Subscribe for Sprints
    this.sub = sprints.subscribe(sprints => {
      this.sprints = sprints;
    });
  }

  ngOnDestroy() : void {
    this.sub.unsubscribe();
  }

  unassign() {
    this.userStoryService.updateField(this.userStory['id'], {sprintId: null});
    this.dialog.closeAll();
  }

  save() {
    if(!this.selected)
      alert('Please make a choice!');
    else {
      this.userStoryService.updateField(this.userStory['id'], {sprintId: this.selected});
      this.dialog.closeAll();
    }
  }

}
