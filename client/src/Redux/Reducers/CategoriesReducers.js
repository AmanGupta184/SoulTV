import * as categoriesConstants from "../Constants/CategoriesConstants";

//GET ALL CATEGORIES
export const getAllCategoriesReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case categoriesConstants.GET_ALL_CATEGORIES_REQUEST:
      return { isLoading: true };
    case categoriesConstants.GET_ALL_CATEGORIES_SUCCESS:
      return { isLoading: false, categories: action.payload };
    case categoriesConstants.GET_ALL_CATEGORIES_FAIL:
      return { isLoading: false, isError: action.payload };
    case categoriesConstants.GET_ALL_CATEGORIES_RESET:
      return {};
    default:
      return state;
  }
};

//CREATE CATEGORY
export const createCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case categoriesConstants.CREATE_CATEGORY_REQUEST:
      return { isLoading: true };
    case categoriesConstants.CREATE_CATEGORY_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case categoriesConstants.CREATE_CATEGORY_FAIL:
      return { isLoading: false, isError: action.payload };
    case categoriesConstants.CREATE_CATEGORY_RESET:
      return {};
    default:
      return state;
  }
};

//UPDATE CATEGORY
export const updateCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case categoriesConstants.UPDATE_CATEGORY_REQUEST:
      return { isLoading: true };
    case categoriesConstants.UPDATE_CATEGORY_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case categoriesConstants.UPDATE_CATEGORY_FAIL:
      return { isLoading: false, isError: action.payload };
    case categoriesConstants.UPDATE_CATEGORY_RESET:
      return {};
    default:
      return state;
  }
};

//DELETE CATEGORY
export const deleteCategoryReducer = (state = {}, action) => {
    switch (action.type) {
      case categoriesConstants.DELETE_CATEGORY_REQUEST:
        return { isLoading: true };
      case categoriesConstants.DELETE_CATEGORY_SUCCESS:
        return { isLoading: false, isSuccess: true };
      case categoriesConstants.DELETE_CATEGORY_FAIL:
        return { isLoading: false, isError: action.payload };
      case categoriesConstants.DELETE_CATEGORY_RESET:
        return {};
      default:
        return state;
    }
  };