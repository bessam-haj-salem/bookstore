import { Component } from '@angular/core';
import firebase from 'firebase/app';
// import Firebase Authentication (optional)
import '@firebase/auth';

// import Firebase Realtime Database (optional)
import '@firebase/database';

// import Cloud Firestore (optional)
import '@firebase/firestore';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    var firebaseConfig = {
      apiKey: 'AIzaSyATqEWMSiYJsCRic8gUSIkdtB9_qND133M',
      authDomain: 'book-world-tunisia.firebaseapp.com',
      databaseURL: 'https://book-world-tunisia.firebaseio.com',
      projectId: 'book-world-tunisia',
      storageBucket: 'book-world-tunisia.appspot.com',
      messagingSenderId: '737645756503',
      appId: '1:737645756503:web:4138c9a96cb7157c2f2312'
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}
