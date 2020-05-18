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
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './modules/material/material.module';
import { ProjectAddComponent } from './components/projects/project-add/project-add.component';
import { ProjectDetailsComponent } from './components/projects/project-details/project-details.component';
import { ProjectEditComponent } from './components/projects/project-edit/project-edit.component';
import { ProjectArchiveComponent } from './components/projects/project-archive/project-archive.component';
import { SprintAddComponent } from './components/sprints/sprint-add/sprint-add.component';

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
    SprintAddComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    MaterialModule
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
