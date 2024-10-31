import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeroCarouselService {

  public heroCarouselSignal = signal<string[]>( [
      "Screenshot from 2024-10-22 11-25-22.png",
      "Screenshot from 2024-10-22 11-26-12.png",
      "Screenshot from 2024-10-22 11-26-21.png"
  ])

  constructor() { }

  
}
