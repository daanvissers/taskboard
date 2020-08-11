import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProjectsService} from "../../../services/projects.service";
import {MatDialog} from "@angular/material/dialog";
import {SprintsService} from "../../../services/sprints.service";
import {UserStoryService} from "../../../services/user-story.service";
import {UserStoryAddComponent} from "../user-story-add/user-story-add.component";
import {UserStoryEditComponent} from "../user-story-edit/user-story-edit.component";
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserStoryAssignComponent } from '../user-story-assign/user-story-assign.component';
import { UserStory } from 'src/app/interfaces/user-story';


@Component({
  selector: 'app-user-story-list',
  templateUrl: './user-story-list.component.html',
  styleUrls: ['./user-story-list.component.css']
})
export class UserStoryListComponent implements OnInit {

  project: any;
  userStorys: any;
  projectId: string;
  uid: string;

  constructor(private route: ActivatedRoute, private projectsService: ProjectsService,
              public dialog: MatDialog, private sprintsService: SprintsService,
              private userStorysService: UserStoryService,
              private auth: AuthenticationService)
  {
    this.projectId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getProject();
    this.getUserStorys(this.projectId)
  }

  ngAfterInit(): void {
    this.uid = this.auth.userData.uid;
  }

  getProject() {
    this.project = this.projectsService.get(this.projectId).subscribe(res => {
      this.project = res;
    });
  }

  openCreate() {
    if (this.isAuthorized()) {
      this.dialog.open(UserStoryAddComponent, {
        height: '500px',
        width: '600px',
        data: { 
          projectId: this.projectId,
          sprintId: null // Choose to assign Sprint later
        }
      });
    } else {
      alert(`You don't belong in this project!`);
    }
    
  }

  getUserStorys(projectId: string){
    this.userStorys = this.userStorysService.getByProject(projectId);
  }

  editUserStory(id: string) {
    if (this.isAuthorized()) {
      this.dialog.open(UserStoryEditComponent, {
        width: '450px',
        height: '400px',
        data: { id: id },
      });
    } else {
      alert(`You don't belong in this project!`);
    }
  }

  deleteUserStory(id: string) {
    if(this.isAuthorized())
      this.userStorysService.delete(id);
    else
      alert(`You don't belong in this project!`);
  }

  archiveUserStory(id: string) {
    if(this.isAuthorized())
      this.userStorysService.archive(id, true);
    else
      alert(`You don't belong in this project!`);
  }

  assignSprint(userStory: UserStory) {
    if (this.isAuthorized()) {
      this.dialog.open(UserStoryAssignComponent, {
        width: '450px',
        height: '250px',
        data: { userStory: userStory },
      });
    } else {
      alert(`You don't belong in this project!`);
    }
  }

  isAuthorized(): boolean {
    // Determine whether the currently logged in user is a member
    let canEdit = (this.project.members
      .map(x => x.uid)
      .includes(this.auth.userData.uid));

    // Overwrite canEdit if the logged in user is the owner
    if (this.auth.userData.uid === this.project.owner) {
      canEdit = true;
    }
    return canEdit;
  }

}
