import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Project } from '../interfaces/project';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Sprint} from "../interfaces/sprint";

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

  getAll() {
    //TODO Zo maken dat de sprints afhankelijk ophelaad worden van ProjectID
    return this.afStore.collection('sprints').snapshotChanges();
  }

  get(id: string) {
    return this.afStore.collection('sprints').doc(id).valueChanges();
  }

  delete(id: string) {
    return this.afStore.collection('sprints').doc(id).delete()
      .then(res => {
        this.snackbar.open('Successfully deleted sprint!', 'Close', {
          duration: 5000
        });
      });
  }
}
