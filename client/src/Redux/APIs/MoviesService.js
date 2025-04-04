import Axios from "./Axios";

/* ********************* PUBLIC APIs ****************************** */

//get all movies API function
const getAllMoviesService = async (
  category,
  time,
  language,
  rate,
  year,
  search,
  pageNumber
) => {
  const { data } = await Axios.get(
    `/movies?category=${category}&time=${time}&language=${language}&rate=${rate}&year=${year}&search=${search}&pageNumber=${pageNumber}`
  );
  return data;
};

//get random movies API function
const getRandomMoviesService = async () => {
  const { data } = await Axios.get(`/movies/random/all`);
  return data;
};

//get movie by id API function
const getMovieByIdService = async (id) => {
  const { data } = await Axios.get(`/movies/${id}`);
  return data;
};

//get top rated movie by id API function
const getTopRatedMovieService = async () => {
  const { data } = await Axios.get(`/movies/rated/top`);
  return data;
};

//review movie API function
const reviewMovieService = async (token, id, review) => {
  const { data } = await Axios.post(`/movies/${id}/reviews`, review, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

//delete movie API function
const deleteMovieService = async (token, id) => {
  const { data } = await Axios.delete(`/movies/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

//delete all movie API function
const deleteAllMoviesService = async (token) => {
  const { data } = await Axios.delete(`/movies`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

//create movie API function
const createMovieService=async(token,movie)=>{
  const {data}=await Axios.post(`/movies`,movie,{
    headers:{
      Authorization:`Bearer ${token}`,
    },
  });
  return data;
};

//update movie API function
const updateMovieService=async(token,id,movie)=>{
const {data}=await Axios.put(`/movies/${id}`,movie,{
  headers:{
    Authorization:`Bearer ${token}`,
  },
});
return data;
};

export {
  getAllMoviesService,
  getRandomMoviesService,
  getMovieByIdService,
  getTopRatedMovieService,
  reviewMovieService,
  deleteMovieService,
  deleteAllMoviesService,
  createMovieService,
  updateMovieService
};
