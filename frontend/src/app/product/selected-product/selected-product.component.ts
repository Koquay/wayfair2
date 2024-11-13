import { Component, effect, inject, untracked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { ProductModel } from '../product.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CreateRatingStarsDirective } from '../../shared/directives/create-rating-stars.directive';
import { DiscountPricePipe } from '../../shared/pipes/discount-price.pipe';
import { CartItem } from '../../cart/cart-item.model';
import { CartService } from '../../cart/cart.service';
import { AppService } from '../../app.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-selected-product',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CreateRatingStarsDirective,
    DiscountPricePipe
  ],
  templateUrl: './selected-product.component.html',
  styleUrl: './selected-product.component.scss'
})
export class SelectedProductComponent {
  private activatedRoute = inject(ActivatedRoute)
  private productService = inject(ProductService)
  private cartService = inject(CartService)
  private toastr = inject(ToastrService)
  
  public selectedProduct?:ProductModel;
  public currentImg = '';
  public quantity = 1;

  public appService = inject(AppService)

  ngOnInit() {
    this.getSelectedProduct();
  }

  private getSelectedProduct = () => {
    const productId = this.activatedRoute.snapshot.paramMap.get('productId') as string;
    console.dir('selectedProduct', productId)
    if(productId !== null) {
      this.productService.getSelectedProduct(productId).subscribe(product => {
        this.selectedProduct = product;

        if(!this.selectedProduct) {
          this.selectedProduct = this.appService.appSignal().wayfair2.selectedProduct;
        }

        if(this.selectedProduct) {
          this.currentImg = this.selectedProduct?.images[0]
        }
        
      })
    }
    
  }

  public addToCart = () => {
    try {
      this.cartService.addToCart(new CartItem(this.selectedProduct as ProductModel, this.quantity))
    } catch (e) {
      this.toastr.success('There was a problem adding your item to cart.', '');
      throw e;
    } finally {
      this.toastr.success('Item successfully added to cart.', '');
    }
  }

  public increaseQuantity = () => {
    this.quantity++;
  }

  public decreaseQuantity = () => {
    if(this.quantity > 1) {
      this.quantity--;
    }    
  }

  public setCurrentImg = (img:string) => {
    this.currentImg = img
  }
}
