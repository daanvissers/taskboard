import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignInComponent } from '../sign-in/sign-in.component';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @ViewChild('sidenav') sidenav: MatSidenav;
  open: boolean;

  constructor(public dialog: MatDialog, 
              public authService: AuthenticationService,
              public router: Router) 
  {
    this.open = false;
  }

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
    this.closeNav();
    this.router.navigate(['']);
  }

  closeNav() {
    this.sidenav.close();
    this.open = false;
  }

  openNav() {
    this.sidenav.open();
    this.open = true;
  }

  toggleNav() {
    if(this.sidenav.opened) {
      this.sidenav.close();
    } else {
      this.sidenav.open();
    }
  }
}
