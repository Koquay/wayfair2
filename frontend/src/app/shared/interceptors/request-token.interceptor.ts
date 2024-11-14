import { HttpInterceptorFn } from '@angular/common/http';

export const requestTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = getUserToken();
    if(token) {
      const authReq = req.clone({setHeaders:{"Authorization":"Bearer " + token}});
      console.log('authReq', authReq)
      return next(authReq);
    }
    return next(req);
};

const getUserToken = () => {
  const wayfair2 = localStorage.getItem('wayfair2');
  let token = null;

  if(wayfair2) {
    token = JSON.parse(wayfair2)?.auth?.token;
    console.dir('requestTokenInterceptor token', token)
  }

  return token;
}