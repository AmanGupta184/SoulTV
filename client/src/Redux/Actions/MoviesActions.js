import * as MoviesConstants from "../Constants/MoviesConstants";
import * as moviesAPI from "../APIs/MoviesService";
import { ErrorsAction, tokenProtection } from "../Protection";
import toast from "react-hot-toast";

//Get All Movies Action
const getAllMoviesAction =
  ({
    category = "",
    time = "",
    language = "",
    rate = "",
    year = "",
    search = "",
    pageNumber = "",
  }) =>
  async (dispatch) => {
    try {
      dispatch({ type: MoviesConstants.MOVIES_LIST_REQUEST });
      const response = await moviesAPI.getAllMoviesService(
        category,
        time,
        language,
        rate,
        year,
        search,
        pageNumber
      );
      dispatch({
        type: MoviesConstants.MOVIES_LIST_SUCCESS,
        payload: response,
      });
    } catch (error) {
      ErrorsAction(error, dispatch, MoviesConstants.MOVIES_LIST_FAIL);
    }
  };

//get random movies action
const getRandomMoviesAction = () => async (dispatch) => {
  try {
    dispatch({ type: MoviesConstants.MOVIES_RANDOM_FAIL });
    const response = await moviesAPI.getRandomMoviesService();
    dispatch({
      type: MoviesConstants.MOVIES_RANDOM_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, MoviesConstants.MOVIES_RANDOM_FAIL);
  }
};

//get movie by id action
const getMovieByIdAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: MoviesConstants.MOVIES_DETAILS_REQUEST });
    const response = await moviesAPI.getMovieByIdService(id);
    dispatch({
      type: MoviesConstants.MOVIES_DETAILS_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, MoviesConstants.MOVIES_DETAILS_FAIL);
  }
};

//get top rated movie action
const getTopRatedMovieAction = () => async (dispatch) => {
  try {
    dispatch({ type: MoviesConstants.MOVIES_TOP_RATED_REQUEST });
    const response = await moviesAPI.getTopRatedMovieService();
    dispatch({
      type: MoviesConstants.MOVIES_TOP_RATED_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, MoviesConstants.MOVIES_TOP_RATED_FAIL);
  }
};

//create review action
const createReviewAction =
  ({ id, review }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: MoviesConstants.CREATE_REVIEW_REQUEST });
      const response = await moviesAPI.reviewMovieService(
        tokenProtection(getState),
        id,
        review
      );
      dispatch({
        type: MoviesConstants.CREATE_REVIEW_SUCCESS,
        payload: response,
      });
      toast.success("Review Added Successfully");
      dispatch({ type: MoviesConstants.CREATE_REVIEW_RESET });
      dispatch(getMovieByIdAction(id));
    } catch (error) {
      ErrorsAction(error, dispatch, MoviesConstants.CREATE_REVIEW_FAIL);
    }
  };

//delete movie action
const deleteMovieAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: MoviesConstants.DELETE_MOVIE_REQUEST });
    const response = await moviesAPI.deleteMovieService(
      tokenProtection(getState),
      id
    );
    dispatch({ type: MoviesConstants.DELETE_MOVIE_SUCCESS, payload: response });
    toast.success("Movie deleted Successfully");
    dispatch({ type: MoviesConstants.DELETE_MOVIE_RESET });
    dispatch(getAllMoviesAction({}));
  } catch (error) {
    ErrorsAction(error, dispatch, MoviesConstants.DELETE_MOVIE_FAIL);
  }
};

//delete all movies action
const deleteAllMoviesAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: MoviesConstants.DELETE_ALL_MOVIES_REQUEST });
    const response = await moviesAPI.deleteAllMoviesService(
      tokenProtection(getState)
    );
    dispatch({
      type: MoviesConstants.DELETE_ALL_MOVIES_SUCCESS,
      payload: response,
    });
    toast.success("Movie deleted Successfully");
    dispatch({ type: MoviesConstants.DELETE_ALL_MOVIES_RESET });
    dispatch(getAllMoviesAction({}));
  } catch (error) {
    ErrorsAction(error, dispatch, MoviesConstants.DELETE_ALL_MOVIES_FAIL);
  }
};

//create movie action
const createMovieAction=(movie)=>async(dispatch,getState)=>{
try {
  dispatch({type:MoviesConstants.CREATE_MOVIE_REQUEST});
  const response=await moviesAPI.createMovieService(tokenProtection(getState),movie);
  dispatch({type:MoviesConstants.CREATE_MOVIE_SUCCESS,payload:response});
  toast.success("Movie Created successfully");
} catch (error) {
  ErrorsAction(error, dispatch, MoviesConstants.CREATE_MOVIE_FAIL);
}
};

//update movie action
const updateMovieAction=(id,movie)=>async(dispatch,getState)=>{
  try {
    dispatch({type:MoviesConstants.UPDATE_MOVIE_REQUEST});
    const response=await moviesAPI.updateMovieService(tokenProtection(getState),id,movie);
    dispatch({type:MoviesConstants.UPDATE_MOVIE_SUCCESS,payload:response});
    toast.success("Movie Updated successfully");
  } catch (error) {
    ErrorsAction(error, dispatch, MoviesConstants.UPDATE_MOVIE_FAIL);
  }
  };

export {
  getAllMoviesAction,
  getRandomMoviesAction,
  getMovieByIdAction,
  getTopRatedMovieAction,
  createReviewAction,
  deleteMovieAction,
  deleteAllMoviesAction,
  createMovieAction,
  updateMovieAction
};
