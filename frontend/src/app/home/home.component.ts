import { Component } from '@angular/core';
import { HeroCarouselComponent } from "./hero-carousel/hero-carousel.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroCarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
