import * as Yup from "yup";

const noSpaceMessage = "No spaces allowed";

const emailField = {
  email: Yup.string()
    .required("Email is required")
    .email("Please enter a valid email ")
    .test(
      "is-valid-email",
      "Email must contain a dot and a domain",
      (value) => {
        // This will check if the email contains at least one dot after the '@'
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(value);
      }
    ), // Check for a valid email structure
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

const changePasswordByAdmin = Yup.object({
  new_password: Yup.string()
    .required("New Password is required") // Field is required
    .min(6, "Password must be at least 6 characters long"), // Minimum 6 characters

  cnfPassword: Yup.string()
    .required("Confirm Password is required") // Field is required
    .oneOf([Yup.ref("new_password"), null], "Passwords must match"), // Must match the password field
});

const changePasswordByClient = Yup.object({
  old_password: Yup.string()
    .required("New Password is required") // Field is required
    .min(6, "Password must be at least 6 characters long"), // Minimum 6 characters

  new_password: Yup.string()
    .required("New Password is required") // Field is required
    .min(6, "Password must be at least 6 characters long"), // Minimum 6 characters

  cnfPassword: Yup.string()
    .required("Confirm password is required") // Field is required
    .oneOf([Yup.ref("new_password"), null], "Passwords must match"), // Must match the password field
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
});

const noInitialSpace = (value) =>
  !value || value.trim().length === value.length;

const editAgentSchema = Yup.object({
  first_name: Yup.string()
    .required("First name is required")
    .test("no-initial-space", noSpaceMessage, noInitialSpace)
    .matches(/^\S+$/, noSpaceMessage), // Disallow spaces
  last_name: Yup.string()
    .required("Last name is required")
    .test("no-initial-space", noSpaceMessage, noInitialSpace)
    .matches(/^\S+$/, noSpaceMessage), // Disallow spaces
  email: Yup.string()
    .required("Email is required")
    .email("Please Enter Valid email address"),
  phone_number: Yup.string()
    .required("Phone number is required")
    .max(10, "Phone number cannot exceed 10 digits")
    .matches(/^\d{10}$/, {
      message: "Invalid phone number",
      excludeEmptyString: true,
    }),
  address: Yup.string()
    .required("Address is required")
    .test("no-initial-space", noSpaceMessage, noInitialSpace),
});
// const AgentGroupSchema = Yup.object({
//   group_name: Yup.string()
//     .required("Group name is required")
//     .matches(/^\S+$/, noSpaceMessage),
// });
const noInitialSpaceMessage = "Group name cannot start with a space";
const AgentGroupSchema = Yup.object({
  group_name: Yup.string()
    .required("Group name is required")
    .matches(/^\S[\s\S]*$/, noInitialSpaceMessage),
});
const accManagerSchema = Yup.object({
  first_name: Yup.string()
    .required("First name is required")
    .matches(/^\S+$/, noSpaceMessage), // Disallow spaces
  last_name: Yup.string()
    .required("Last name is required")
    .matches(/^\S+$/, noSpaceMessage), // Disallow spaces
  ...emailField,
  phone_number: Yup.string()
    .required("Phone number is required")
    .matches(/^\d{10}$/, {
      message: "Invalid phone number",
      excludeEmptyString: true,
    }), // ,
  address: Yup.string().required("Address is required"),
});

export {
  loginSchema,
  forgotPasswordSchema,
  resetPassSchema,
  addClientSchema,
  addAgentSchema,
  changePasswordByAdmin,
  changePasswordByClient,
  editAgentSchema,
  AgentGroupSchema,
  accManagerSchema,
};
