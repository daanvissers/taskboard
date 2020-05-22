import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { UserService } from './user.service';
import { Project } from '../interfaces/project';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';

import { flatMap, filter, map, switchMap } from 'rxjs/operators';
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
    const projectsCollection = this.afStore.collection<Project>('projects');
    const projects$ = projectsCollection.snapshotChanges().pipe(
      // Map together the Project details, the ID, and grab the Members
      map(values => values.map(obj => {
        let data = obj.payload.doc.data();  // Project details
        const id = obj.payload.doc.id;      // ID string

        let members = [];                   // Associated Members
        data.members.forEach(el => {
          if(el !== "") {
            this.userService.getUser(el).subscribe(res => {
              members.push(res);
            });
          }
        });
        // Replace the old array with only Member ID's with actual Users
        data.members = members;

        return { id, ...data };
      })),
    );

    return projects$;
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

}
