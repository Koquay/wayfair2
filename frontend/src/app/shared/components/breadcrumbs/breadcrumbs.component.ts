import { Component, effect, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../product/product.service';
import { ProductModel } from '../../../product/product.model';

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.scss'
})
export class BreadcrumbsComponent {

  private productService = inject(ProductService)
  private router = inject(Router)
  
  public breadcrumbs = [{label:'', url:''}];
  public productBrand:string = '';
  public productId = '';
  private selectedProduct?:ProductModel;

  private productEffect = effect(() => {    
    this.selectedProduct = this.productService.productSignal().selectedProduct;
    this.productBrand = this.selectedProduct?.name;
    this.productId = this.selectedProduct?._id;
    
    console.log('Breadcrumb.selectedProduct', this.selectedProduct)
  });

  ngOnInit(): void {
    this.buildBreadcrumbs();    
  }

  private buildBreadcrumbs = () => {
    this.breadcrumbs.shift();
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        let url = this.router.url;                

        let label = url.substring(1);
        console.log('url', url);        

        if (label.includes('/')) {
          let index = label.indexOf('/');
          label = label.substring(0, index);
        }

        label = label.replaceAll('-', ' ');

        if(url.startsWith('/selected-product')) {     
          // label = this.productName?.substring(0, 20).trim() + '...'
          label = this.productBrand || 'Selected Product';
        }

        let breadcrumb = { label, url };

        this.breadcrumbs = this.breadcrumbs?.filter(
          (breadcrumb:{label:string, url:string}) => breadcrumb.url !== url
        );
        this.breadcrumbs?.push(breadcrumb);

        console.log('breadcrumbs', this.breadcrumbs);

        if (this.breadcrumbs.length === 1) {
          if (breadcrumb.url !== '/home') {
            let state = JSON.parse(localStorage.getItem('wayfair2') as string);
            this.breadcrumbs = state.breadcrumbs;
          }
        }

        let state = JSON.parse(localStorage.getItem('wayfair2') as string) || {};
        state.breadcrumbs = this.breadcrumbs;
        localStorage.setItem('wayfair2', JSON.stringify(state));
        
      }
    });
  };

  navigateToUrl = (url:string) => {

    if(url.startsWith('/selected-product')) {
      const productId = url.split('/')[2]
      // this.store.dispatch(StoreSelectedProduct({productId}))
    }

    this.router.navigateByUrl(url);
  }

  public clearBreadcrumbs = () => {
    this.breadcrumbs = [this.breadcrumbs[this.breadcrumbs.length - 1]]
    let breadcrumb = {label:'Home', url:'/home' }
    this.breadcrumbs.unshift(breadcrumb)
  }

}
