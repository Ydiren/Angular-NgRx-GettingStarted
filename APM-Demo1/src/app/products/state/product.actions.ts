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

export interface ProductAction extends Action {
  execute(state: ProductState): ProductState;
}
export class ToggleProductCode implements ProductAction {
  readonly type = ProductActionTypes.ToggleProductCode;

  constructor(public payload: boolean) {}

  execute(state: ProductState) {
    return {
      ...state,
      showProductCode: this.payload
    } as ProductState;
  }
}

export class SetCurrentProduct implements ProductAction {
  readonly type = ProductActionTypes.SetCurrentProduct;

  constructor(public payload: Product) {}

  execute(state: ProductState): ProductState {
    return {
      ...state,
      currentProduct: { ...this.payload }
    };
  }
}

export class ClearCurrentProduct implements ProductAction {
  readonly type = ProductActionTypes.ClearCurrentProduct;

  execute(state: ProductState): ProductState {
    return {
      ...state,
      currentProduct: null
    };
  }
}

export class InitializeCurrentProduct implements ProductAction {
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

export class Load implements ProductAction {
  readonly type = ProductActionTypes.Load;

  execute(state: ProductState): ProductState {
    return state;
  }
}

export class LoadSuccess implements ProductAction {
  readonly type = ProductActionTypes.LoadSuccess;

  constructor(public payload: Product[]) {}

  execute(state: ProductState): ProductState {
    return state;
  }
}

export class LoadFail implements ProductAction {
  readonly type = ProductActionTypes.LoadFail;

  constructor(public payload: string) {}

  execute(state: ProductState): ProductState {
    return state;
  }
}
