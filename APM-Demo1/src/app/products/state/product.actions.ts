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
  LoadFail = '[Product] Load Fail',
  UpdateProduct = '[Product] Update Product',
  UpdateProductSuccess = '[Product] Update Product Success',
  UpdateProductFail = '[Product] Update Product Fail',
  CreateProduct = '[Product] Create Product',
  CreateProductSuccess = '[Product] Create Product Success',
  CreateProductFail = '[Product] Create Product Fail',
  DeleteProduct = '[Product] Delete Product',
  DeleteProductSuccess = '[Product] Delete Product Success',
  DeleteProductFail = '[Product] Delete Product Fail'
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
      currentProductId: this.payload.id
    };
  }
}

export class ClearCurrentProduct extends ProductAction {
  readonly type = ProductActionTypes.ClearCurrentProduct;

  execute(state: ProductState): ProductState {
    return {
      ...state,
      currentProductId: null
    };
  }
}

export class InitializeCurrentProduct extends ProductAction {
  readonly type = ProductActionTypes.InitializeCurrentProduct;

  execute(state: ProductState): ProductState {
    return {
      ...state,
      currentProductId: 0
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
      products: this.payload,
      error: ''
    };
  }
}

export class LoadFail extends ProductAction {
  readonly type = ProductActionTypes.LoadFail;

  constructor(public payload: string) {
    super();
  }

  execute(state: ProductState): ProductState {
    return {
      ...state,
      products: [],
      error: this.payload
    };
  }
}

export class UpdateProduct extends ProductAction {
  readonly type = ProductActionTypes.UpdateProduct;

  constructor(public payload: Product) {
    super();
  }

  execute(state: ProductState) {
    return state;
  }
}

export class UpdateProductSuccess extends ProductAction {
  readonly type = ProductActionTypes.UpdateProductSuccess;

  constructor(public payload: Product) {
    super();
  }

  execute(state: ProductState) {
    const updatedProducts = state.products.map(item =>
      this.payload.id === item.id ? this.payload : item
    );
    return {
      ...state,
      products: updatedProducts,
      currentProductId: this.payload.id,
      error: ''
    };
  }
}

export class UpdateProductFail extends ProductAction {
  readonly type = ProductActionTypes.UpdateProductFail;

  constructor(public payload: string) {
    super();
  }

  execute(state: ProductState) {
    return {
      ...state,
      error: this.payload
    };
  }
}

export class CreateProduct extends ProductAction {
  readonly type = ProductActionTypes.CreateProduct;

  constructor(public payload: Product) {
    super();
  }

  execute(state: ProductState): ProductState {
    return state;
  }
}

export class CreateProductSuccess extends ProductAction {
  readonly type = ProductActionTypes.CreateProductSuccess;

  constructor(public payload: Product) {
    super();
  }

  execute(state: ProductState): ProductState {
    return {
      ...state,
      currentProductId: this.payload.id,
      products: [...state.products, this.payload]
    };
  }
}

export class CreateProductFail extends ProductAction {
  readonly type = ProductActionTypes.CreateProductFail;

  constructor(public payload: string) {
    super();
  }

  execute(state: ProductState): ProductState {
    return {
      ...state,
      error: this.payload
    };
  }
}

export class DeleteProduct extends ProductAction {
  readonly type = ProductActionTypes.DeleteProduct;

  constructor(public payload: number) {
    super();
  }

  execute(state: ProductState): ProductState {
    return {
      ...state
    };
  }
}

export class DeleteProductSuccess extends ProductAction {
  readonly type = ProductActionTypes.DeleteProductSuccess;

  constructor(public payload: number) {
    super();
  }

  execute(state: ProductState): ProductState {
    return {
      ...state,
      currentProductId: null,
      products: state.products.filter(p => p.id !== this.payload)
    };
  }
}

export class DeleteProductFail extends ProductAction {
  readonly type = ProductActionTypes.DeleteProductFail;

  constructor(public payload: string) {
    super();
  }

  execute(state: ProductState): ProductState {
    return {
      ...state,
      error: this.payload
    };
  }
}
