import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  /* Logged in User to use throughout application */
  userData: User;
  localUser: User;

  constructor(public afStore: AngularFirestore, 
              public afAuth: AngularFireAuth,
              public router: Router) 
  {

    /* Set local user variable if a user */
    if(localStorage.getItem('user') !== null) {
      this.localUser = JSON.parse(localStorage.getItem('user'));
    }

    /*  Save user in Local Store when user logs in, and set to null
        when user logs out.
     */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  signIn(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then(result => {
        this.router.navigate(['/projects']);
      }).catch(error => {
        alert(error);
      });
  }

  signUp(email, password, displayName) {
    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(result => {

        // Set displayName
        result.user.updateProfile({
          displayName: displayName
        });

        this.storeInDatabase(result.user, displayName);
        
      })
      .catch(error => {
        alert(error);
    });

    this.router.navigate(['/projects']);
  }

  /**
   * Apart from authenticating with the app, the user's details
   * must also be stored in Firebase Firestore as a User object.
   * @param user The User to be stored in the Database
   * @param displayName The display name for the User
   */
  storeInDatabase(user, displayName) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };

    return userRef.set(userData, {
      merge: true
    });
  }

  /*  Sign the User out by both setting User to null
      in Local Storage and signing out of AngularFireAuth
      */
  signOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.userData = null;
      this.router.navigate(['/']);
    });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null);
  }

}
