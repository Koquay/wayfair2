import { Injectable, signal } from '@angular/core';
import { ProductModel } from './product.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ProductSidenavModel } from './product-sidenav/product-sidenav.model';
import { catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public productSignal = signal<{ products?:ProductModel[]; productCount?:number }>({})
  private url = '/api/product';

  constructor(
    private httpClient:HttpClient,) { }

  public getProducts = (productSidenav:ProductSidenavModel) => {
    const sidenavFilters = this.getSidenavFilters(productSidenav);

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


  private getSidenavFilters(productSidenav:ProductSidenavModel) {
    console.log('ProductService.getSidenavFilters', productSidenav);
    const categoryFilters = productSidenav.category.categories.filter(
      (category:any) => category.checked
    );
    console.log('ProductService.categoryFilters', categoryFilters);

    const categories:string[] = [];

    for (let category of categoryFilters) {
      categories.push(category.name);
    }

    // const range = {low: productSidenav.priceRange.min, high: productSidenav.priceRange.selectedPrice}

    // const priceRanges = [];
    // priceRanges.push(range);
    
    // console.log('ProductService.priceRanges', priceRanges);
 
    // const ratingFilters = productSidenav.ratings.ratings.filter(
    //   (filter:any) => filter.checked
    // );
    // console.log('ProductService.ratingFilters', ratingFilters);

    // const ratings:number[] = [];

    // for (let rating of ratingFilters) {
    //   ratings.push(rating.rating);
    // }

    const filters = {
      categories,
      // priceRanges: priceRanges,
      // ratings: ratings,
      pageNo: productSidenav.pageNo,
      pageSize: productSidenav.pageSize,
    };

    console.log('filters', filters);
    return JSON.stringify(filters);
  }
}
