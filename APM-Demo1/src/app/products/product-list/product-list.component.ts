import { Component, OnInit, OnDestroy } from '@angular/core';

import { Product } from '../product';
import { ProductService } from '../product.service';

/* NgRx */
import { Store, select } from '@ngrx/store';
import * as fromProduct from '../state/product.state';
import * as productSelectors from '../state/product.selectors';
import * as productAction from '../state/product.actions';

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

  constructor(
    private store: Store<fromProduct.State>,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.store
      .pipe(select(productSelectors.getCurrentProduct))
      .subscribe(currentProduct => (this.selectedProduct = currentProduct));

    // this.productService
    //   .getProducts()
    //   .subscribe(
    //     (products: Product[]) => (this.products = products),
    //     (err: any) => (this.errorMessage = err.error)
    //   );
    this.store.dispatch(new productAction.Load());
    this.store
      .pipe(select(productSelectors.getProducts))
      .subscribe((products: Product[]) => (this.products = products));

    // TODO: Unsubscribe
    this.store
      .pipe(select(productSelectors.getShowProductCode))
      .subscribe(showProductCode => (this.displayCode = showProductCode));
  }

  ngOnDestroy(): void {}

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
