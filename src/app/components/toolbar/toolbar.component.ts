import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignInComponent } from '../sign-in/sign-in.component';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(public dialog: MatDialog, public authService: AuthenticationService,
              public router: Router) { }

  ngOnInit(): void {
  }

  openLogin() {
    const dialogRef = this.dialog.open(SignInComponent, {
      height: '400px',
      width: '300px',
    });
  }

  signOut() {
    this.authService.signOut();
  }

  navigateHome() {
    this.router.navigate(['']);
  }
}
