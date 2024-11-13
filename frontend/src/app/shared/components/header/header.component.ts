import { Component } from '@angular/core';
import { HeroCarouselComponent } from '../../../home/hero-carousel/hero-carousel.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserModel } from '../../../user/user.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    HeroCarouselComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public user:UserModel = new UserModel();
  public numberOfItems = 0;

  public signout = () => {
    
  }    
}
