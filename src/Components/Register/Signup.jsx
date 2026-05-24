import { Box, Button, FormControl, FormErrorMessage, Input, useToast } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupAction } from "../../Redux/Auth/Action";
import VybeLogo from "../Brand/VybeLogo";

const validationschema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    username: Yup.string().required("Username is required"),
    name: Yup.string().required("Full name is required"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
});

const Signup = () => {
    const initialValues = { email: "", username: "", name: "", password: "" };

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const toast = useToast();
    const { auth } = useSelector(store => store);

    const handleSubmit = (values, actions) => {
        dispatch(signupAction(values));
        actions.setSubmitting(false);
    };

    useEffect(() => {
        if (auth.signup?.username) {
            toast({
                title: `Account created for ${auth.signup.username}`,
                status: "success",
                duration: 4000,
                isClosable: true,
            });

            navigate("/login");
        }
    }, [auth.signup, navigate, toast]);

    const handleNavigate = () => navigate("/login");

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden text-white">

            {/* BACKGROUND GLOW */}
            <div className="absolute inset-0 bg-black">
                <div className="absolute w-[500px] h-[500px] bg-pink-500/20 blur-3xl rounded-full top-[-120px] left-[-120px]" />
                <div className="absolute w-[450px] h-[450px] bg-blue-500/20 blur-3xl rounded-full bottom-[-120px] right-[-120px]" />
            </div>

            {/* CARD */}
            <div className="relative w-[400px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">

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
                                        <FormControl isInvalid={form.errors.email && form.touched.email}>
                                            <Input
                                                {...field}
                                                placeholder="Email"
                                                className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-400"
                                            />
                                            <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>

                                {/* USERNAME */}
                                <Field name="username">
                                    {({ field, form }) => (
                                        <FormControl isInvalid={form.errors.username && form.touched.username}>
                                            <Input
                                                {...field}
                                                placeholder="Username"
                                                className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-400"
                                            />
                                            <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>

                                {/* NAME */}
                                <Field name="name">
                                    {({ field, form }) => (
                                        <FormControl isInvalid={form.errors.name && form.touched.name}>
                                            <Input
                                                {...field}
                                                placeholder="Full Name"
                                                className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-400"
                                            />
                                            <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>

                                {/* PASSWORD */}
                                <Field name="password">
                                    {({ field, form }) => (
                                        <FormControl isInvalid={form.errors.password && form.touched.password}>
                                            <Input
                                                {...field}
                                                type="password"
                                                placeholder="Password"
                                                className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-400"
                                            />
                                            <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>

                                {/* INFO TEXT */}
                                <p className="text-center text-xs text-gray-400">
                                    People who use our service may have uploaded your contact information.
                                </p>

                                <p className="text-center text-xs text-gray-400">
                                    By signing up, you agree to our Terms, Privacy Policy and Cookies policy.
                                </p>

                                {/* BUTTON */}
                                <Button
                                    className="w-full"
                                    mt={6}
                                    colorScheme="blue"
                                    type="submit"
                                    isLoading={FormikProps.isSubmitting}
                                >
                                    Sign Up
                                </Button>

                            </Form>
                        )}
                    </Formik>
                </Box>

            </div>

            {/* FOOTER */}
            <div className="absolute bottom-10 text-sm text-gray-400">
                Already have an account?
                <span
                    onClick={handleNavigate}
                    className="ml-2 text-blue-400 cursor-pointer hover:underline"
                >
                    Sign In
                </span>
            </div>

        </div>
    );
};

export default Signup;