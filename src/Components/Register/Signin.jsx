import { Box, Button, FormControl, FormErrorMessage, Input } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signinAction } from "../../Redux/Auth/Action";
import { getUserProfileAction } from "../../Redux/User/Action";
import VybeLogo from "../Brand/VybeLogo";

const validationschema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
});

export const Signin = () => {
    const initialValues = { email: "", password: "" };

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((store) => store);
    const jwt = localStorage.getItem("token");

    const handleSubmit = (values, actions) => {
        dispatch(signinAction(values));
        actions.setSubmitting(false);
    };

    useEffect(() => {
        if (jwt) {
            dispatch(getUserProfileAction(jwt));
        }
    }, [jwt, dispatch]);

    useEffect(() => {
        if (user.reqUser?.username) {
            navigate(`/${user.reqUser.username}`);
        }
    }, [user.reqUser, navigate]);

    const handleNavigate = () => navigate("/signup");

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-4 py-8 text-white">

            {/* Background Glow */}
            <div className="absolute inset-0 overflow-hidden">

                <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-pink-500/20 blur-3xl sm:h-[500px] sm:w-[500px]" />

                <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl sm:h-[450px] sm:w-[450px]" />

            </div>

            {/* Main Content */}
            <div className="relative z-10 flex w-full max-w-md flex-col items-center">

                {/* Card */}
                <div className="w-full rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:p-8">

                    {/* Logo */}
                    <div className="mb-8 flex justify-center">
                        <VybeLogo />
                    </div>

                    {/* Form */}
                    <Box>
                        <Formik
                            initialValues={initialValues}
                            onSubmit={handleSubmit}
                            validationSchema={validationschema}
                        >
                            {(FormikProps) => (
                                <Form className="space-y-4">

                                    {/* Email */}
                                    <Field name="email">
                                        {({ field, form }) => (
                                            <FormControl
                                                isInvalid={
                                                    form.errors.email &&
                                                    form.touched.email
                                                }
                                            >
                                                <Input
                                                    {...field}
                                                    id="email"
                                                    placeholder="Mobile number or Email"
                                                    className="w-full border border-white/10 bg-white/5 text-white placeholder-gray-400"
                                                />

                                                <FormErrorMessage>
                                                    {form.errors.email}
                                                </FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>

                                    {/* Password */}
                                    <Field name="password">
                                        {({ field, form }) => (
                                            <FormControl
                                                isInvalid={
                                                    form.errors.password &&
                                                    form.touched.password
                                                }
                                            >
                                                <Input
                                                    {...field}
                                                    id="password"
                                                    type="password"
                                                    placeholder="Password"
                                                    className="w-full border border-white/10 bg-white/5 text-white placeholder-gray-400"
                                                />

                                                <FormErrorMessage>
                                                    {form.errors.password}
                                                </FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>

                                    {/* Info */}
                                    <p className="text-center text-xs leading-5 text-gray-400">
                                        People who use our service may have uploaded your contact information.
                                    </p>

                                    <p className="text-center text-xs leading-5 text-gray-400">
                                        By signing in, you agree to our Terms,
                                        Privacy Policy and Cookies policy.
                                    </p>

                                    {/* Button */}
                                    <Button
                                        className="w-full"
                                        mt={6}
                                        colorScheme="blue"
                                        type="submit"
                                        isLoading={FormikProps.isSubmitting}
                                    >
                                        Sign In
                                    </Button>

                                </Form>
                            )}
                        </Formik>
                    </Box>

                </div>

                {/* Footer */}
                <div className="mt-6 text-center text-sm text-gray-400">
                    Don’t have an account?

                    <span
                        onClick={handleNavigate}
                        className="ml-2 cursor-pointer text-blue-400 hover:underline"
                    >
                        Sign Up
                    </span>

                </div>

            </div>

        </div>
    );
};