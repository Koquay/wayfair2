import { computed, effect, inject, Injectable, signal, untracked } from '@angular/core';
import { AuthenticationModel } from './authentication.model';
import { catchError, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from '../user/user.model';
import { saveStateToLocalStorage } from '../shared/utils/localStorageUtils';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public authSignal = signal<{ auth:AuthenticationModel}>({auth: new AuthenticationModel()})
  public appService = inject(AppService)

  private httpClient = inject(HttpClient)
  private toastr = inject(ToastrService);
  private url = '/api/auth';  

  public lastNameSignal = computed(() => {
    return this.authSignal().auth.lastName;
  });
  

  private appEffect = effect(() => {    
    let auth:AuthenticationModel = this.appService.appSignal().wayfair2.auth;
    console.dir('auth', auth)

    untracked(() => { 
      if(auth) {
        this.authSignal.set({auth})
      }
      
    });
    
      console.dir('authSignal', this.authSignal())

  });

  signup = (authData:AuthenticationModel) => {
    console.dir('authDataService.authData', authData)
    // return of(new UserModel())

    return this.httpClient.post<AuthenticationModel>(this.url, {authData}).pipe(
      tap(user => {
        console.dir('userService.user tap', user)
        this.authSignal.set({auth: user})
        saveStateToLocalStorage(this.authSignal())
        console.dir('userService.authSignal', this.authSignal())
      }),
      catchError(error => {
        console.dir('error', error)
        this.toastr.error(error.message, '');
        throw error;
      })   
    )
  }

  signin = (authData:AuthenticationModel) => {
    console.dir('authDataService.signin.authData', authData)
    // return of(new UserModel())

    return this.httpClient.put<AuthenticationModel>(this.url, {authData}).pipe(
      tap(user => {
        console.dir('userService.user tap', user)
        this.authSignal.set({auth: user})
        saveStateToLocalStorage(this.authSignal())
        console.dir('userService.authSignal', this.authSignal())
      }),
      catchError(error => {
        console.dir('error', error)
        this.toastr.error(error.message, '');
        throw error;
      })   
    )
  }

  public signout = () => {
    this.authSignal.set({auth: new AuthenticationModel()})
    saveStateToLocalStorage(this.authSignal())
  }
}
