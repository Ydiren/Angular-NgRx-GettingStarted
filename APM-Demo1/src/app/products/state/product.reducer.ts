import { initialState, ProductState } from './product.state';
import { ProductAction, ProductActionTypes } from './product.actions';

export function reducer(
  state = initialState,
  action: ProductAction
): ProductState {
  //   switch (action.type) {
  //     case 'TOGGLE_PRODUCT_CODE':
  //       return {
  //         ...state,
  //         showProductCode: action.payload
  //       };

  //     default:
  //       return state;
  //   }

  if (action instanceof ProductAction) {
    console.log('Action Type', action);

    return action.execute(state);
  }

  return state;
}
