import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireFunctions } from '@angular/fire/functions';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-meetup',
  templateUrl: './meetup.component.html',
  styleUrls: ['./meetup.component.scss']
})
export class MeetupComponent implements OnInit {
  private meetupLogin: (data: any) => Observable<any>;
  private loginPage: any = "";

  constructor(private angularFireFunctions: AngularFireFunctions, private http: HttpClient) {
    this.meetupLogin = angularFireFunctions.httpsCallable('meetupLogin');
  }

  ngOnInit() {
    this.meetupLogin({}).subscribe(data => {
      console.log(`Calling meetup login, ${data.url}`);
      // this.http.get(data.url).subscribe((html: any) => this.loginPage = html);
      window.location.href = data.url;
    }, error => {
      console.log(error);
    });
  }

}
