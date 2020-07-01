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
    for (let i = 0; i < this.sprintDays.length; i++) {
      this.chartData.push( [this.sprintDays[i].format("MMM Do"), 0, 0] );
    }
    
  }

  ngOnDestroy(): void {
  }

}
