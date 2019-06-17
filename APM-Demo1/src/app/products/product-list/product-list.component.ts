import { Component, OnInit, OnDestroy } from '@angular/core';

import { Product } from '../product';
import { ProductService } from '../product.service';

/* NgRx */
import { Store, select } from '@ngrx/store';
import * as fromProduct from '../state/product.state';
import * as productSelectors from '../state/product.selectors';
import * as productAction from '../state/product.actions';
import { takeWhile } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage: string;

  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  componentActive = true;
  products$: Observable<Product[]>;
  errorMessage$: Observable<string>;

  constructor(
    private store: Store<fromProduct.State>,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.store
      .pipe(
        select(productSelectors.getCurrentProduct),
        takeWhile(() => this.componentActive)
      )
      .subscribe(currentProduct => (this.selectedProduct = currentProduct));

    this.errorMessage$ = this.store.pipe(select(productSelectors.getError));
    this.store.dispatch(new productAction.Load());
    this.products$ = this.store.pipe(select(productSelectors.getProducts));

    this.store
      .pipe(
        select(productSelectors.getShowProductCode),
        takeWhile(() => this.componentActive)
      )
      .subscribe(showProductCode => (this.displayCode = showProductCode));
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  checkChanged(value: boolean): void {
    this.store.dispatch(new productAction.ToggleProductCode(value));
  }

  newProduct(): void {
    this.store.dispatch(new productAction.InitializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(new productAction.SetCurrentProduct(product));
  }
}
