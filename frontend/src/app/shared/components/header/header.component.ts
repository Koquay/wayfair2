import { Component, effect, inject } from '@angular/core';
import { HeroCarouselComponent } from '../../../home/hero-carousel/hero-carousel.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserModel } from '../../../user/user.model';
import { CartService } from '../../../cart/cart.service';
import { AuthenticationService } from '../../../authentication/authentication.service';
import { ProductSearchComponent } from '../product-search/product-search.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    HeroCarouselComponent,
    ProductSearchComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public cartService = inject(CartService)
  public authenticationService = inject(AuthenticationService)
  
  public numberOfItems = 0;
  public lastName = '';
  

  private cartEffect = effect(() => {    
    this.numberOfItems = this.cartService.numberOfCartItems();   
  });

  private authEffect = effect(() => {    
    this.lastName = this.authenticationService.lastNameSignal();   
  });

  public signout = () => {
    this.authenticationService.signout();
  }
}
