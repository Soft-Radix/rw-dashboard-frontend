import * as Yup from "yup";

const noSpaceMessage = "No spaces allowed";

const emailField = {
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"), // Check for a valid email structure
};

/**
 * Login Validation Schema
 */
const loginSchema = Yup.object({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const forgotPasswordSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .matches(/^\S+$/, noSpaceMessage), // Disallow spaces
});

const resetPassSchema = Yup.object({
  password: Yup.string()
    .required("Password is required") // Field is required
    .min(6, "Password must be at least 6 characters long"), // Minimum 6 characters

  cnfPassword: Yup.string()
    .required("Confirm password is required") // Field is required
    .oneOf([Yup.ref("password"), null], "Passwords must match"), // Must match the password field
});

const addClientSchema = Yup.object({
  first_name: Yup.string()
    .required("First name is required")
    .matches(/^\S+$/, noSpaceMessage), // Disallow spaces
  last_name: Yup.string()
    .required("Last name is required")
    .matches(/^\S+$/, noSpaceMessage), // Disallow spaces
  ...emailField,
  company_name: Yup.string().required("Compnay name is required"),
});

const addAgentSchema = Yup.object({
  first_name: Yup.string()
    .required("First name is required")
    .matches(/^\S+$/, noSpaceMessage), // Disallow spaces
  last_name: Yup.string()
    .required("Last name is required")
    .matches(/^\S+$/, noSpaceMessage), // Disallow spaces
  ...emailField,
  company_name: Yup.string().required("Compnay name is required"),
});

export {
  loginSchema,
  forgotPasswordSchema,
  resetPassSchema,
  addClientSchema,
  addAgentSchema,
};
