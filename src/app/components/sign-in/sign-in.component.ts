import {Component, Input, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {SignUpComponent} from '../sign-up/sign-up.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  @Input() email: string;
  @Input() password: string;
  dialogRef: MatDialogRef<any>;

  constructor(dialogRef: MatDialogRef<SignInComponent>,
              public dialog: MatDialog) {
    this.dialogRef = dialogRef;
  }

  ngOnInit(): void {
  }

  login(email, password) {
    // Continue to login procedure...
  }

  openSignUpDialog() {
    this.dialogRef.close();
    const dialogRef = this.dialog.open(SignUpComponent, {
      height: '400px',
      width: '300px',
    });
  }
}
