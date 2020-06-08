import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SprintsService} from "../../../services/sprints.service";
import {UserStoryService} from "../../../services/user-story.service";

@Component({
  selector: 'app-user-story-details',
  templateUrl: './user-story-details.component.html',
  styleUrls: ['./user-story-details.component.css']
})
export class UserStoryDetailsComponent implements OnInit {

  @Input() story: any;
  public userStory: any;

  constructor(private route: ActivatedRoute, private userStoryService: UserStoryService) { }

  ngOnInit(): void {
    this.getUserStory()
  }

  getUserStory() {
    //
  }

}
