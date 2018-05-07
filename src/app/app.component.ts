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
            apiKey: "AIzaSyCA_eLMxf1o4VkXzR8_MtBGUuErMMomkT4",
            authDomain: "financas-8e346.firebaseapp.com",
            databaseURL: "https://financas-8e346.firebaseio.com",
            projectId: "financas-8e346",
            storageBucket: "",
            messagingSenderId: "720187967895"
        };
        firebase.initializeApp(config);
    }
}
