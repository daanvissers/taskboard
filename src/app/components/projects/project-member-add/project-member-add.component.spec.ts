import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectMemberAddComponent } from './project-member-add.component';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { firebaseConfig } from '../../../../environments/environment';
import { RouterModule } from '@angular/router';

describe('ProjectMemberAddComponent', () => {
  let component: ProjectMemberAddComponent;
  let fixture: ComponentFixture<ProjectMemberAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectMemberAddComponent ],
      imports: [  RouterModule.forRoot([]),
                  MatSnackBarModule,
                  MatDialogModule,
                  AngularFireModule.initializeApp(firebaseConfig),
                  AngularFireAuthModule,
                  AngularFirestoreModule, 
                ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectMemberAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
