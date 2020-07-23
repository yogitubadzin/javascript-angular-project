import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/Product';
import { ProductService } from '../../core/ProductService';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  products: Observable<Product[]>;
  allProducts: Product[];
  filteredProducts: Product[];
  selectedProduct: Product;
  totalItems: Observable<Number>;
  filter: string;
  currentPage = 1;
  limitSize = 5;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.products = this.productService.products;
    this.totalItems = this.productService.totalCount;

    this.products.subscribe((result) => {
      this.selectedProduct = result[0];
    });

    this.productService.fetchProductsWithPaging(
      this.currentPage - 1,
      this.limitSize
    );
  }

  onClick(product: Product) {
    this.selectedProduct = product;
  }

  filterData(filter: string) {
    this.productService.fetchProductsWithPagingAndFilter(
      this.calculateStartPage(),
      this.limitSize,
      filter
    );
    this.filter = filter;
  }

  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.filterData(this.filter);
  }

  calculateStartPage() {
    return (this.currentPage - 1) * this.limitSize;
  }

  addRedWarningClass(product: Product) {
    if (product.price == 0) {
      return 'text-danger';
    } else {
      return '';
    }
  }

  addActiveClass(product: Product) {
    if (this.selectedProduct.id == product.id) {
      return 'active';
    } else {
      return '';
    }
  }
}
