import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from "../interfaces/user";

import { flatMap, filter, map, switchMap, zip } from 'rxjs/operators';
import { Observable, observable, combineLatest, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private afStore: AngularFirestore) { }

  /**
   * Returns an Observable of type User by given ID.
   *
   * @param id - The ID of the desired User
   * @returns An Observable of type User
   */
  getUser(id: string): Observable<User> {
    return this.afStore.doc<User>('users/' + id).valueChanges();
  }

  getAll() {
    return this.afStore.collection('users').snapshotChanges();
  }

  search(displayName: string) {
    return this.afStore.collection('users', ref => ref
                        .orderBy("displayName")
                        .startAt(displayName)
                        .endAt(displayName)
    ).valueChanges();               
  }

}
