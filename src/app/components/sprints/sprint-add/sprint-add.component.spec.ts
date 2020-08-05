import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintAddComponent } from './sprint-add.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { firebaseConfig } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

describe('SprintAddComponent', () => {
  let component: SprintAddComponent;
  let fixture: ComponentFixture<SprintAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprintAddComponent, CdkTextareaAutosize ],
      imports: [RouterModule.forRoot([]), AngularFireModule.initializeApp(firebaseConfig),
      AngularFireAuthModule,
      AngularFirestoreModule, MatDialogModule, MatSnackBarModule ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
