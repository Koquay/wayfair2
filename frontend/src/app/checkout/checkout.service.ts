import { effect, inject, Injectable, signal, untracked } from '@angular/core';
import { CheckoutModel } from './checkout.model';
import { saveStateToLocalStorage } from '../shared/utils/localStorageUtils';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  public checkoutSignal = signal<{ checkoutData:CheckoutModel}>({checkoutData: new CheckoutModel()});
  public appService = inject(AppService)

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
}
