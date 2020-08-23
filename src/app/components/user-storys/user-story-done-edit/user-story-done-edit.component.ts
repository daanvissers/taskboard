import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UserStory } from 'src/app/interfaces/user-story';
import { UserStoryService } from 'src/app/services/user-story.service';

@Component({
  selector: 'app-user-story-done-edit',
  templateUrl: './user-story-done-edit.component.html',
  styleUrls: ['./user-story-done-edit.component.css']
})
export class UserStoryDoneEditComponent implements OnInit {

  @Input() date: any;
  startDate: any;
  endDate: any;
  story: UserStory;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private userStoryService: UserStoryService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.story = this.data.story;
    this.endDate = new Date(this.data.sprint.endDate.seconds * 1000);
    this.startDate = new Date(this.data.sprint.startDate.seconds * 1000);
  }

  update() {
    const date = new Date(this.date).getTime();
    this.userStoryService.updateField(this.story['id'], {doneAt: date});
    this.dialog.closeAll();
  }

}
