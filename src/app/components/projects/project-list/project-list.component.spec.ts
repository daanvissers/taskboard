import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectListComponent } from './project-list.component';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { AngularFireModule } from '@angular/fire';
import { firebaseConfig } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { ProjectsService } from 'src/app/services/projects.service';

describe('ProjectsComponent', () => {
  let component: ProjectListComponent;
  let fixture: ComponentFixture<ProjectListComponent>;

  let serviceStub: any;

  beforeEach(async(() => {

    serviceStub = {
      getAll: () => of([{
        description: 'sadfsda',
        isArchived: false,
        members: [
          {role: 'Owner', uid: 'asfddasf'},
          {role: 'Owner', uid: 'asfddasf'},
        ],
        name: 'asdfadsf',
        owner: 'asfasdf',
        status: 'In Progress'
      }])
    };

    TestBed.configureTestingModule({
      declarations: [ ProjectListComponent ],
      imports: [  RouterModule.forRoot([]),
                  MatSnackBarModule,
                  MatDialogModule,
                  AngularFireModule.initializeApp(firebaseConfig),
                  AngularFireAuthModule,
                  AngularFirestoreModule, 
                ],
      providers: [
        { provide: ProjectsService, useValue: serviceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(ProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  })

});
