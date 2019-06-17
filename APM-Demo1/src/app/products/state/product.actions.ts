import { Action } from '@ngrx/store';
import { Product } from '../product';
import { ProductState } from './product.state';

export enum ProductActionTypes {
  ToggleProductCode = '[Product] Toggle Product Code',
  SetCurrentProduct = '[Product] Set Current Product',
  ClearCurrentProduct = '[Product] Clear Current Product',
  InitializeCurrentProduct = '[Product] Initialize Current Product',
  Load = '[Product] Load',
  LoadSuccess = '[Product] Load Success',
  LoadFail = '[Product] Load Fail'
}

export abstract class ProductAction implements Action {
  type: string;
  abstract execute(state: ProductState): ProductState;
}

export class ToggleProductCode extends ProductAction {
  readonly type = ProductActionTypes.ToggleProductCode;

  constructor(public payload: boolean) {
    super();
  }

  execute(state: ProductState) {
    return {
      ...state,
      showProductCode: this.payload
    } as ProductState;
  }
}

export class SetCurrentProduct extends ProductAction {
  readonly type = ProductActionTypes.SetCurrentProduct;

  constructor(public payload: Product) {
    super();
  }

  execute(state: ProductState): ProductState {
    return {
      ...state,
      currentProduct: { ...this.payload }
    };
  }
}

export class ClearCurrentProduct extends ProductAction {
  readonly type = ProductActionTypes.ClearCurrentProduct;

  execute(state: ProductState): ProductState {
    return {
      ...state,
      currentProduct: null
    };
  }
}

export class InitializeCurrentProduct extends ProductAction {
  readonly type = ProductActionTypes.InitializeCurrentProduct;

  execute(state: ProductState): ProductState {
    return {
      ...state,
      currentProduct: {
        id: 0,
        productName: '',
        productCode: 'New',
        description: '',
        starRating: 0
      } as Product
    };
  }
}

export class Load extends ProductAction {
  readonly type = ProductActionTypes.Load;

  execute(state: ProductState): ProductState {
    return state;
  }
}

export class LoadSuccess extends ProductAction {
  readonly type = ProductActionTypes.LoadSuccess;

  constructor(public payload: Product[]) {
    super();
  }

  execute(state: ProductState): ProductState {
    return {
      ...state,
      products: this.payload
    };
  }
}

export class LoadFail extends ProductAction {
  readonly type = ProductActionTypes.LoadFail;

  constructor(public payload: string) {
    super();
  }

  execute(state: ProductState): ProductState {
    return state;
  }
}
