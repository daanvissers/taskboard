import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  @Input() email: string;
  @Input() name: string;
  @Input() password: string;
  @Input() repeat: string;

  constructor() { }

  ngOnInit(): void {
  }

  signUp(email: string, name: string, password: string, repeat: string) {
    // Actual sign up process here...
  }
}
