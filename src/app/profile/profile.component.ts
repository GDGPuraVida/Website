import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireFunctions } from '@angular/fire/functions';
import { HttpClient } from '@angular/common/http';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  code: string;
  state: string;
  error: string;
  private exchangeToken: (data: any) => Observable<any>;

  constructor(private route: ActivatedRoute, private angularFireFunctions: AngularFireFunctions, private http: HttpClient) {
    this.exchangeToken = angularFireFunctions.httpsCallable('exchangeToken');
    this.route.queryParams.subscribe(params => {
      this.code = params['code'];
      this.state = params['state'];
      this.error = params['error'];
      if (this.code) {
        this.callExchangeToken();
      }
    });
  }

  ngOnInit() {
  }

  callExchangeToken(): void{
    console.log(`Calling exchange token, ${this.code}, ${this.state}`);
    this.exchangeToken({
      code: this.code,
      state: this.state,
    }).subscribe(data => {
      console.log(data);
      firebase.auth().signInWithCustomToken(data.token).then(() => {        
        alert('welcome');
      });
    }, error => {
      console.log(error);
    });
  }

}
