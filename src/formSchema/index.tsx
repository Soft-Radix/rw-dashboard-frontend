import * as Yup from "yup";

/**
 * Login Validation Schema
 */
const loginSchema = Yup.object({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
});

const forgotPasswordSchema = Yup.object({
    email: Yup.string().required("Email is required"),
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
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    email: Yup.string().required("Last name is required"),
    company_name: Yup.string().required("Last name is required"),
});


export {
    loginSchema, forgotPasswordSchema,
    resetPassSchema, addClientSchema
}