import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthenticationModel } from './authentication.model';
import { AuthenticationService } from './authentication.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.scss'
})
export class AuthenticationComponent {
  private authenticationService = inject(AuthenticationService)
  private router = inject(Router)
  private activatedRoute = inject(ActivatedRoute)
  private toastr = inject(ToastrService);
  authData = new AuthenticationModel(); 
  public action = '';

  constructor() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    });
  }

  ngOnInit() {
    this.action = this.activatedRoute.snapshot.paramMap.get('action') as string;
    console.log('action', this.action);
  }

  signup = () => {
    this.authenticationService.signup(this.authData).subscribe(() => {
      this.toastr.success('Sign up successful!', '');
      this.goBackToCallingPage()
    })
  };

  public signin = () => {
    this.authenticationService.signin(this.authData).subscribe(() => {
      this.toastr.success('Sign In successful!', '');
      this.goBackToCallingPage()
    })
  }

  private goBackToCallingPage = () => {
    const breadcrumbs = JSON.parse(localStorage.getItem('wayfair2') as string).breadcrumbs;
    let previousUrl = '';

    console.dir('AuthenticationComponent.breadcrumbs', breadcrumbs)
    if(breadcrumbs.length > 2) {
      previousUrl = breadcrumbs[breadcrumbs.length-2].url;

      if(breadcrumbs[breadcrumbs.length-2].label === 'authentication') {
        previousUrl = breadcrumbs[breadcrumbs.length-3].url;
      }
    } else {
      previousUrl = breadcrumbs[0].url
    }

    this.router.navigateByUrl(previousUrl);
  }

  
}
