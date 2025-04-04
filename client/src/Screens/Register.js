import React, { useEffect } from "react";
import Layout from "../Layout/Layout";
import { Input } from "../Components/UserInputs";
import { Link, useNavigate } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { RegisterValidation } from "../Components/Validation/UserValidation";
import { InlineError } from "../Components/Notification/Error";
import { registerAction } from "../Redux/Actions/UserActions";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isError, userInfo, isSuccess } = useSelector(
    (state) => state.userRegister
  );

  //validate User
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(RegisterValidation) });

  //on submit
  const onSubmit = (data) => {
    dispatch(registerAction(data));
  };

  //useEffect
  useEffect(() => {
    if (userInfo?.isAdmin) {
      navigate("/dashboard");
    } else if (userInfo) {
      navigate("/profile");
    }
    if (isSuccess) {
      toast.success(`Welcome ${userInfo?.fullname}`);
      dispatch({ type: "USER_REGISTER_RESET" });
    }
    if (isError) {
      toast.error(isError);
      dispatch({ type: "USER_REGISTER_RESET" });
    }
  }, [userInfo, isSuccess, isError, navigate, dispatch]);

  return (
    <Layout>
      <div className="container mx-auto px-2 my-24 flex-colo">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full 2xl:w-2/5 gap-8 flex-colo p-8 sm:p-14 md:w-3/5 bg-dry rounded-lg border border-border"
        >
          <img
            src="/images/logo.png"
            alt="logo"
            className="w-full h-12 object-contain"
          />
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
          <div className="w-full">
            <Input
              label="Password"
              placeholder="**********"
              type="password"
              name="password"
              register={register("password")}
              bg={true}
            />
            {errors.password && <InlineError text={errors.password.message} />}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-subMain transitions hover:bg-main flex-rows gap-4 text-white p-4 rounded-lg w-9/12"
          >
            {
              //if loading show loading
              isLoading ? (
                "Loading..."
              ) : (
                <>
                  <FiLogIn />
                  Sign Up
                </>
              )
            }
          </button>
          <p className="text-center text-border">
            Already have an account?{" "}
            <Link to="/login" className="text-dryGray font-semibold ml-2">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </Layout>
  );
}

export default Register;
