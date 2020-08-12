import { Component, OnInit, Inject } from '@angular/core';
import { ChartType } from 'angular-google-charts';
import { Sprint } from 'src/app/interfaces/sprint';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BurndownChartService } from 'src/app/services/burndown-chart.service';
import { Subscription, Observable } from 'rxjs';
import * as moment from 'moment';
import { Moment } from 'moment';
import { UserStoryService } from 'src/app/services/user-story.service';
import { UserStory } from 'src/app/interfaces/user-story';

@Component({
  selector: 'app-burndown-chart',
  templateUrl: './burndown-chart.component.html',
  styleUrls: ['./burndown-chart.component.css']
})
export class BurndownChartComponent implements OnInit {

  chartType: ChartType = ChartType.LineChart;

  chartData = [

    // Day Done IdealDone PointsFinished IdealPointsFinished
    ['1', 8136000, 8136000],
    ['2', 8538000, 8136000],
    ['3', 2244000, 8136000],
    ['4', 3470000, 8136000],
    ['5', 19500000, 8136000],
    ['6', 19500000, 8136000],
    ['7', 19500000, 8136000],
    ['8 ', 19500000, 8136000],
  ];

  chartColumns = ['Day', 'Storys Left', 'Ideal Story Progress'];

  sprint: Sprint;
  sprintId: string;
  sprintDays: Moment[];

  userStories: any;
  sub: Subscription;

  totalSP: any;
  amountDays: any;
  idealProgress: any;

  constructor(public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public dialogData: any,
              private burndownChart: BurndownChartService) {
    this.sprint = this.dialogData.sprint;
    this.sprintId = this.dialogData.sprintId;

    // Replace timestamps with Moment object
    this.sprint.startDate = moment(this.sprint.startDate['seconds'] * 1000);
    this.sprint.endDate = moment(this.sprint.endDate['seconds'] * 1000);

    // Get all days in this Sprint
    this.sprintDays = this.burndownChart.getSprintRange(this.sprint.startDate, this.sprint.endDate);
  }

  ngOnInit(): void {

    this.chartData = [];

    const amountDays = this.sprintDays.length;
    this.sub = this.burndownChart.getUserStoriesBySprint(this.sprintId).subscribe(stories => {
      
      /* Calculate amount of total SP */
      let totalStoryPoints = 0;
      stories.forEach(story => {
        totalStoryPoints += story.storyPoints;
      });
      console.log("Total amount of SP for this sprint: " + totalStoryPoints);
      this.totalSP = totalStoryPoints;

      /* Calculate amount of days in Sprint */
      console.log("Sprint length in days: " + amountDays);
      this.amountDays = amountDays;

      /* Calculate ideal progress */
      const idealProgress = Math.ceil(totalStoryPoints / amountDays);
      console.log("To finish in time, you should finish per day: " +
      idealProgress);
      this.idealProgress = idealProgress;
      
      /* Start adding data to Google Chart */
      let leftoverSP = totalStoryPoints;
      for (let i = 0; i < this.sprintDays.length; i++) {

        if(leftoverSP > 0) {
          leftoverSP -= idealProgress;
        }

        this.chartData.push([
          // Day
          this.sprintDays[i].format("MMM Do"), 
          // Done
          0,
          // Ideal
          leftoverSP,
        ]);
      }
      
    });
    
  }

  ngOnDestroy(): void {
    if(this.sub) {
      this.sub.unsubscribe();
    }
  }
}
