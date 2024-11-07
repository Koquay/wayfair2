import { Component } from '@angular/core';
import { HeroCarouselComponent } from '../../../home/hero-carousel/hero-carousel.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    HeroCarouselComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
