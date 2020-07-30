import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


declare var gapi: any;
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // authorizeButton: Subject<any>;
  // signoutButton = true;
  constructor() {
    // this.authorizeButton = new Subject<any>();
    console.log('starts');
    this.initClient();
    // this.handleClientLoad();
  }

  //  clientId = '947334074275-57nprgl7ane0in2iok7s07sr2266sh4s.apps.googleusercontent.com';
  //  apiKey = 'AIzaSyBbA7Vl8nZy3fLOKbKXoVQZ4cKwubfTzwc';
  //  scopes = 'https://www.googleapis.com/auth/calendar';


  //   handleClientLoad() {
  //   console.log('clientLoad');
  //   gapi.client.setApiKey(this.apiKey);
  //   window.setTimeout(this.checkAuth, 1);
  //   this.checkAuth();
  // }

  // checkAuth() {
  //   console.log('checkAuth');
  //   gapi.auth.authorize({client_id: this.clientId, scope: this.scopes, immediate: true},
  //       this.handleAuthResult);
  // }

  //  handleAuthResult(authResult) {
  //   console.log('handle Auth result');
  //   if (authResult) {
  //     // this.authorizeButton.next(true);
  //     this.makeApiCall();
  //   } else {
  //     // this.authorizeButton.next(false);
  //     this.handleAuthClick();
  //    }
  // }

  //  handleAuthClick() {
  //   console.log('auth click');
  //   gapi.auth.authorize(
  //       {client_id: this.clientId, scope: this.scopes, immediate: false},
  //       this.handleAuthResult);
  //   // this.authorizeButton.next(false);
  // }

  //  makeApiCall() {
  //   console.log('make Api call');
  //   gapi.client.load('calendar', 'v3', () => {
  //     const request = gapi.client.calendar.events.list({
  //       calendarId: 'primary'
  //     });

  //     request.execute((resp) => {
  //       for (let i = 0; i < resp.items.length; i++) {
  //         console.log('generating event', resp.items[i].summary);
  //         // const li = document.createElement('li');
  //         // li.appendChild(document.createTextNode(resp.items[i].summary));
  //         // document.getElementById('events').appendChild(li);
  //       }
  //     });
  //   });
  // }


  initClient() {
    gapi.load('client', () => {
      console.log('client loaded');

      gapi.client.init({
        apiKey: 'AIzaSyCzlwafeBD5Vrj8PhufzFHSx_o0w1d-Ifc',
        clientId: '269795556932-utuvp6h8ke5vajtsg0a2qje5cem5i7lg.apps.googleusercontent.com',
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
        scope: 'https://www.googleapis.com/auth/calendar',
      }).then( () => {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);

        // Handle the initial sign-in state.
        // console.log(gapi.auth2.getAuthInstance().isSignedIn.get());
        // this.handleAuthClick();
        console.log('again', gapi.auth2.getAuthInstance().isSignedIn.get());
        this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      }, (error) => {
        console.log(JSON.stringify(error, null, 2));
      });

      gapi.client.load('calender', 'v3', () => {
        console.log('loaddddd calender');
        });
    });
  }
  updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
      // this.authorizeButton = true;
      // this.signoutButton = false;
      // this.listUpcomingEvents();
      console.log('signed in')
    } else {
      console.log('No list found or signed out');
      // this.authorizeButton = false;
      // this.signoutButton = true;
      // this.handleAuthClick();
      // authorizeButton.style.display = 'block';
      // signoutButton.style.display = 'none';
    }
  }

  async listUpcomingEvents() {
    console.log('call this',gapi);
    const events = await gapi.client.calendar.events.list({
      calendarId: 'primary',
      timeMin: (new Date()).toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 10,
      orderBy: 'startTime'
    }).then((response) => {
      const events = response.result.items;
      console.log('Upcoming events:', events);

      if (events.length > 0) {
        for (let i = 0; i < events.length; i++) {
          let event = events[i];
          let when = event.start.dateTime;
          if (!when) {
            when = event.start.date;
          }
          console.log(event.summary + ' (' + when + ')');
        }
      } else {
        console.log('No upcoming events found.');
      }
    });
  }
       handleAuthClick() {
        // gapi.auth2.getAuthInstance().signIn();
        console.log('gapi', gapi);
        // gapi.auth.authorize(
        //   {client_id: this.clientId, scope: this.scopes, immediate: false},
        //   this.listUpcomingEvents());

        Promise.resolve(gapi.auth2.getAuthInstance().signIn());
      }

      /**
       *  Sign out the user upon button click.
       */
       handleSignoutClick() {
        Promise.resolve(gapi.auth2.getAuthInstance().signOut());
      }
}
