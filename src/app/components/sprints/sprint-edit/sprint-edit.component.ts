import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Sprint } from 'src/app/interfaces/sprint';
import { SprintsService } from 'src/app/services/sprints.service';
import { FormControl } from '@angular/forms';
import { Moment } from 'moment';

@Component({
  selector: 'app-sprint-edit',
  templateUrl: './sprint-edit.component.html',
  styleUrls: ['./sprint-edit.component.css']
})
export class SprintEditComponent implements OnInit {

  sprint: any;
  todayDate: Date = new Date();
  
  @Input() title: string;
  @Input() description: string;
  @Input() startDate: any;
  @Input() endDate: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialog: MatDialog,
              private sprintService: SprintsService) 
  {
    this.startDate = this.data.sprint.startDate.toDate();
    this.endDate = this.data.sprint.endDate.toDate();
  }

  ngOnInit(): void {
    this.sprint = this.data.sprint;
    this.title = this.sprint.title;
    this.description = this.sprint.description;
  }

  edit() {
    const sprint: Sprint = {
      title: this.title,
      description: this.description,
      startDate: this.startDate,
      endDate: this.endDate,
      projectId: this.sprint.projectId,
      isActive: this.sprint.isActive,
    };
    console.log(this.sprint);
    // Use the service to create sprint on FireBase
    this.sprintService.update(this.data.sprintId, sprint);
    this.dialog.closeAll();
  }

}
