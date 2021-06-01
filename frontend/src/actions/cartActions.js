import axios from "axios";

export const addToCart = (id, vary) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: "CART_ADD_ITEM",
    payload: {
      product: data._id,
      name: data.name,
      index: vary,
      variation: data.variations[vary],
      qty: 1,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const addSameItem = (id, vary, nqty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: "CART_ADD_ITEM",
    payload: {
      product: data._id,
      name: data.name,
      index: vary,
      variation: data.variations[vary],
      qty: nqty,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (pin) => (dispatch, getState) => {
  dispatch({
    type: "CART_REMOVE_ITEM",
    payload: pin,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShipping = (data) => (dispatch) => {
  dispatch({
    type: "CART_SAVE_SHIPPING",
    payload: data,
  });

  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: "CART_SAVE_PAYMENT",
    payload: data,
  });

  localStorage.setItem("paymentMethod", JSON.stringify(data));
};
