import { Component, inject } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { HeroCarouselService } from './hero-carousel.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-carousel',
  standalone: true,
  imports: [
    CommonModule,
    CarouselModule
  ],
  templateUrl: './hero-carousel.component.html',
  styleUrl: './hero-carousel.component.scss'
})
export class HeroCarouselComponent {
  private heroCarouselService = inject(HeroCarouselService)
  public heroCarouselImages:string[] = this.heroCarouselService.heroCarouselSignal();
  
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    center: true,
    dots: false,
    autoHeight: true,
    autoWidth: true,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 1,
      },
      992: {
        items: 1,
      }
    }
  }
}
