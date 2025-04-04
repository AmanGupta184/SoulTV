import Axios from "./Axios";

/* ********************* PUBLIC APIs ****************************** */

//register new user API function
const registerService = async (user) => {
  const { data } = await Axios.post("/users", user);
  if (data) {
    localStorage.setItem("userInfo", JSON.stringify(data));
  }
  return data;
};

//logout user API function
const logoutService = () => {
  localStorage.removeItem("userInfo");
  return null;
};

//login user API function
const loginService = async (user) => {
  const { data } = await Axios.post("/users/login", user);
  if (data) {
    localStorage.setItem("userInfo", JSON.stringify(data));
  }
  return data;
};

/* ********************* PRIVATE APIs ****************************** */

//update profile API function
const updateProfileService = async (user, token) => {
  const { data } = await Axios.put("/users", user, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (data) {
    localStorage.setItem("userInfo", JSON.stringify(data));
  }
  return data;
};

//delete profile API function
const deleteProfileService = async (token) => {
  const { data } = await Axios.delete("/users", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (data) {
    localStorage.removeItem("userInfo");
  }
  return data;
};

//change password API function
const changePasswordService = async (user, token) => {
  const { data } = await Axios.put("/users/password", user, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

//get all favorite movies API function
const getFavoriteMoviesService = async (token) => {
  const { data } = await Axios.get("/users/favorites", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

//delete all favorite movies API function
const deleteFavoriteMoviesService = async (token) => {
  const { data } = await Axios.delete("/users/favorites", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

//liked movie API function
const likedMovieService=async(movieId,token)=>{
  const {data}=await Axios.post(`/users/favorites`,movieId,{
    headers:{
      Authorization:`Bearer ${token}`,
    },
  });
  return data;
}

/* ********************* ADMIN APIs ****************************** */

//admin get all users API function
const getAllUsersService = async (token) => {
  const { data } = await Axios.get("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

//admin delete user API function
const deleteUserService = async (id, token) => {
  const { data } = await Axios.delete(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export {
  registerService,
  loginService,
  logoutService,
  updateProfileService,
  deleteProfileService,
  changePasswordService,
  getFavoriteMoviesService,
  deleteFavoriteMoviesService,
  getAllUsersService,
  deleteUserService,
  likedMovieService
};
