import { Injectable, signal } from '@angular/core';
import { CheckoutModel } from './checkout.model';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  public checkoutSignal = signal<{ checkoutData:CheckoutModel}>({checkoutData: new CheckoutModel()})
}
