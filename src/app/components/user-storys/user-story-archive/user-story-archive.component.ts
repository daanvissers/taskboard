import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { UserStoryService } from "../../../services/user-story.service";
import { ProjectsService } from 'src/app/services/projects.service';
import { ActivatedRoute } from "@angular/router";
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-user-story-archive',
  templateUrl: './user-story-archive.component.html',
  styleUrls: ['./user-story-archive.component.css']
})
export class UserStoryArchiveComponent implements OnInit {

  userStorys: any;
  project: any;
  projectId: string;
  uid: string;

  constructor(private route: ActivatedRoute, private auth: AuthenticationService,
              public dialog: MatDialog, private userStorysService: UserStoryService,
              private projectsService: ProjectsService) {
    this.projectId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getProject();
    this.userStorys = this.userStorysService.getArchived(this.projectId);
  }

  ngAfterInit(): void {
    this.uid = this.auth.userData.uid;
  }

  getProject() {
    this.project = this.projectsService.get(this.projectId).subscribe(res => {
      this.project = res;
    });
  }

  recover(id: string) {
    if (this.isAuthenticated())
      // isActive: False
      this.userStorysService.archive(id, false);
    else
      alert(`You don't belong in this project!`);
  }

  isAuthenticated(): boolean {
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
