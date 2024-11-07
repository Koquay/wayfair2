import { Component, inject } from '@angular/core';
import { ProductSidenavService } from './product-sidenav.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CreateRatingStarsDirective } from '../../shared/directives/create-rating-stars.directive';

@Component({
  selector: 'app-product-sidenav',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    CreateRatingStarsDirective
  ],
  templateUrl: './product-sidenav.component.html',
  styleUrl: './product-sidenav.component.scss'
})
export class ProductSidenavComponent {
  private productSidenavService = inject(ProductSidenavService)
  public productSidenav = this.productSidenavService.productSidenavSignal();

  public getProducts = () => {
    console.log('productSidenav', this.productSidenav)
    this.productSidenavService.updateProductSidenav(this.productSidenav)
  }
}
