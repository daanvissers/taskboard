import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private afStore: AngularFirestore) { }

  getUser(id: string) {
    return this.afStore.collection('users').doc(id).valueChanges();
  }

  getAll() {
    return this.afStore.collection('users').snapshotChanges();
  }

  getMultiple() {
    //
  }

}
