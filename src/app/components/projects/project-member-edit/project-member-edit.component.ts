import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';
import { Observable } from 'rxjs';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-project-member-edit',
  templateUrl: './project-member-edit.component.html',
  styleUrls: ['./project-member-edit.component.css']
})
export class ProjectMemberEditComponent implements OnInit {

  public member: Observable<User>;
  public selected: string;
  public oldrole: string;
  public roles = [
    { viewValue: 'Owner' },
    { viewValue: 'Contributor' },
    { viewValue: 'Viewer' }
  ];

  constructor(public dialog: MatDialog,
              private snackbar: MatSnackBar,
              private userService: UserService,
              private projectsService: ProjectsService,
              @Inject(MAT_DIALOG_DATA) public data: any) 
  { }

  ngOnInit(): void {
    this.member = this.userService.getUser(this.data.id);
    this.oldrole = this.data.oldrole;
  }

  save() {
    this.dialog.closeAll();
    this.projectsService.editMember(this.data.id, this.data.projectId, this.selected, this.oldrole);
  }

  removeMember() {
    // 
  }

}
