import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import {UserStory} from "../interfaces/user-story";
import { Observable } from 'rxjs';
import { UserService } from './user.service';

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
    return this.afStore.collection('user-storys', ref => ref
                        .where('isArchived', '==', false))
                        .valueChanges({idField: 'id'});
  }

  /**
   * 
   * @param projectId - The ID of the Project you want the Archived 
   *                    User Stories of
   * @returns Observable<UserStory[]> Collection of UserStories
   */
  getArchived(projectId: string): Observable<UserStory[]> {
    return this.afStore.collection<UserStory>('user-storys', ref => ref
                        .where('projectId', '==', projectId)
                        .where('isArchived', '==', true))
                        .valueChanges({idField: 'id'});
  }

  /**
   * @param projectId - The ID of the Project to get the User Stories of
   * @returns Observable<UserStory[]> Collection of UserStories
   */
  getByProject(projectId: string): Observable<UserStory[]> {
    return this.afStore.collection<UserStory>('user-storys', ref => ref
                        .where('projectId', '==', projectId)
                        .where('isArchived', '==', false))
                        .valueChanges({idField: 'id'});
  }

  delete(id: string) {
    return this.afStore.collection('user-storys').doc(id).delete()
      .then(res => {
        this.snackbar.open('Successfully deleted User Story!', 'Close', {
          duration: 5000
        });
      });
  }

  /**
   * (Un)archives a User Story based on the passed boolean.
   * @param id The ID of the User Story that needs to be (un)archived
   * @param isArchived Boolean to set isArchived
   */
  archive(id: string, isArchived: boolean) {

    var userStory = this.afStore.collection('user-storys').doc(id);

    // Set the "isArchived" field of the project
    return userStory.update({
      isArchived: isArchived
    })
      .then(function() {
        console.log("User Story successfully updated!");
      })
      .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating User Story: ", error);
      });
  }


  update(id: string, userStory: any) {
    var story = this.afStore.collection('user-storys').doc(id);

    return story.update(userStory).then(function() {
      console.log("User Story successfully updated!");
    })
      .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating User Story: ", error);
      });
  }

  getBySprint(sprintId: string) {
    return this.afStore.collection('user-storys', ref => ref
                        .where('sprintId', '==', sprintId))
                        .valueChanges({ idField: 'id' });
  }
}
