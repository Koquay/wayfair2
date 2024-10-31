import { Component } from '@angular/core';
import { HeroCarouselComponent } from '../../../home/hero-carousel/hero-carousel.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    HeroCarouselComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
