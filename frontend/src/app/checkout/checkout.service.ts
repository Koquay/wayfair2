import { effect, inject, Injectable, signal, untracked } from '@angular/core';
import { CheckoutModel } from './checkout.model';
import { saveStateToLocalStorage } from '../shared/utils/localStorageUtils';
import { AppService } from '../app.service';
import { CartService } from '../cart/cart.service';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  public checkoutSignal = signal<{ checkoutData:CheckoutModel}>({checkoutData: new CheckoutModel()});
  public appService = inject(AppService)
  public cartService = inject(CartService)
  public cartItems = this.cartService.cartSignal().cartItems;
  private httpClient = inject(HttpClient);
  private toastr = inject(ToastrService)
  private url = '/api/order'

  private appEffect = effect(() => {    
    let checkoutData:CheckoutModel = this.appService.appSignal().wayfair2.checkoutData;
    console.dir('checkoutData from AppService', checkoutData)

    untracked(() => { 
      if(checkoutData) {
        this.checkoutSignal.set({checkoutData})
      }      
    });
    
      console.dir('checkoutSignal.checkoutData', this.checkoutSignal().checkoutData)

  });

  public saveToCheckoutSignal = (checkoutData:CheckoutModel) => {
    this.checkoutSignal.set({checkoutData})
    saveStateToLocalStorage(this.checkoutSignal())
    console.dir('CheckoutService.checkoutSignal()', this.checkoutSignal())
  }

  public placeOrder = () => {
    this.checkoutSignal.set({checkoutData: {...this.checkoutSignal().checkoutData, items: this.cartService.cartSignal().cartItems} })
    console.dir('PlaceOrder.checkoutSignal', this.checkoutSignal())

    this.httpClient.post(this.url, {orderData: this.checkoutSignal().checkoutData}).pipe(
      tap(order => {
        console.log('new order', order)
        this.toastr.success('Order successfully placed.', 'Place Order')
      }),
      catchError(error => {
        console.log('error', error)
        this.toastr.error(error.message, 'Place Order');
        throw error;
      }) 
    ).subscribe()
  }
}
