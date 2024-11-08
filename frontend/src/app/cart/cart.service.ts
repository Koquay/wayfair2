import { effect, inject, Injectable, signal, untracked } from '@angular/core';
import { CartItem } from './cart-item.model';
import { saveStateToLocalStorage } from '../shared/utils/localStorageUtils';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartSignal = signal<{ cartItems:CartItem[]}>({ cartItems:[]})

  public appService = inject(AppService)
  

  private appEffect = effect(() => {    
    let cartItems:CartItem[] = this.appService.appSignal().wayfair2.cartItems;
    console.log('cartItems', cartItems)

    untracked(() => { 
      if(cartItems?.length) {
        this.cartSignal.set({cartItems:[...cartItems]})
      }
      
    });
    
      console.log('cartSignal.cartItems', this.cartSignal().cartItems)

  });

  public addToCart = (item:CartItem) => {
    const existingItem = this.cartSignal().cartItems.find(existing => existing.product._id === item.product._id)

    if(existingItem) {
      existingItem.quantity++
    } else {
      this.cartSignal.set({cartItems:[...this.cartSignal().cartItems, item]})
    }
    saveStateToLocalStorage(this.cartSignal())
  }

  public decreaseProductQuantity = (productId:string) => {
    this.cartSignal().cartItems.find(item => item.product._id === productId)!.quantity--;
    saveStateToLocalStorage(this.cartSignal())
  }

  public increaseProductQuantity = (productId:string) => {
    this.cartSignal().cartItems.find(item => item.product._id === productId)!.quantity++;
    saveStateToLocalStorage(this.cartSignal())
  }

  public removeItemFromCart = (productId:string) => {
    const cartItems = this.cartSignal().cartItems.filter(item => item.product._id !== productId);
    this.cartSignal.set({cartItems:[...cartItems]})
    saveStateToLocalStorage(this.cartSignal())
  }
}
