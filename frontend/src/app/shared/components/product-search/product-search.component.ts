import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { ProductModel } from '../../../product/product.model';
import { ProductSearchService } from './product-search.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-search',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './product-search.component.html',
  styleUrl: './product-search.component.scss'
})
export class ProductSearchComponent {
  private productSearchService = inject(ProductSearchService)
  public searchField = '';
  public searchSubject = new Subject();
  public searchItems?:[];
  public searchResults?:ProductModel[];
  public showSearchResult = false;

  ngOnInit() {
    this.handleSearch();
  }

  private handleSearch() {
    this.searchSubject.pipe(
      distinctUntilChanged(),
      debounceTime(600)
    ).subscribe(searchField => {      
      if(searchField) {
        this.search()
      } else {
        this.clearSearchbox();
      }
      
    });
  }

  ngDoCheck() {
    this.searchSubject.next(this.searchField);
  }

  public search = () => {    
    this.productSearchService.searchProducts(this.searchField).subscribe(results => {      
      this.searchResults = results;
      console.log('this.searchResults', this.searchResults)
    }) 

    if (this.searchField) {
      this.showSearchResult = true;
    } else {
      this.showSearchResult = false;
    }
  }

  clearSearchbox = () => {
    this.searchResults = [];
    this.searchField = '';
    this.searchSubject.next(this.searchField);
    this.showSearchResult = false;
  }

  
}
