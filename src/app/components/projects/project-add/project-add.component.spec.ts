import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectAddComponent } from './project-add.component';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { firebaseConfig } from 'src/environments/environment';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

describe('ProjectAddComponent', () => {
  let component: ProjectAddComponent;
  let fixture: ComponentFixture<ProjectAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectAddComponent, CdkTextareaAutosize ],
      imports: [ RouterModule.forRoot([]), 
      AngularFireModule.initializeApp(firebaseConfig),
      MatDialogModule, MatSnackBarModule ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
