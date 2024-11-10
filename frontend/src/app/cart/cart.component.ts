import { Component, effect, inject } from '@angular/core';
import { CartService } from './cart.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CreateRatingStarsDirective } from '../shared/directives/create-rating-stars.directive';
import { DiscountPricePipe } from '../shared/pipes/discount-price.pipe';
import { CartSummaryComponent } from './cart-summary/cart-summary.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    CartSummaryComponent,
    CreateRatingStarsDirective,
    DiscountPricePipe
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  public cartService = inject(CartService)
  public cartItems = this.cartService.cartSignal().cartItems;

  private cartEffect = effect(() => {    
    this.cartItems = this.cartService.cartSignal().cartItems;
    console.dir('cartComponent.cartItems', this.cartItems)
  });

  public decreaseProductQuantity = (productId:string, quantity:number) => {
    if(quantity > 1) {
      this.cartService.decreaseProductQuantity(productId)
    }
  }

  public increaseProductQuantity = (productId:string) => {
      this.cartService.increaseProductQuantity(productId)
  }

  public removeItemFromCart = (productId:string) => {
    this.cartService.removeItemFromCart(productId)
  }
}
