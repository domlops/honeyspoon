export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case "PRODUCT_LIST_REQUEST":
      return { loading: true, products: [] };

    case "PRODUCT_LIST_SUCCESS":
      return {
        loading: false,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
      };

    case "PRODUCT_LIST_FAIL":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = { product: { variations: [{}], related: [{}], similar: [{}] } },
  action
) => {
  switch (action.type) {
    case "PRODUCT_DETAILS_REQUEST":
      return { loading: true, ...state };

    case "PRODUCT_DETAILS_SUCCESS":
      return {
        loading: false,
        product: action.payload,
      };

    case "PRODUCT_DETAILS_FAIL":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const variationDetailsReducer = (state = { variation: {} }, action) => {
  switch (action.type) {
    case "VARIATION_DETAILS_REQUEST":
      return { loading: true, ...state };

    case "VARIATION_DETAILS_SUCCESS":
      return {
        loading: false,
        variation: action.payload,
      };

    case "VARIATION_DETAILS_FAIL":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case "PRODUCT_CREATE_REQUEST":
      return { loading: true };

    case "PRODUCT_CREATE_SUCCESS":
      return { loading: false, success: true, product: action.payload };

    case "PRODUCT_CREATE_FAIL":
      return { loading: false, error: action.payload };

    case "PRODUCT_CREATE_RESET":
      return {};

    default:
      return state;
  }
};

export const variationCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case "VARIATION_CREATE_REQUEST":
      return { loading: true };

    case "VARIATION_CREATE_SUCCESS":
      return { loading: false, success: true, variation: action.payload };

    case "VARIATION_CREATE_FAIL":
      return { loading: false, error: action.payload };

    case "VARIATION_CREATE_RESET":
      return {};

    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case "PRODUCT_DELETE_REQUEST":
      return { loading: true };

    case "PRODUCT_DELETE_SUCCESS":
      return { loading: false, success: true };

    case "PRODUCT_DELETE_FAIL":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const variationDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case "VARIATION_DELETE_REQUEST":
      return { loading: true };

    case "VARIATION_DELETE_SUCCESS":
      return { loading: false, success: true };

    case "VARIATION_DELETE_FAIL":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const productUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case "PRODUCT_UPDATE_REQUEST":
      return { loading: true };

    case "PRODUCT_UPDATE_SUCCESS":
      return { loading: false, success: true, product: action.payload };

    case "PRODUCT_UPDATE_FAIL":
      return { loading: false, error: action.payload };

    case "PRODUCT_UPDATE_RESET":
      return { product: {} };

    default:
      return state;
  }
};

export const variationUpdateReducer = (state = { variation: {} }, action) => {
  switch (action.type) {
    case "VARIATION_UPDATE_REQUEST":
      return { loading: true };

    case "VARIATION_UPDATE_SUCCESS":
      return { loading: false, success: true, variation: action.payload };

    case "VARIATION_UPDATE_FAIL":
      return { loading: false, error: action.payload };

    case "VARIATION_UPDATE_RESET":
      return { variation: {} };

    default:
      return state;
  }
};

export const productReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case "PRODUCT_CREATE_REVIEW_REQUEST":
      return { loading: true };

    case "PRODUCT_CREATE_REVIEW_SUCCESS":
      return { loading: false, success: true };

    case "PRODUCT_CREATE_REVIEW_FAIL":
      return { loading: false, error: action.payload };

    case "PRODUCT_CREATE_REVIEW_RESET":
      return {};

    default:
      return state;
  }
};

export const productAdminReducer = (
  state = { product: { variations: [{}], sub_categories: [] } },
  action
) => {
  switch (action.type) {
    case "PRODUCT_ADMIN_REQUEST":
      return { loading: true, ...state };

    case "PRODUCT_ADMIN_SUCCESS":
      return { loading: false, product: action.payload };

    case "PRODUCT_ADMIN_FAIL":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
