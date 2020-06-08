import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { firebaseConfig } from '../environments/environment';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AuthenticationService } from './services/authentication.service';
import { LandingComponent } from './components/landing/landing.component';
import { ProjectListComponent } from './components/projects/project-list/project-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MaterialModule } from './modules/material/material.module';
import { ProjectAddComponent } from './components/projects/project-add/project-add.component';
import { ProjectDetailsComponent } from './components/projects/project-details/project-details.component';
import { ProjectEditComponent } from './components/projects/project-edit/project-edit.component';
import { ProjectArchiveComponent } from './components/projects/project-archive/project-archive.component';
import { SprintAddComponent } from './components/sprints/sprint-add/sprint-add.component';
import { SprintDetailsComponent } from './components/sprints/sprint-details/sprint-details.component';
import { UserStoryAddComponent } from './components/user-storys/user-story-add/user-story-add.component';
import { UserStoryDetailsComponent } from './components/user-storys/user-story-details/user-story-details.component';
import { SprintEditComponent } from './components/sprints/sprint-edit/sprint-edit.component';
import { ProjectMemberAddComponent } from './components/projects/project-member-add/project-member-add.component';
import { UserStoryListComponent } from './components/user-storys/user-story-list/user-story-list.component';
import { UserStoryEditComponent } from './components/user-storys/user-story-edit/user-story-edit.component';
import { UserStoryArchiveComponent } from './components/user-storys/user-story-archive/user-story-archive.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    SignInComponent,
    SignUpComponent,
    LandingComponent,
    ProjectListComponent,
    ProjectAddComponent,
    ProjectDetailsComponent,
    ProjectEditComponent,
    ProjectArchiveComponent,
    SprintAddComponent,
    SprintDetailsComponent,
    UserStoryAddComponent,
    UserStoryDetailsComponent,
    SprintEditComponent,
    ProjectMemberAddComponent,
    UserStoryListComponent,
    UserStoryEditComponent,
    UserStoryArchiveComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
