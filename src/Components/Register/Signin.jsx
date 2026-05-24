import { Box, Button, FormControl, FormErrorMessage, Input } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signinAction } from "../../Redux/Auth/Action";
import { getUserProfileAction } from "../../Redux/User/Action";
import VybeLogo from "../Brand/VybeLogo"

const validationschema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
});

export const Signin = () => {
    const initialValues = { email: "", password: "" };
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector(store => store);
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
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden text-white">

            {/* BACKGROUND GLOW */}
            <div className="absolute inset-0 bg-black">
                <div className="absolute w-[500px] h-[500px] bg-pink-500/20 blur-3xl rounded-full top-[-120px] left-[-120px]" />
                <div className="absolute w-[450px] h-[450px] bg-blue-500/20 blur-3xl rounded-full bottom-[-120px] right-[-120px]" />
            </div>

            {/* CARD */}
            <div className="relative w-[380px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">

                {/* LOGO */}
                <div className="flex justify-center mb-8">
                    <VybeLogo />
                </div>

                {/* FORM */}
                <Box>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                        validationSchema={validationschema}
                    >
                        {(FormikProps) => (
                            <Form className="space-y-4">

                                {/* EMAIL */}
                                <Field name="email">
                                    {({ field, form }) => (
                                        <FormControl
                                            isInvalid={form.errors.email && form.touched.email}
                                        >
                                            <Input
                                                {...field}
                                                id="email"
                                                placeholder="Mobile number or Email"
                                                className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-400"
                                            />
                                            <FormErrorMessage>
                                                {form.errors.email}
                                            </FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>

                                {/* PASSWORD */}
                                <Field name="password">
                                    {({ field, form }) => (
                                        <FormControl
                                            isInvalid={form.errors.password && form.touched.password}
                                        >
                                            <Input
                                                {...field}
                                                id="password"
                                                type="password"
                                                placeholder="Password"
                                                className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-400"
                                            />
                                            <FormErrorMessage>
                                                {form.errors.password}
                                            </FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>

                                {/* INFO TEXT */}
                                <p className="text-center text-xs text-gray-400">
                                    People who use our service may have uploaded your contact information.
                                </p>

                                <p className="text-center text-xs text-gray-400">
                                    By signing in, you agree to our Terms, Privacy Policy and Cookies policy.
                                </p>

                                {/* BUTTON */}
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

            {/* FOOTER */}
            <div className="absolute bottom-10 text-sm text-gray-400">
                Don’t have an account?
                <span
                    onClick={handleNavigate}
                    className="ml-2 text-blue-400 cursor-pointer hover:underline"
                >
                    Sign Up
                </span>
            </div>

        </div>
    );
};