import {Component, Input, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  @Input() email: string;
  @Input() password: string;
  @Input() repeat: string;

  constructor(public authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  signUp(email: string, password: string, repeat: string) {
    if (password !== repeat) {
      alert('Passwords invalid: Please make sure the passwords match!');
    } else {
      this.authService.signUp(email, password);
    }
  }
}
