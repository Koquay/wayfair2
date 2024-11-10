import { Injectable, signal } from '@angular/core';
import { CartItem } from './cart/cart-item.model';
import { ProductModel } from './product/product.model';
import { CheckoutModel } from './checkout/checkout.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public appSignal = signal<{ 
    wayfair2:{cartItems:CartItem[], selectedProduct:ProductModel, checkoutData:CheckoutModel}
  }>({wayfair2:{cartItems:[], selectedProduct: new ProductModel(), checkoutData: new CheckoutModel()}})

  public restoreStateFromLocalStorage = () => {
    const wayfair2 = JSON.parse(localStorage.getItem("wayfair2") as string);  
    this.appSignal.set({ wayfair2: {...wayfair2}}) 
    console.dir('appSignal', this.appSignal())
  }
}
