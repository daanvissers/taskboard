import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserStory } from '../interfaces/user-story';
import { Moment } from 'moment';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BurndownChartService {

  constructor(private afStore: AngularFirestore) { }

  getBySprint(sprintId: string): Observable<UserStory[]> {
    return this.afStore.collection<UserStory>('user-storys', ref => ref
                        .where('sprintId', '==', sprintId))
                        .valueChanges({ idField: 'id' });
  }

  getDoneUserStorys(sprintId: string): Observable<UserStory[]> {
    return this.afStore.collection<UserStory>('user-storys', ref => ref
                        .where('sprintId', '==', sprintId)
                        .where('status', '==', 'Done'))
                        .valueChanges({idField: 'id'});
  }

  getSprintRange(startDate: Moment, endDate: Moment) {
    let dates = [];

    let currDate = startDate.startOf('day');
    let lastDate = endDate.startOf('day');

    dates.push(currDate.clone());
    while(currDate.add(1, 'days').diff(lastDate) < 0) {
        dates.push(currDate.clone());
    }
    dates.push(lastDate.clone());
    return dates;
  }
}
