import { Component, effect, inject } from '@angular/core';
import { CheckoutService } from './checkout.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartSummaryComponent } from '../cart/cart-summary/cart-summary.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CartSummaryComponent
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {

  public checkoutService = inject(CheckoutService)
  public checkoutData = this.checkoutService.checkoutSignal().checkoutData;

  expirationMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

expirationYears = [
    "2024",
    "2025",
    "2026",
    "2027",
    "2028",
    "2029",
    "2030",
    "2031",
    "2032",
    "2033",
    "2034",
]

private checkoutEffect = effect(() => {    
  this.checkoutData = this.checkoutService.checkoutSignal().checkoutData;
  console.dir('CheckoutComponent.checkoutData', this.checkoutData)
});

  public saveToCheckoutSignal = () => {
    // console.dir('CheckoutComponent.checkoutData', this.checkoutData)
    this.checkoutService.saveToCheckoutSignal(this.checkoutData)
  }

  public placeOrder = () => {
    
  }
}
