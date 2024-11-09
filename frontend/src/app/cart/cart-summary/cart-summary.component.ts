import { Component, Input } from '@angular/core';
import { CartItem } from '../cart-item.model';
import { CommonModule } from '@angular/common';

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
  @Input() cartItems?:CartItem[];

  ngOnInit() {
    console.log('CartSummary.cartItems', this.cartItems)
  }

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
