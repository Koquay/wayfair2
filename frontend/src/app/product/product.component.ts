import { Component, effect, inject } from '@angular/core';
import { ProductSidenavComponent } from './product-sidenav/product-sidenav.component';
import { ProductSidenavService } from './product-sidenav/product-sidenav.service';
import { ProductService } from './product.service';
import { CreateRatingStarsDirective } from '../shared/directives/create-rating-stars.directive';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    ProductSidenavComponent,
    CreateRatingStarsDirective
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  private productSidenavService = inject(ProductSidenavService)
  public productService = inject(ProductService)
  public productSidenav = this.productSidenavService.productSidenavSignal();
  public products = this.productService.productSignal();

  constructor() {
    effect(() => { 
      console.log('ProductComponent.productSidenav', this.productSidenavService.productSidenavSignal());
      this.productService.getProducts(this.productSidenavService.productSidenavSignal());
      this.products = this.productService.productSignal();
      console.log('ProductComponent.products', this.products)
    });
}
}
