import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from "../interfaces/user";

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private afStore: AngularFirestore) { }

  /**
   * Returns an Observable of type User by given ID.
   *
   * @param id - The ID of the desired User
   * @returns - An Observable of type User
   */
  getUser(id: string): Observable<User> {
    return this.afStore.doc<User>('users/' + id).valueChanges();
  }

  getAll() {
    return this.afStore.collection('users').snapshotChanges();
  }

  /**
   * Return the User belonging to the given displayName.
   * Limit is set to 1, in case there are users with same name.
   * 
   * @param displayName - The displayName to search the user by
   * @returns - Observable with Users
   */
  search(displayName: string): Observable<User> {
    return this.afStore.collection<User>('users', ref => ref
                        .where('displayName', '==', displayName)
                        .limit(1)
    ).valueChanges()
    .pipe(
      map(users => {
        return users[0];
      })
    );
  }

}
