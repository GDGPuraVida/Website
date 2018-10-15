import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { MeetupComponent } from './meetup/meetup.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  sponsors = [
    { name: 'Instituto Nacional de Seguros', image: '../assets/images/ins.png' }
  ];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(result => result.matches)
  );
    
  constructor(private breakpointObserver: BreakpointObserver, public dialog: MatDialog) {
  }

  login(){
    this.dialog.open(MeetupComponent, {
      width: '300px',
    });
  }
}
