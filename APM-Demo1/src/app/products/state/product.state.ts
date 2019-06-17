import { Product } from '../product';
import * as fromRoot from '../../state/app.state';

export interface State extends fromRoot.State {
  products: ProductState;
}

export interface ProductState {
  showProductCode: boolean;
  currentProductId: number | null;
  products: Product[];
  error: string;
}

export const initialState: ProductState = {
  currentProductId: null,
  showProductCode: true,
  products: [],
  error: ''
};
