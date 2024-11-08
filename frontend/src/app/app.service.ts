import { Injectable, signal } from '@angular/core';
import { CartItem } from './cart/cart-item.model';
import { ProductModel } from './product/product.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public appSignal = signal<{ wayfair2:{cartItems:CartItem[], selectedProduct:ProductModel}}>({wayfair2:{cartItems:[], selectedProduct: new ProductModel()}})

  public restoreStateFromLocalStorage = () => {
    const wayfair2 = JSON.parse(localStorage.getItem("wayfair2") as string);  
    this.appSignal.set({ wayfair2: {...wayfair2}}) 
    console.log('appSignal', this.appSignal())
  }
}
