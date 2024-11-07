import { Injectable, signal } from '@angular/core';
import { ProductModel } from './product.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ProductSidenavModel } from './product-sidenav/product-sidenav.model';
import { catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public productSignal = signal<{ products:ProductModel[]; productCount?:number }>({ products:[], productCount: 0})
  private url = '/api/product';

  constructor(
    private httpClient:HttpClient,) { }

  public getProducts = (productSidenav:ProductSidenavModel) => {
    const sidenavFilters = this.getSelectedFilters(productSidenav);

    const params = new HttpParams({
      fromObject: { sidenavFilters },
    });

    this.httpClient
      .get<{ products:ProductModel[]; productCount:number }>(this.url, { params }) 
      .pipe(
        tap((productData) => {
          console.log('productData', productData);
          this.productSignal.set({ ...productData })
          console.log('ProductService.productSignal', this.productSignal())
        }),
        catchError(error => {
          console.log('error', error)
          // this.toastr.error('Problem getting products', 'Get Products')
          throw error;
        }) 
      )
      .subscribe();
  };


  private getSelectedFilters(productSidenav:ProductSidenavModel) {
    console.log('ProductService.getSelectedFilters', productSidenav);
    const categoryFilters = productSidenav.category.categories.filter(
      (category:any) => category.checked
    );
    console.log('ProductService.categoryFilters', categoryFilters);

    const categories:string[] = [];

    for (let category of categoryFilters) {
      categories.push(category.name);
    }

    const priceFilters = productSidenav.priceFilter.priceRange.filter(
      (range) => range.checked
    );

    console.log('ProductService.priceFilters', priceFilters);

    const priceRanges = [];
    for (let priceRange of priceFilters) {
      priceRanges.push(priceRange.range);
    }
 
    const ratingFilters = productSidenav.ratings.ratings.filter(
      (filter:any) => filter.checked
    );
    console.log('ProductService.ratingFilters', ratingFilters);

    const ratings:number[] = [];

    for (let rating of ratingFilters) {
      ratings.push(rating.rating);
    }

    const filters = {
      categories,
      priceRanges,
      ratings,
      pageNo: productSidenav.pageNo,
      pageSize: productSidenav.pageSize,
    };

    console.log('filters', filters);
    return JSON.stringify(filters);
  }
}
