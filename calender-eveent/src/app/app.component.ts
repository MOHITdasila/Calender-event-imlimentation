import { AuthService } from './auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    public auth: AuthService,
  ) {

  }
  addEventCalender() {
    console.log('dafdafs');
    this.auth.listUpcomingEvents();
  }
  signIn() {
    this.auth.handleAuthClick();
  }
  signOut() {
    this.auth.handleSignoutClick();
  }
}
