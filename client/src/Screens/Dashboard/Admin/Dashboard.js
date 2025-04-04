import React, { useEffect } from "react";
import SideBar from "../SideBar";
import { FaRegListAlt, FaUser } from "react-icons/fa";
import { HiViewGridAdd } from "react-icons/hi";
import Table from "../../../Components/Table";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getAllUsersAction } from "../../../Redux/Actions/UserActions";
import {
  deleteMovieAction,
  getAllMoviesAction,
} from "../../../Redux/Actions/MoviesActions";
import { getAllCategoriesAction } from "../../../Redux/Actions/CategoriesActions";
import Loader from "../../../Components/Notification/Loader";
import { Empty } from "../../../Components/Notification/Empty";

function Dashboard() {
  const dispatch = useDispatch();
  const {
    isLoading: catLoading,
    isError: catError,
    categories,
  } = useSelector((state) => state.categoryGetAll);

  const {
    isLoading: userLoading,
    isError: userError,
    users,
  } = useSelector((state) => state.adminGetAllUsers);

  //delete movies
  const { isLoading: deleteLoading, isError: deleteError } = useSelector(
    (state) => state.deleteMovie
  );

  const { isLoading, isError, movies, totalMovies } = useSelector(
    (state) => state.getAllMovies
  );

  //delete movie handler
  const deleteMovieHandler = (id) => {
    window.confirm("Are you sure you want to delete this movie?") &&
      dispatch(deleteMovieAction(id));
  };

  useEffect(() => {
    //get all users
    dispatch(getAllUsersAction());
    //get all movies
    dispatch(getAllMoviesAction({}));
    //get all categories
    dispatch(getAllCategoriesAction());

    //errors
    if (catError || isError || userError || deleteError) {
      toast.error(catError || isError || userError || deleteError);
    }
  }, [dispatch, isError, catError, userError, deleteError]);

  //dashboard datas
  const DashboardData = [
    {
      bg: "bg-orange-600",
      icon: FaRegListAlt,
      title: "Total Movies",
      total: isLoading ? "Loading.." : totalMovies || 0,
    },
    {
      bg: "bg-blue-700",
      icon: HiViewGridAdd,
      title: "Total Categories",
      total: catLoading ? "Loading.." : categories?.length || 0,
    },
    {
      bg: "bg-green-600",
      icon: FaUser,
      title: "Total Users",
      total: userLoading ? "Loading.." : users?.length || 0,
    },
  ];
  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {DashboardData.map((data, index) => (
            <div
              key={index}
              className="p-4 rounded bg-main border-border grid grid-cols-4 gap-2"
            >
              <div
                className={`col-span-1 rounded-full h-12 w-12 flex-colo ${data.bg}`}
              >
                <data.icon className="text-2xl text-white" />
              </div>
              <div className="col-span-3">
                <h2>{data.title}</h2>
                <p className="text-text mt-2 font-bold">{data.total}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <h3 className="text-md font-medium italic my-6">Recent Movies</h3>
      {isLoading || deleteLoading ? (
        <Loader />
      ) : movies.length > 0 ? (
        <Table data={movies.slice(0, 5)} admin={true} onDeleteHandler={deleteMovieHandler} />
      ) : (
        <Empty message="You have no recent movies" />
      )}
    </SideBar>
  );
}

export default Dashboard;
