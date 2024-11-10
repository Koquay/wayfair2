import { Injectable, signal } from '@angular/core';
import { ProductModel } from './product.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ProductSidenavModel } from './product-sidenav/product-sidenav.model';
import { catchError, Observable, of, tap } from 'rxjs';
import { saveStateToLocalStorage } from '../shared/utils/localStorageUtils';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public productSignal = signal<{ products:ProductModel[]; selectedProduct:ProductModel; productCount?:number }>({ products:[], selectedProduct: new ProductModel(), productCount: 0})
  private url = '/api/product';
  public selectedProduct?:ProductModel;

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
          console.dir('productData', productData);
          this.productSignal.set({ ...productData, selectedProduct: this.selectedProduct as ProductModel})
          console.dir('ProductService.productSignal', this.productSignal())
        }),
        catchError(error => {
          console.dir('error', error)
          // this.toastr.error('Problem getting products', 'Get Products')
          throw error;
        }) 
      )
      .subscribe();
  };


  private getSelectedFilters(productSidenav:ProductSidenavModel) {
    console.dir('ProductService.getSelectedFilters', productSidenav);
    const categoryFilters = productSidenav.category.categories.filter(
      (category:any) => category.checked
    );
    console.dir('ProductService.categoryFilters', categoryFilters);

    const categories:string[] = [];

    for (let category of categoryFilters) {
      categories.push(category.name);
    }

    const priceFilters = productSidenav.priceFilter.priceRange.filter(
      (range) => range.checked
    );

    console.dir('ProductService.priceFilters', priceFilters);

    const priceRanges = [];
    for (let priceRange of priceFilters) {
      priceRanges.push(priceRange.range);
    }
 
    const ratingFilters = productSidenav.ratings.ratings.filter(
      (filter:any) => filter.checked
    );
    console.dir('ProductService.ratingFilters', ratingFilters);

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

    console.dir('filters', filters);
    return JSON.stringify(filters);
  }

  public getSelectedProduct = (productId:string) : Observable<ProductModel> => {
    const product = this.productSignal().products.find(product => product._id === productId) as ProductModel

    saveStateToLocalStorage({selectedProduct: product})
    this.productSignal.set({ ...this.productSignal(), selectedProduct:product})
    return of(product) as Observable<ProductModel>
  }
}
