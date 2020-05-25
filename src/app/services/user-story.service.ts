import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Project } from '../interfaces/project';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Sprint} from "../interfaces/sprint";
import {UserStory} from "../interfaces/user-story";
import * as firebase from "firebase";

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

  get(id: string) {
    return this.afStore.collection('user-storys').doc(id).valueChanges();
  }

  getAll() {
    return this.afStore.collection('user-storys').snapshotChanges();
  }

  // Gets a collection of User Stories by Project ID
  getByProject(id: string) {
    return this.afStore.collection('user-storys', ref =>
      ref.where('projectId', '==', id)
    ).snapshotChanges();
  }

  delete(id: string) {
    return this.afStore.collection('user-storys').doc(id).delete()
      .then(res => {
        this.snackbar.open('Successfully deleted User Story!', 'Close', {
          duration: 5000
        });
      });
  }

  update(id: string, userStory: any){
    var story = this.afStore.collection('user-storys').doc(id);

    return story.update(userStory).then(function() {
      console.log("User Story successfully updated!");
    })
      .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating User Story: ", error);
      });
  }



}
