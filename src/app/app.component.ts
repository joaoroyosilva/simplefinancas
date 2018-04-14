import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    constructor() { }

    ngOnInit() {
        var config = {
            apiKey: "AIzaSyDDcw7EorpSdHP_2JCrHe3ZaBkIfncTer8",
            authDomain: "financas-7bfa2.firebaseapp.com",
            databaseURL: "https://financas-7bfa2.firebaseio.com",
            projectId: "financas-7bfa2",
            storageBucket: "financas-7bfa2.appspot.com",
            messagingSenderId: "715639293868"
        };
        firebase.initializeApp(config);
    }
}
