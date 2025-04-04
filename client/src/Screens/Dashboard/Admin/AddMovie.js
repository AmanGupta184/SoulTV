import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import { Input, Message, Select } from "../../../Components/UserInputs";
import Uploader from "../../../Components/Uploader";
import { ImUpload } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { MovieValidation } from "../../../Components/Validation/MovieValidation";
import { InlineError } from "../../../Components/Notification/Error";
import { ImagePreview } from "../../../Components/ImagePreview";
import { createMovieAction } from "../../../Redux/Actions/MoviesActions";

function AddMovie() {
  const [imageWithoutTitle, setImageWithoutTitle] = useState("");
  const [imageTitle, setImageTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //get all categories
  const { categories } = useSelector((state) => state.categoryGetAll);

  const { isLoading, isError, isSuccess } = useSelector(
    (state) => state.createMovie
  );

  //validate User
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(MovieValidation) });

  //on submit
  const onSubmit = (data) => {
    dispatch(createMovieAction({...data,image:imageWithoutTitle,titleImage:imageTitle,video:videoUrl}));
  };

  //useEffect
  useEffect(() => {
    if (isSuccess) {
      reset({
        name: "",
        time:0,
        language: "",
        year:0,
        category: "",
        desc: "",
      });
      setImageTitle("");
      setImageWithoutTitle("");
      setVideoUrl("");
      dispatch({ type: "CREATE_MOVIE_RESET" });
      navigate("/addMovie");
    }

    if (isError) {
      toast.error(isError);
      dispatch({ type: "CREATE_MOVIE_RESET" });
    }
  }, [isSuccess, isError, dispatch, reset, navigate]);

  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold">Create Movie</h2>
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
            {errors.language && <InlineError text={errors.language.message} />}
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
            <ImagePreview image={imageWithoutTitle} name="imageWithoutTitle" />
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
          <div className={`w-full grid ${videoUrl && "md:grid-cols-2"} gap-6`}>
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
            disabled={
              isLoading||!imageTitle||!imageWithoutTitle
            }
            onClick={handleSubmit(onSubmit)}
            className="bg-subMain w-full flex-rows gap-6 font-medium text-white py-4 rounded"
          >
            {isLoading ? (
              "Please wait..."
            ) : (
              <>
                <ImUpload />
                Publish Movie
              </>
            )}
          </button>
        </div>
      </div>
    </SideBar>
  );
}

export default AddMovie;
