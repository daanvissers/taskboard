import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Project } from '../interfaces/project';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sprint } from "../interfaces/sprint";

@Injectable({
  providedIn: 'root'
})
export class SprintsService {

  constructor(private authService: AuthenticationService, private snackbar: MatSnackBar,
              private afStore: AngularFirestore) { }

  create(sprint: Sprint) {
    return new Promise<any>((resolve, reject) => {
      this.afStore.collection('sprints')
        .add(sprint)
        .then(res => {
          // Show 'snackbar' message that it was a success
          this.snackbar.open('Successfully created sprint!', 'Close', {
            duration: 5000,
          });
        }, err => reject(err));
    });
  }

  get(id: string) {
    return this.afStore.collection('sprints').doc(id).valueChanges();
  }

  getAll() {
    return this.afStore.collection('sprints').snapshotChanges();
  }

  // Gets a collection of Sprints by Project ID
  getByProject(id: string) {
    return this.afStore.collection('sprints', ref =>
      ref.where('projectId', '==', id)
    ).snapshotChanges();
  }

  delete(id: string) {
    return this.afStore.collection('sprints').doc(id).delete()
      .then(res => {
        this.snackbar.open('Successfully deleted sprint!', 'Close', {
          duration: 5000
        });
      });
  }

  makeSprintsDeactivated(){
    //TODO set all sprints where project ID equals current project ID to false
    //TODO this way there will always be only 1 sprint active
  }

  makeActive(id: string) {

    this.makeSprintsDeactivated();
    var sprint = this.afStore.collection('sprints').doc(id);

    // Set the "isArchived" field of the project
    return sprint.update({
      isActive: true
    })
      .then(function() {
        console.log("Sprint successfully made active!");
      })
      .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating sprint: ", error);
      });

  }

}
