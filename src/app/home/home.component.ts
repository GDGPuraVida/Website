import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    
    constructor(private breakpointObserver: BreakpointObserver, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
      iconRegistry.addSvgIcon('meetup', sanitizer.bypassSecurityTrustResourceUrl('../../assets/images/meetup-logo.svg'));
      iconRegistry.addSvgIcon('facebook', sanitizer.bypassSecurityTrustResourceUrl('../../assets/images/facebook-logo.svg'));
      iconRegistry.addSvgIcon('linkedin', sanitizer.bypassSecurityTrustResourceUrl('../../assets/images/linkedin-logo.svg'));
    }
  
}
