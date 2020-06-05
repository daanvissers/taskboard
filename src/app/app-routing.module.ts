import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectListComponent } from './components/projects/project-list/project-list.component';
import { LandingComponent } from './components/landing/landing.component';
import { AuthGuard } from './guards/auth.guard';
import { ProjectDetailsComponent } from './components/projects/project-details/project-details.component';
import {ProjectEditComponent} from "./components/projects/project-edit/project-edit.component";
import {ProjectArchiveComponent} from "./components/projects/project-archive/project-archive.component";
import {SprintDetailsComponent} from "./components/sprints/sprint-details/sprint-details.component";
import {UserStoryListComponent} from "./components/user-storys/user-story-list/user-story-list.component";
import {UserStoryArchiveComponent} from "./components/user-storys/user-story-archive/user-story-archive.component";

const routes: Routes = [
  { path: '', component: LandingComponent },

  { path: 'projects', component: ProjectListComponent, canActivate: [AuthGuard]},
  { path: 'projects/archived', component: ProjectArchiveComponent, canActivate: [AuthGuard]},
  { path: 'projects/:id', component: ProjectDetailsComponent, canActivate: [AuthGuard]},
  { path: 'projects/edit/:id', component: ProjectEditComponent, canActivate: [AuthGuard]},

  { path: 'sprints/:id1/:id2', component: SprintDetailsComponent, canActivate: [AuthGuard]},

  { path: 'user-stories/:id', component: UserStoryListComponent, canActivate: [AuthGuard]},
  { path: 'user-stories/archived/:id', component: UserStoryArchiveComponent, canActivate: [AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
