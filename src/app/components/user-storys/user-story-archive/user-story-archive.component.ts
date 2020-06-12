import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { UserStoryService } from "../../../services/user-story.service";
import { ProjectsService } from 'src/app/services/projects.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-user-story-archive',
  templateUrl: './user-story-archive.component.html',
  styleUrls: ['./user-story-archive.component.css']
})
export class UserStoryArchiveComponent implements OnInit {

  userStorys: any;
  project: any;
  projectId: string;

  constructor(private route: ActivatedRoute,
              public dialog: MatDialog, private userStorysService: UserStoryService,
              private projectsService: ProjectsService) {
    this.projectId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getProject();
    this.userStorys = this.userStorysService.getArchived(this.projectId);
  }

  getProject() {
    this.project = this.projectsService.get(this.projectId).subscribe(res => {
      this.project = res;
    });
  }

  recover(id: string) {
    // isActive: False
    this.userStorysService.archive(id, false);
  }
}
