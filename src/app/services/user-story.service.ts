import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Project } from '../interfaces/project';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Sprint} from "../interfaces/sprint";
import {UserStory} from "../interfaces/user-story";

@Injectable({
  providedIn: 'root'
})
export class UserStoryService {

  constructor(private authService: AuthenticationService, private snackbar: MatSnackBar,
              private afStore: AngularFirestore) { }

  create(userStory: UserStory) {
    return new Promise<any>((resolve, reject) => {
      this.afStore.collection('user-storys')
        .add(userStory)
        .then(res => {
          // Show 'snackbar' message that it was a success
          this.snackbar.open('Successfully created user story!', 'Close', {
            duration: 5000,
          });
        }, err => reject(err));
    });
  }

  // getUserStorysBySprint(string: sprintId){
  //   this.afStore.collection('user-storys').
  //
  // }

  getAll() {
    //TODO Zo maken dat de user story afhankelijk ophelaad worden van SprintID
    return this.afStore.collection('user-storys').snapshotChanges();
  }

}
