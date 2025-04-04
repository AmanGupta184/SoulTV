import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import { Input, Message, Select } from "../../../Components/UserInputs";
import Uploader from "../../../Components/Uploader";
import { ImUpload } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { MovieValidation } from "../../../Components/Validation/MovieValidation";
import { InlineError } from "../../../Components/Notification/Error";
import { ImagePreview } from "../../../Components/ImagePreview";
import {
  getMovieByIdAction,
  updateMovieAction,
} from "../../../Redux/Actions/MoviesActions";
import Loader from "../../../Components/Notification/Loader";
import { RiMovie2Line } from "react-icons/ri";

function EditMovie() {
  const sameClass = `w-full gap-6 flex-colo min-h-screen`;
  const [imageWithoutTitle, setImageWithoutTitle] = useState("");
  const [imageTitle, setImageTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  //get all categories
  const { categories } = useSelector((state) => state.categoryGetAll);

  const { isLoading, isError, movie } = useSelector(
    (state) => state.getMovieById
  );
  const {
    isLoading: editLoading,
    isError: editError,
    isSuccess,
  } = useSelector((state) => state.updateMovie);

  //validate User
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(MovieValidation) });

  //on submit
  const onSubmit = (data) => {
    dispatch(
      updateMovieAction(movie?._id, {
        ...data,
        image: imageWithoutTitle,
        titleImage: imageTitle,
        video: videoUrl,
      })
    );
  };

  //useEffect
  useEffect(() => {
    if (movie?._id !== id) {
      dispatch(getMovieByIdAction(id));
    } else {
      setValue("name", movie?.name);
      setValue("time", movie?.time);
      setValue("language", movie?.language);
      setValue("year", movie?.year);
      setValue("category", movie?.category);
      setValue("desc", movie?.desc);
      setImageWithoutTitle(movie?.image);
      setImageTitle(movie?.titleImage);
      setVideoUrl(movie?.video);
    }
    if (isSuccess) {
      dispatch({ type: "UPDATE_MOVIE_RESET" });
      navigate(`/edit/${id}`);
    }

    if (editError) {
      toast.error(editError);
      dispatch({ type: "UPDATE_MOVIE_RESET" });
    }
  }, [dispatch, id, movie, setValue, isSuccess, editError, navigate]);

  return (
    <SideBar>
      {isLoading ? (
          <Loader />
      ) : isError ? (
        <div className={sameClass}>
          <div className="flex-colo w-24 h-24 p-5 mb-4 rounded-full bg-dry text-subMain text-4xl">
            <RiMovie2Line />
          </div>
          <p className="text-border text-sm">{isError}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold">Edit "{movie?.name}"</h2>
          <div className="w-full grid md:grid-cols-2 gap-6">
            <div className="w-full">
              <Input
                label="Movie Title"
                placeholder="Eg: Game of Thrones"
                type="text"
                bg={true}
                name="name"
                register={{ ...register("name") }}
              />
              {errors.name && <InlineError text={errors.name.message} />}
            </div>
            <div className="w-full">
              <Input
                label="Hours"
                placeholder="Eg: 2hr"
                type="number"
                bg={true}
                name="time"
                register={{ ...register("time") }}
              />
              {errors.time && <InlineError text={errors.time.message} />}
            </div>
          </div>
          <div className="w-full grid md:grid-cols-2 gap-6">
            <div className="w-full">
              <Input
                label="Language Used"
                placeholder="Eg: English"
                type="text"
                bg={true}
                name="language"
                register={{ ...register("language") }}
              />
              {errors.language && (
                <InlineError text={errors.language.message} />
              )}
            </div>
            <div className="w-full">
              <Input
                label="Year of Release"
                placeholder="Eg: 2024"
                type="number"
                bg={true}
                name="year"
                register={{ ...register("year") }}
              />
              {errors.time && <InlineError text={errors.time.message} />}
            </div>
          </div>
          <div className="w-full grid md:grid-cols-2 gap-6">
            {/*image without title */}
            <div className="flex flex-col gap-2">
              <p className="text-border font-semibold text-sm">
                Image Without Title
              </p>
              <Uploader setImageUrl={setImageWithoutTitle} />
              <ImagePreview
                image={imageWithoutTitle}
                name="imageWithoutTitle"
              />
            </div>
            {/*image with title */}
            <div className="flex flex-col gap-2">
              <p className="text-border font-semibold text-sm">
                Image With Title
              </p>
              <Uploader setImageUrl={setImageTitle} />
              <ImagePreview image={imageTitle} name="imageTitle" />
            </div>
          </div>
          {/*Description */}
          <div className="w-full">
            <Message
              label="Movie Description"
              placeholder="Make it short and sweet"
              name="desc"
              register={{ ...register("desc") }}
            />
            {errors.desc && <InlineError text={errors.desc.message} />}
          </div>
          {/*Categories */}
          <div className="text-sm w-full">
            <Select
              label="Movie Categories"
              options={categories?.length > 0 ? categories : []}
              name="category"
              register={{ ...register("category") }}
            />
            {errors.category && <InlineError text={errors.category.message} />}
          </div>
          {/*Movie Video */}
          <div className="flex flex-col gap-2 w-full">
            <label className="text-border font-semibold text-sm">
              Movie Video
            </label>
            <div
              className={`w-full grid ${videoUrl && "md:grid-cols-2"} gap-6`}
            >
              {videoUrl && (
                <div className="w-full bg-main text-sm text-subMain py-4 border border-border rounded flex-colo">
                  Video Uploaded!!!
                </div>
              )}
              <Uploader setImageUrl={setVideoUrl} />
            </div>
          </div>
          {/*SUBMIT */}
          <div className="flex justify-end items-center my-4">
            <button
              disabled={isLoading || !imageTitle || !imageWithoutTitle}
              onClick={handleSubmit(onSubmit)}
              className="bg-subMain w-full flex-rows gap-6 font-medium text-white py-4 rounded"
            >
              {isLoading ? (
                "Updating..."
              ) : (
                <>
                  <ImUpload />
                  Update Movie
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </SideBar>
  );
}

export default EditMovie;
