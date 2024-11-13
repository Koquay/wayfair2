import { inject, Injectable, signal } from '@angular/core';
import { AuthenticationModel } from './authentication.model';
import { catchError, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from '../user/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public authSignal = signal<{ auth:AuthenticationModel}>({auth: new AuthenticationModel()})
  
  private httpClient = inject(HttpClient)
  private toastr = inject(ToastrService);

  private url = '/api/auth';

  signup = (authData:AuthenticationModel) => {
    console.dir('authDataService.authData', authData)
    // return of(new UserModel())

    return this.httpClient.post<AuthenticationModel>(this.url, {authData}).pipe(
      tap(user => {
        console.dir('userService.user tap', user)
        this.authSignal.set({auth: user})
        console.dir('userService.authSignal', this.authSignal())
      }),
      catchError(error => {
        console.dir('error', error)
        this.toastr.error(error.error, '');
        throw error;
      })   
    )
  }
}
