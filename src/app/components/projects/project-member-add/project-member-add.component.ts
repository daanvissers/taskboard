import { Component, OnInit, Input, Inject } from '@angular/core';
import { ProjectsService } from 'src/app/services/projects.service';
import { UserService } from 'src/app/services/user.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-project-member-add',
  templateUrl: './project-member-add.component.html',
  styleUrls: ['./project-member-add.component.css']
})
export class ProjectMemberAddComponent implements OnInit {

  @Input() displayName: string;
  projectId: string;
  selected: string;
  foundUser: any;
  uid: string;
  disabled: boolean = false;

  roles = [
    {viewValue: 'Owner'},
    {viewValue: 'Contributor'},
    {viewValue: 'Viewer'}
  ];

  constructor(private projectsService: ProjectsService, private userService: UserService,
              public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.projectId = this.data.id;
  }

  searchMember(displayName: string) {

    if(displayName.length) {
      this.foundUser = this.userService.search(displayName);
      this.disabled = false;
    }
    
  }

  addMember() {
    this.projectsService.addMember(this.uid, this.selected, this.projectId);
  }

}
