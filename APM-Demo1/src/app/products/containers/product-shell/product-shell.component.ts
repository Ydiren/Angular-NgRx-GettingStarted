import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Product } from '../../product';

/* NgRx */
import { Store, select } from '@ngrx/store';
import * as fromProduct from '../../state/product.state';
import * as productSelectors from '../../state/product.selectors';
import * as productAction from '../../state/product.actions';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './product-shell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductShellComponent implements OnInit {
  errorMessage$: Observable<string>;
  displayCode$: Observable<boolean>;
  products$: Observable<Product[]>;
  selectedProduct$: Observable<Product>;

  constructor(private store: Store<fromProduct.State>) {}

  ngOnInit(): void {
    this.store.dispatch(new productAction.Load());
    this.products$ = this.store.pipe(select(productSelectors.getProducts));
    this.errorMessage$ = this.store.pipe(select(productSelectors.getError));
    this.selectedProduct$ = this.store.pipe(
      select(productSelectors.getCurrentProduct)
    );
    this.displayCode$ = this.store.pipe(
      select(productSelectors.getShowProductCode)
    );
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

  deleteProduct(product: Product) {
    this.store.dispatch(new productAction.DeleteProduct(product.id));
  }

  clearProduct() {
    this.store.dispatch(new productAction.ClearCurrentProduct());
  }
  saveProduct(product: Product) {
    if (product.id === 0) {
      this.store.dispatch(new productAction.CreateProduct(product));
    } else {
      this.store.dispatch(new productAction.UpdateProduct(product));
    }
  }
}
