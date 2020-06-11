import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Project } from '../interfaces/project';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sprint } from "../interfaces/sprint";
import { map } from 'rxjs/operators';

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

  update(id: string, sprint: Sprint) {
    let spr = this.afStore.collection('sprints').doc(id);

    return spr.update(sprint).then(res => {
      this.snackbar.open('Sprint succesfully updated!', 'Close', {
        duration: 5000,
      });
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating project: ", error);
    });
  }

  // Gets a collection of Sprints by Project ID
  getByProject(id: string) {
    return this.afStore.collection('sprints', ref =>
      ref.orderBy('startDate', 'asc').where('projectId', '==', id)
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

  activate(id: string, projectId: string) {

    // First, deactivate all potentially active Sprints
    this.afStore.collection("sprints", ref => ref
    .where('projectId', '==', projectId))
    .get().toPromise().then(function(sprints) {
      
      // Make each Sprint inactive
      sprints.forEach(function(sprint) {
          if(sprint.id !== id)
            sprint.ref.update({ isActive: false });
      });
    });

    // Make the desired Sprint active
    this.afStore.collection('sprints').doc(id).update({ isActive: true })
      .then(res => {this.snackbar.open('This sprint is now active.', 'Close', {
        duration: 5000
      })});
  }
}
