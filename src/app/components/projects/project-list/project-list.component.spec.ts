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

import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ProjectsComponent', () => {
  let component: ProjectListComponent;
  let fixture: ComponentFixture<ProjectListComponent>;

  let serviceStub: any;

  beforeEach(async(() => {

    serviceStub = {
      getAll: () => of([{
        id: 'xxx1',
        description: 'This is a description.',
        isArchived: false,
        members: [
          {role: 'Owner', uid: 'asfddasf'},
          {role: 'Owner', uid: 'asfddasf'},
        ],
        name: 'Example project',
        owner: 'Administrator',
        status: 'In Progress'
      }])
    };

    TestBed.configureTestingModule({
      declarations: [ ProjectListComponent ],
      imports: [  RouterModule.forRoot([]),
                  BrowserAnimationsModule,
                  MatSnackBarModule,
                  MatDialogModule,
                  AngularFireModule.initializeApp(firebaseConfig),
                  AngularFireAuthModule,
                  AngularFirestoreModule,
                  MatExpansionModule
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
  });

  it(`should display the project's title`, async () => {
    const headerTitle = document.querySelector('mat-expansion-panel-header mat-panel-title')
                                .textContent;
    expect(headerTitle).toContain('Example project');
  });

  it(`should display the project's status`, async () => {
    const headerStatus = document.querySelector('mat-expansion-panel-header mat-panel-description')
                                 .textContent;
    expect(headerStatus).toContain('In Progress');
  });

  // it(`should display the project's description`, async () => {
  //   const description = document.querySelector('.description').textContent;
  //   expect(description).toContain('This is a description.');
  // });

  // it(`should have two members`, async () => {
  //   const chips = document.getElementsByClassName('member').length;
  //   expect(chips).toBe(2);
  // })

});
