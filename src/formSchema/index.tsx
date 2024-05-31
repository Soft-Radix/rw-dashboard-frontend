import * as Yup from "yup";

const noSpaceMessage = "No spaces allowed";
const maxWords = 20;
const tooManyWordsMessage = `First name can have a maximum of ${maxWords} words`;
const maxLengthFirstMessage =
  "First name should be less than or equal to 20 characters.";
const maxLengthLastMessage =
  "Last name should be less than or equal to 20 characters.";
const maxLengthGroupMessage =
  "It should be less than or equal to 30 characters.";
const noInitialSpace = (value) => !value.startsWith(" ");

const emailField = {
  email: Yup.string()
    .required("Email Address is required")
    .email("Please enter valid email address")
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
    .min(6, "Password must be at least 6 characters long")
    .matches(/^\S+$/, noSpaceMessage), // Minimum 6 characters

  cnfPassword: Yup.string()
    .required("Confirm Password is required") // Field is required
    .oneOf([Yup.ref("new_password"), null], "Passwords must match")
    .matches(/^\S+$/, noSpaceMessage), // Must match the password field
});

const changePasswordByClient = Yup.object({
  old_password: Yup.string()
    .required("New Password is required") // Field is required
    .min(6, "Password must be at least 6 characters long") // Minimum 6 characters
    .matches(/^\S+$/, noSpaceMessage),
  new_password: Yup.string()
    .required("New Password is required") // Field is required
    .min(6, "Password must be at least 6 characters long") // Minimum 6 characters
    .matches(/^\S+$/, noSpaceMessage),
  cnfPassword: Yup.string()
    .required("Confirm password is required") // Field is required
    .oneOf([Yup.ref("new_password"), null], "Passwords must match") // Must match the password field
    .matches(/^\S+$/, noSpaceMessage),
});

const addClientSchema = Yup.object({
  first_name: Yup.string()
    .required("First name is required")
    .matches(
      /^[A-Za-z]+$/,
      "First name should only contain letters and no spaces"
    ) // Disallow spaces
    .max(20, maxLengthFirstMessage),

  last_name: Yup.string()
    .required("Last name is required")
    .matches(
      /^[A-Za-z]+$/,
      "Last name should only contain letters and no spaces"
    ) // Disallow spaces
    .max(20, maxLengthLastMessage),

  ...emailField,
  company_name: Yup.string()
    .required("Compnay name is required")
    .matches(
      /^\S.*\S$|^\S$/,
      "Company name must not start or end with a space and should not be empty"
    )
    .matches(/^\S.*\S$|^\S$/, noSpaceMessage),
});
const editClientSchema = Yup.object({
  first_name: Yup.string()
    .required("First name is required")
    .matches(
      /^[A-Za-z]+$/,
      "First name should only contain letters and no spaces"
    ) // Disallow spaces
    .matches(/^\S+$/, noSpaceMessage), // Disallow spaces

  last_name: Yup.string()
    .required("Last name is required")
    .matches(
      /^[A-Za-z]+$/,
      "Last name should only contain letters and no spaces"
    ) // Disallow spaces
    .max(20, maxLengthLastMessage), // Disallow spaces
  ...emailField,
  phone_number: Yup.string()
    .required("Phone number is required")
    .max(10, "Phone number must be 10 digits long.")
    .matches(/^\d{10}$/, {
      message: "Invalid phone number",
      excludeEmptyString: true,
    }),
  company_name: Yup.string()
    .required("Compnay name is required")

    .matches(
      /^\S.*\S$|^\S$/,
      "Company name must not start or end with a space and should not be empty"
    )
    .matches(/^\S.*\S$|^\S$/, noSpaceMessage),
});

const editAgentSchema = Yup.object({
  first_name: Yup.string()
    .required("First name is required")
    .test("no-initial-space", noSpaceMessage, noInitialSpace)
    .matches(
      /^[A-Za-z]+$/,
      "First name should only contain letters and no spaces"
    )
    .max(20, maxLengthFirstMessage),
  // .test("max-words", tooManyWordsMessage, (value) => {
  //   return value.split(" ").filter((word) => word).length <= maxWords;
  // }), // Disallow spaces
  last_name: Yup.string()
    .required("Last name is required")
    .test("no-initial-space", noSpaceMessage, noInitialSpace)
    .matches(
      /^[A-Za-z]+$/,
      "Last name should only contain letters and no spaces"
    )
    .max(20, maxLengthLastMessage),

  ...emailField,
  phone_number: Yup.string()
    .required("Phone number is required")
    .max(10, "Phone number must be 10 digits long.")
    .matches(/^\d{10}$/, {
      message: "Phone number must be 10 digits long.",
      excludeEmptyString: true,
    }),
  address: Yup.string()
    .required("Address is required")
    .test("no-initial-space", noSpaceMessage, noInitialSpace)
    .matches(/^[^\s].*$/, "Address should not start with a space")
    .max(30, "Address should be less than or equal to 30 characters"),
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
    .matches(
      /^[A-Za-z]+(?: [A-Za-z]+)*$/,
      "Group name should only contain letters and single spaces between words, with no initial spaces"
    )
    .max(30, "Group name cannot be longer than 30 characters"),
});
const AddAgentGroupSchema = Yup.object({
  group_names: Yup.string()
    .required("Group name is required")
    .matches(
      /^[A-Za-z]+(?: [A-Za-z]+)*$/,
      "Group name should only contain letters and single spaces between words, with no initial spaces"
    )
    .max(30, "Group name cannot be longer than 30 characters"),
});
const accManagerSchema = Yup.object({
  first_name: Yup.string()
    .required("First name is required")
    .matches(
      /^[A-Za-z]+$/,
      "First name should only contain letters and no spaces"
    ) // Disallow spaces
    .max(20, maxLengthFirstMessage),
  last_name: Yup.string()
    .required("Last name is required")
    .matches(
      /^[A-Za-z]+$/,
      "Last name should only contain letters and no spaces"
    )
    .max(20, maxLengthLastMessage), // Disallow spaces
  ...emailField,
  phone_number: Yup.string()
    .required("Phone number is required")
    .matches(/^\d{10}$/, {
      message: "Phone number must be 10 digits long.",
      excludeEmptyString: true,
    }), // ,
  address: Yup.string()
    .required("Address is required")
    .matches(/^[^\s].*$/, "Address should not start with a space")
    .max(30, "Address should be less than or equal to 30 characters"),
});

export {
  loginSchema,
  forgotPasswordSchema,
  resetPassSchema,
  addClientSchema,
  changePasswordByAdmin,
  changePasswordByClient,
  editAgentSchema,
  AgentGroupSchema,
  accManagerSchema,
  editClientSchema,
  AddAgentGroupSchema,
};
