import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Project } from '../interfaces/project';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private snackbar: MatSnackBar,
              private afStore: AngularFirestore, 
              private userService: UserService) { }

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
    return this.afStore.collection('projects')
                        .valueChanges({ idField: 'id' });
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

  /**
   * Archives a Project by setting the isArchived boolean.
   *
   * @param id - The ID of the Project to be (un)archived
   * @param archive - whether or not it must be archived
   */
  archive(id: string, archive: boolean) {

    var project = this.afStore.collection('projects').doc(id);

    // Set the "isArchived" field of the project
    return project.update({ isArchived: archive })
    .then(res => {
      this.snackbar.open('Successfully ' + (archive ? 'archived' : 'recovered') + '  project!', 'Close', {
        duration: 5000,
      });
    })
    .catch(res => {
      // The document probably doesn't exist.
      console.error(res);
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

  addMember(uid: string, selected: string, projectId: string) {
    throw new Error("Method not implemented.");
  }

}
