import * as yup from "yup";

const ReviewValidation = yup.object().shape({
  comment: yup
    .string()
    .required("Comment is required")
    .max(150, "Comment should be less than 150 characters"),
  rating: yup.number().required("Select a rating"),
});

const MovieValidation = yup.object().shape({
  name: yup
    .string()
    .required("Please enter a movie name")
    .max(50, "Movie name should be less than 50 characters"),
  time: yup.number().required("Please enter a movie duration"),
  language: yup.string().required("Please enter a movie language"),
  year: yup.number().required("Please enter year of release"),
  category: yup.string().required("please select movie category"),
  desc: yup
    .string()
    .required("Please enter a movie description")
    .max(1000, "Movie description should be less than 1000 characters"),
});

export { ReviewValidation, MovieValidation };
