import { Injectable, signal } from '@angular/core';
import { ProductSidenavModel } from './product-sidenav.model';

@Injectable({
  providedIn: 'root'
})
export class ProductSidenavService {

  public productSidenavSignal = signal<ProductSidenavModel>( new ProductSidenavModel())

   public updateProductSidenav(productSidenav:ProductSidenavModel): void {
    this.productSidenavSignal.set({ ...productSidenav })
    console.log('ProductSidenavService.productSidenavSignal', this.productSidenavSignal())
  }
}
