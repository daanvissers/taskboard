import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectListComponent } from './components/projects/project-list/project-list.component';
import { LandingComponent } from './components/landing/landing.component';
import { AuthGuard } from './guards/auth.guard';
import { ProjectDetailsComponent } from './components/projects/project-details/project-details.component';
import {ProjectEditComponent} from "./components/projects/project-edit/project-edit.component";

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'projects', component: ProjectListComponent, canActivate: [AuthGuard]},
  { path: 'projects/:id', component: ProjectDetailsComponent, canActivate: [AuthGuard]},
  { path: 'projects/edit/:id', component: ProjectEditComponent, canActivate: [AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
