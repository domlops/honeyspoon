export const cartReducer = (
  state = { shippingAddress: [], cartItems: [] },
  action
) => {
  switch (action.type) {
    case "CART_ADD_ITEM":
      const item = action.payload;
      const existItem = state.cartItems.find(
        (x) =>
          x.product === item.product && x.variation.name === item.variation.name
      );

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product &&
            x.variation.name === existItem.variation.name
              ? item
              : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case "CART_REMOVE_ITEM":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (x) => x.variation.remove_pin !== action.payload
        ),
      };

    case "CART_SAVE_SHIPPING":
      return {
        ...state,
        shippingAddress: action.payload,
      };

    case "CART_SAVE_PAYMENT":
      return {
        ...state,
        paymentMethod: action.payload,
      };

    case "CART_CLEAR":
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};
