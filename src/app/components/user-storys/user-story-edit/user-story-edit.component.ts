import {Component, Inject, Input, OnInit} from '@angular/core';
import {ProjectsService} from "../../../services/projects.service";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {UserStoryService} from "../../../services/user-story.service";

@Component({
  selector: 'app-user-story-edit',
  templateUrl: './user-story-edit.component.html',
  styleUrls: ['./user-story-edit.component.css']
})
export class UserStoryEditComponent implements OnInit {

  project: any;
  userStory: any;

  @Input() title: string;
  @Input() description: string;
  @Input() owner: string;
  @Input() storyPoints: number;


  constructor(private projectsService: ProjectsService, private userStoryService: UserStoryService,
              public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    // TODO: Load existing project values into Input fields
    this.getUserStory();
  }
  //
  // getProject() {
  //   // Get the project from the id passed onto the Material Dialog
  //   this.project = this.projectsService.get(this.data.id)
  //     .subscribe(res => {
  //       this.project = res;
  //     });
  // }
  //
  getUserStory(){
    // Get the user story from the id passed onto the Material Dialog
    this.userStory = this.userStoryService.get(this.data.id)
      .subscribe(res => {
        this.userStory = res;
      });
  }

  update() {
    const userStory = {
      title: this.title,
      description: this.description,
      storyPoints: this.storyPoints
      // owner: this.owner,
    };
    this.userStoryService.update(this.data.id, userStory);
    this.dialog.closeAll();
  }

}
