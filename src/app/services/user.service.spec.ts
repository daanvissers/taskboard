import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { firebaseConfig } from 'src/environments/environment';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([]), AngularFireModule.initializeApp(firebaseConfig),]
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
