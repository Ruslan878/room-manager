import { Component } from '@angular/core';
import { Router }            from '@angular/router';

import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})

export class LoginComponent {
  constructor(private authenticationService: AuthenticationService, private router: Router){}

  onSubmit($event: any, email: string, password: string) {
    this.authenticationService.login($event, email, password)
      .subscribe((result) => {
        if (result) {
          this.router.navigate(['rooms']);
        }
      });
  }
}
