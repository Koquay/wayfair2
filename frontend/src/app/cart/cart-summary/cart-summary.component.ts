import { Component, effect, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart-summary',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './cart-summary.component.html',
  styleUrl: './cart-summary.component.scss'
})
export class CartSummaryComponent {

  public cartService = inject(CartService)
  public cartItems = this.cartService.cartSignal().cartItems;

  private cartEffect = effect(() => {    
    this.cartItems = this.cartService.cartSignal().cartItems;
    console.dir('CartSummaryComponent.cartItems', this.cartItems)
  });

  public getSubtotal = () => {
    let subtotal = 0;

    if(this.cartItems?.length) {
      subtotal = this.cartItems.reduce((acc, item) => {                     
        // const discount = item.product.discount/100 * item.product.price;
         return (acc += (item.product.price * item.quantity));
      }, 0);
    }    

    return subtotal;
  }
  
  public getTax = () => {
    return this.getSubtotal()  * .15;
  }

  public getTotal = () => {
    return this.getSubtotal() + this.getTax();
  }

}
