import { combineReducers, configureStore } from "@reduxjs/toolkit";
import * as User from "./Reducers/UserReducers";
import * as Category from "./Reducers/CategoriesReducers";
import * as Movies from "./Reducers/MoviesReducers";

// Combine all individual reducers into a single rootReducer that will be used in the store.
const rootReducer = combineReducers({
  //user reducers
  userLogin: User.userLoginReducer,
  userRegister: User.userRegisterReducer,
  userUpdateProfile: User.userUpdateProfileReducer,
  userDeleteProfile: User.userDELETEProfileReducer,
  userChangePassword: User.userChangePasswordReducer,
  userGetFavoriteMovies: User.userGetFavoriteMoviesReducer,
  userDeleteFavoriteMovies: User.userDeleteFavoriteMoviesReducer,
  adminGetAllUsers: User.adminGetAllUsersReducer,
  adminDeleteUser: User.adminDeleteUserReducer,
  userLikeMovie: User.userLikeMovieReducer,

  //categories reducers
  categoryGetAll: Category.getAllCategoriesReducer,
  categoryCreate: Category.createCategoryReducer,
  categoryUpdate: Category.updateCategoryReducer,
  categoryDelete: Category.deleteCategoryReducer,

  //movies reducers
  getAllMovies: Movies.moviesListReducer,
  getRandomMovies: Movies.moviesRandomReducer,
  getMovieById: Movies.movieDetailsReducer,
  getTopRatedMovie: Movies.movieTopRatedReducer,
  createReview: Movies.createReviewReducer,
  deleteMovie: Movies.deleteMovieReducer,
  deleteAllMovies: Movies.deleteAllMoviesReducer,
  createMovie:Movies.createMovieReducer,
  updateMovie:Movies.updateMovieReducer,
});

//get userInfo from localStorage
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))// Retrieve the 'userInfo' object from localStorage, if it exists, and parse it into an object. 
  : null;// If 'userInfo' does not exist in localStorage, set it as 'null'.

//initialState
const initialState = {
  userLogin: { userInfo: userInfoFromStorage },// Set the initial state for user login, with 'userInfo' coming from localStorage.
};

export const store = configureStore({
  reducer: rootReducer,// Set the 'rootReducer' as the reducer for the store to combine all individual reducers.
  preloadedState: initialState,// Set the initial state for the Redux store, which will initialize the store with the provided 'initialState'.
});
