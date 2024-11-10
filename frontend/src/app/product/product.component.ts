import { Component, effect, inject } from '@angular/core';
import { ProductSidenavComponent } from './product-sidenav/product-sidenav.component';
import { ProductSidenavService } from './product-sidenav/product-sidenav.service';
import { ProductService } from './product.service';
import { CreateRatingStarsDirective } from '../shared/directives/create-rating-stars.directive';
import { CommonModule } from '@angular/common';
import { DiscountPricePipe } from '../shared/pipes/discount-price.pipe';
import { PaginationComponent } from '../shared/components/pagination/pagination.component';
import { FormsModule } from '@angular/forms';
import { ProductModel } from './product.model';
import { CartService } from '../cart/cart.service';
import { CartItem } from '../cart/cart-item.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ProductSidenavComponent,
    CreateRatingStarsDirective,
    DiscountPricePipe,
    PaginationComponent
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  private productSidenavService = inject(ProductSidenavService)
  public productService = inject(ProductService)
  public cartService = inject(CartService)
  public productSidenav = this.productSidenavService.productSidenavSignal();
  public products = this.productService.productSignal();
  public currentGalleryImg?:string;

  private productSidenavEffect = effect(() => {    
    console.dir('ProductComponent.productSidenav', this.productSidenavService.productSidenavSignal());
    this.productService.getProducts(this.productSidenavService.productSidenavSignal());
  });

  private productEffect = effect(() => {    
    this.products = this.productService.productSignal();
    console.dir('ProductComponent.products', this.products)

    // if(this.products?.products[0]) {
    //   this.setCurrentGalleryImg(this.products?.products[0].images[0])
    // }
    
  });

  public setCurrentGalleryImg(imgEl:HTMLImageElement, img:string) {
    imgEl.src = `assets/img/${img}`;
  }

  public isImgClicked(imgEl:HTMLImageElement, img:string) {
    // console.dir(img, imgEl.src.substring(imgEl.src.indexOf("assets/img/")+11))
    return imgEl.src.substring(imgEl.src.indexOf("assets/img/")+11).trim().replace('%20', ' ') === img.trim().replace('%20', ' ');
  }

  public addToCart = (product:ProductModel) => {
    this.cartService.addToCart(new CartItem(product, 1))
  }

}
