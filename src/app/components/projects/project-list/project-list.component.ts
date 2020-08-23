import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProjectAddComponent } from '../project-add/project-add.component';
import { ProjectsService } from 'src/app/services/projects.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { Project } from 'src/app/interfaces/project';
import { ProjectEditComponent } from '../project-edit/project-edit.component';
import { ProjectMemberAddComponent } from '../project-member-add/project-member-add.component';
import { ProjectMemberEditComponent } from '../project-member-edit/project-member-edit.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  projects: any;
  selectedProject: any;

  constructor(public dialog: MatDialog, private projectsService: ProjectsService,
              private userService: UserService, private auth: AuthenticationService) { }

  ngOnInit(): void {
    this.projects = this.projectsService.getAll();
    
    // Promise gets fulfilled when user selects a Project
    this.selectedProject = new Promise<Project>(null);
  }

  openCreate() {
    this.dialog.open(ProjectAddComponent, {
      height: '360px',
      width: '500px'
    });
  }

  editProject(id: string) {
    this.dialog.open(ProjectEditComponent, {
      width: '450px',
      height: '400px',
      data: { id: id, project: this.selectedProject },
    });
  }

  deleteProject(id: string) {
    this.projectsService.delete(id);
  }

  archiveProject(id: string) {
    this.projectsService.archive(id, true);
  }

  addMember(projectId: string) {
    this.dialog.open(ProjectMemberAddComponent, {
      width: '450px',
      height: '400px',
      data: {
        id: projectId
      }
    });
  }

  editMember(memberId: string, oldrole: string) {
    if(this.selectedProject.canEdit) {
      this.dialog.open(ProjectMemberEditComponent, {
        width: '450px',
        height: '250px',
        data: { 
          id: memberId,
          projectId: this.selectedProject.id,
          oldrole: oldrole
        }
      });
    }
  }

  openProject(project: Project) {
    this.selectedProject = project;

    // Retrieve the owner's User object
    const uid = this.selectedProject.owner;
    this.selectedProject.ownerUser = this.userService.getUser(uid);

    // Retrieve the Project's Members as Users
    this.selectedProject.members.forEach(member => {
        member.user = this.userService.getUser(member.uid);
    });

    // Determine whether the currently logged in user can edit
    let canEdit = (this.selectedProject.members
                            .map(x => x.uid)
                            .includes(this.auth.userData.uid));

    // Viewers can't edit Projects
    const user = this.selectedProject.members.find(this.findViewer);
    if (user != null && user.uid === this.auth.userData.uid) {
      canEdit = false;
    }

    // Overwrite canEdit if the logged in user is the owner
    if (this.auth.userData.uid === this.selectedProject.owner)
      canEdit = true;   

    this.selectedProject.canEdit = canEdit;
  }

  findViewer(user) {
    return user.role === 'Viewer';
  }

}
