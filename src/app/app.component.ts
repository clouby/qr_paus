import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '+';

  constructor( private authService:AuthService ) {}

  get isLoggedIn() {
    return this.authService.isLoggedIn;
  }

  get fullName() {
    return this.authService.current_user.full_name;
  }

  logOut() {
    this.authService.logOut();
  }
}
