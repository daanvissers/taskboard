import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Project } from '../interfaces/project';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private snackbar: MatSnackBar,
              private afStore: AngularFirestore, 
              private userService: UserService,
              private authenticationService: AuthenticationService) { }

  create(project: Project) {

    // Add the owner as a project member
    project.members = [{role: 'Owner', uid: project.owner}];

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
    const userId = this.authenticationService.localUser.uid;

    // Create role variables for the 
    // limited Firestore array-contains-any query
    const contributor = { role: 'Contributor', uid: userId };
    const viewer = { role: 'Viewer', uid: userId };
    const owner = { role: 'Owner', uid: userId };

    return this.afStore.collection('projects', ref => ref
                        .where('members', 'array-contains-any',
                        [contributor, viewer, owner]))
                        .valueChanges({ idField: 'id' });
  }

  get(id: string) {
    return this.afStore.doc('projects/' + id).valueChanges();
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

    return proj.update(project).then(res => {
      this.snackbar.open('Project succesfully updated!', 'Close', {
        duration: 5000,
      });
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating project: ", error);
    });
  }

  /**
   * TODO: Document this function
   * 
   */
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

    // TODO: Check if member is already in project
    var project = this.afStore.collection('projects').doc(projectId);

    // Add member's uid and role to the member array in FireBase (as Map object).
    // With arrayUnion() it will be added to the end of the array 
    return project.update({
      members: firestore.FieldValue.arrayUnion({uid: uid, role: selected})
    })
    .then(res => {
      this.snackbar.open('Added member to the project!', 'Close', {
        duration: 5000,
      });
    })
    .catch(res => {
      // Something went wrong!
      console.error(res);
    });
  }

  editMember(uid: string, projectId: string, role: string, oldrole: string) {
    
    // Get the project
    const project = this.afStore.collection('projects').doc(projectId);

    console.log(uid + ' ' + oldrole);

    // Remove the old role
    project.update({
      members: firestore.FieldValue.arrayRemove({uid: uid, role: oldrole})
    });

    // Insert the new role
    project.update({
      members: firestore.FieldValue.arrayUnion({uid: uid, role: role})
    })
    .then(res => {
      this.snackbar.open(
        'The role ' + oldrole + ' was successfully changed to ' + role + '!', 
        'Close', {
        duration: 5000,
      });
    });

  }

  removeMember(uid: string, projectId: string, role: string) {
    // Get the project
    const project = this.afStore.collection('projects').doc(projectId);

    // Remove the member
    project.update({
      members: firestore.FieldValue.arrayRemove({uid: uid, role: role})
    })
    .then(res => {
      this.snackbar.open(
        'The member has been removed from the project!', 
        'Close', {
        duration: 5000,
      });
    });
  }
}
