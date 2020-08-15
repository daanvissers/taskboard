import { TestBed } from '@angular/core/testing';

import { ProjectsService } from './projects.service';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

const input = {
  description: 'sadfsda',
  isArchived: false,
  members: [
    {role: 'Owner', uid: 'asfddasf'},
    {role: 'Owner', uid: 'asfddasf'},
  ],
  name: 'asdfadsf',
  owner: 'asfasdf',
  status: 'In Progress'
};

const data = Observable.create(input);

const collectionStub = {
  valueChanges: jasmine.createSpy('valueChanges').and.returnValue(data)
}

const angularFiresotreStub = {
  collection: jasmine.createSpy('collection').and.returnValue(collectionStub)
}

describe('ProjectsService', () => {
  let service: ProjectsService;
  let angularFirestore: AngularFirestore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProjectsService,
        { provide: AngularFirestore, useValue: angularFiresotreStub }
      ]
    });
    service = TestBed.inject(ProjectsService);
    angularFirestore = TestBed.get(AngularFirestore);
  });

});
