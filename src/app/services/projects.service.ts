import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { UserService } from './user.service';
import { Project } from '../interfaces/project';
import { User } from '../interfaces/user';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';

import { flatMap, filter, map, switchMap, zip } from 'rxjs/operators';
import { Observable, observable, combineLatest, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private authService: AuthenticationService, private snackbar: MatSnackBar,
              private afStore: AngularFirestore, private userService: UserService) { }

  create(project: Project) {
    return new Promise<any>((resolve, reject) => {
      this.afStore.collection('projects')
        .add(project)
        .then(res => {
          // Show 'snackbar' message that it was a success
          this.snackbar.open('Successfully created project!', 'Close', {
            duration: 5000,
          });
        }, err => reject(err));
    });
  }

  getAll() {
    return this.afStore.collection('projects').valueChanges();
  }

  get(id: string) {
    return this.afStore.collection('projects').doc(id).valueChanges();
  }

  delete(id: string) {
    return this.afStore.collection('projects').doc(id).delete()
      .then(res => {
        this.snackbar.open('Successfully deleted project!', 'Close', {
          duration: 5000
        });
    });
  }

  archive(id: string) {

    var project = this.afStore.collection('projects').doc(id);

    // Set the "isArchived" field of the project
    return project.update({
        isArchived: true
    })
    .then(function() {
        console.log("Project successfully updated!");
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating project: ", error);
    });

  }

  update(id: string, project: any){
    var proj = this.afStore.collection('projects').doc(id);

    return proj.update(project).then(function() {
      console.log("Project successfully updated!");
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating project: ", error);
    });
  }

  getProjectMembers(project: Project) {

    let members = [];

    if(project.members.length) {
      project.members.forEach(member => {
          let usr = this.userService.getUser(member['user']);
          members.push(usr);
      });
    } else {
      console.log("The array is empty");
    }

    return members;
  }

}
