import { Component, OnInit, Input, Inject } from '@angular/core';
import { ProjectsService } from 'src/app/services/projects.service';
import { UserService } from 'src/app/services/user.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-project-member-add',
  templateUrl: './project-member-add.component.html',
  styleUrls: ['./project-member-add.component.css']
})
export class ProjectMemberAddComponent implements OnInit {

  @Input() displayName: string;
  selected: string;
  foundUser: any;
  uid: string;

  roles = [
    { viewValue: 'Owner' },
    { viewValue: 'Contributor' },
    { viewValue: 'Viewer' }
  ];

  constructor(private projectsService: ProjectsService, private userService: UserService,
              public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any,
              private snackbar: MatSnackBar) { }

  ngOnInit(): void {

  }

  searchMember(displayName: string) {
    this.foundUser = null;
    if(displayName)
      this.foundUser = this.userService.search(displayName);    
  }

  addMember(uid: string) {
    // If a user is found and a role has been selected...
    if (this.foundUser && this.selected) {
      this.projectsService.addMember(uid, this.selected, this.data.id);
      this.dialog.closeAll();
    }
    // If not, tell the user
    else {
      this.snackbar.open('Please make sure to choose a role and a user!', 'Close', {
        duration: 5000,
      });
    }
  }
}
