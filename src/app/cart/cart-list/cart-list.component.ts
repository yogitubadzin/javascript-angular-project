import { Component, OnInit } from '@angular/core';
import { CartProductItem } from 'src/app/models/cartProductItem';
import { CartProductService } from 'src/app/core/cart-product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss'],
})
export class CartListComponent implements OnInit {
  products: CartProductItem[];
  constructor(private cartService: CartProductService,
    private router: Router) {}

  ngOnInit(): void {
     this.cartService.products$.subscribe(result=>{
      this.products = result;
    });

    this.cartService.fetchProducts();
  }

  buyProducts(){
    this.cartService.buy();
    this.router.navigate(['/cart/finish']);
  }
}