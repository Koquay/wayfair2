import { CommonModule } from '@angular/common';
import { Component, effect, inject, Input } from '@angular/core';
import { ProductSidenavService } from '../../../product/product-sidenav/product-sidenav.service';
import { ProductService } from '../../../product/product.service';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  private productSidenavService = inject(ProductSidenavService)
  public productService = inject(ProductService)
  public productSidenav = this.productSidenavService.productSidenavSignal();
  public products = this.productService.productSignal();
  public pages:number[] = [];
  public pageNo = 1;
  public numberOfPages = 0;
  public productCount:any;

  private productSidenavEffect = effect(() => {    
    console.dir('PaginationComponent.productSidenav', this.productSidenavService.productSidenavSignal());
  });

  private productEffect = effect(() => {    
    this.products = this.productService.productSignal();
    console.dir('PaginationComponent.products', this.products)

    this.productCount = this.products.productCount;
    this.numberOfPages = Math.ceil(
      this.productCount / this.productSidenav.pageSize
    );

    this.pages = [];
      for (let i = 1; i <= this.numberOfPages; i++) {
        this.pages.push(i);
      }
  });

  public getPage(pageNo:number) {
    this.pageNo = pageNo;
    this.productSidenavService.setPage(pageNo);
  }

  public getAdjacentPage(page:string) {
    if (page === 'next') {
      if (this.pageNo < this.numberOfPages) {
        ++this.pageNo;
        this.productSidenavService.setPage(this.pageNo);
      }
    } else if (page === 'prev') {
      if (this.pageNo > 1) {
        --this.pageNo;
        this.productSidenavService.setPage(this.pageNo);
      }
    }
  }
}
