import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import Uploader from "../../Components/Uploader";
import { Input } from "../../Components/UserInputs";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InlineError } from "../../Components/Notification/Error";
import { ProfileValidation } from "../../Components/Validation/UserValidation";
import { ImagePreview } from "../../Components/ImagePreview";
import {
  deleteProfileAction,
  updateProfileAction,
} from "../../Redux/Actions/UserActions";
import toast from "react-hot-toast";

function Profile({ children }) {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userLogin);
  const [ImageUrl, setImageUrl] = useState(userInfo ? userInfo.image : "");

  const { isLoading, isError, isSuccess } = useSelector(
    (state) => state.userUpdateProfile
  );

  const { isLoading: deleteLoading, isError: deleteError } = useSelector(
    (state) => state.userDeleteProfile
  );

  //validate User
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(ProfileValidation) });

  //update profile
  const onSubmit = (data) => {
    dispatch(updateProfileAction({ ...data, image: ImageUrl }));
  };

  //delete profile
  const deleteProfile = () => {
    window.confirm("Are you sure you want to delete your profile?") &&
      dispatch(deleteProfileAction());
  };

  //useEffect
  useEffect(() => {
    if (userInfo) {
      setValue("fullname", userInfo?.fullname);
      setValue("email", userInfo?.email);
    }
    if (isSuccess) {
      dispatch({ type: "USER_UPDATE_PROFILE_RESET" });
    }
    if (isError || deleteError) {
      toast.error(isError || deleteError);
    }
  }, [userInfo, setValue, isSuccess, isError, dispatch, deleteError]);

  return (
    <SideBar>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold">Profile</h2>
        <div className="w-full grid lg:grid-cols-12 gap-6">
          <div className="col-span-10">
            <Uploader setImageUrl={setImageUrl} />
          </div>
          {/*Image Preview*/}
          <div className="col-span-2">
            <ImagePreview
              image={ImageUrl}
              name={userInfo ? userInfo.fullname : "SoulTV"}
            />
          </div>
        </div>
        <div className="w-full">
          <Input
            label="FullName"
            placeholder="Enter your name"
            bg={true}
            name="fullname"
            register={register("fullname")}
          />
          {errors.fullname && <InlineError text={errors.fullname.message} />}
        </div>
        <div className="w-full">
          <Input
            name="email"
            label="Email"
            placeholder="soultv@gmail.com"
            register={register("email")}
            type="email"
            bg={true}
          />
          {errors.email && <InlineError text={errors.email.message} />}
        </div>
        <div className="flex gap-2 flex-wrap flex-col-reverse sm:flex-row justify-between items-center my-4">
          <button
            onClick={deleteProfile}
            disabled={deleteLoading || isLoading}
            className="bg-subMain font-medium transitions hover:bg-main border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto"
          >
            {isLoading ? "Deleting..." : "Delete Profile"}
          </button>
          <button className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto">
            {isLoading ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </form>
    </SideBar>
  );
}

export default Profile;
