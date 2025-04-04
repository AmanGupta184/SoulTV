import * as yup from "yup";

//login validation
const LoginValidation = yup.object().shape({
  email: yup.string().email().required("Email is required").trim(),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be atleast 6 characters")
    .max(20, "Password must be less than 20 charcters")
    .matches(/(?=.*[0-9])/, "Password must contain a number"),
});

//register validation
const RegisterValidation = yup.object().shape({
  email: yup.string().email().required("Email is required").trim(),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be atleast 6 characters")
    .max(20, "Password must be less than 20 charcters")
    .matches(/(?=.*[0-9])/, "Password must contain a number"),
  fullname: yup
    .string()
    .required("Full name is required")
    .max(20, "Full name must be less than 20 character")
    .matches(
      /^[A-Z][a-z]+(\s[A-Z][a-z]?){0,}/,
      "Full name must contain only letters"
    ),
});

//Profile Validation
const ProfileValidation = yup.object().shape({
  fullname: yup
    .string()
    .required("Full name is required")
    .max(20, "Full name must be less than 20 character")
    .matches(
      /^[A-Z][a-z]+(\s[A-Z][a-z]?){0,}/,
      "Full name must contain only letters"
    ),
  email: yup.string().email().required("Email is required").trim(),
});

//Password Validation
const PasswordValidation = yup.object().shape({
  oldPassword: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be atleast 6 characters")
    .max(20, "Password must be less than 20 charcters")
    .matches(/(?=.*[0-9])/, "Password must contain a number"),
  newPassword: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be atleast 6 characters")
    .max(20, "Password must be less than 20 charcters")
    .matches(/(?=.*[0-9])/, "Password must contain a number"),
  confirmPassword: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be atleast 6 characters")
    .max(20, "Password must be less than 20 charcters")
    .matches(/(?=.*[0-9])/, "Password must contain a number")
    .oneOf([yup.ref("newPassword"),null],"Passwords must match"),
});

export {
  LoginValidation,
  RegisterValidation,
  ProfileValidation,
  PasswordValidation,
};
