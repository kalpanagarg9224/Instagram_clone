import { Box, Button, FormControl, FormErrorMessage, Input } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signinAction } from "../../Redux/Auth/Action";
import { getUserProfileAction } from "../../Redux/User/Action";

const validationschema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().min(8,"Password must be t least 8 characters").required("Password is required"),
});

export const Signin = () =>{
    const initialValues = {email:"", password:""};
    const navigate = useNavigate();
    const dispatch=useDispatch();
    const {user} = useSelector(store=>store);
    const jwt=localStorage.getItem("token");
    
    const handleSubmit=(values, actions)=>{
        dispatch(signinAction(values));
        actions.setSubmitting(false);
    };

    useEffect(()=>{
        if(jwt) dispatch(getUserProfileAction(jwt))
    },[jwt, dispatch]);

    useEffect(()=>{
        if(user.reqUser?.username){
            navigate(`/${user.reqUser?.username}`)
        }
    },[jwt,user.reqUser])

    const handleNavigate=()=>navigate("/signup");
    return (
        <div> 
            <div className="border">
                <Box p={8} display={'flex'} flexDirection={'column'} alignItems={'center'}>
                <img className="mb-5" src="https://i.imgur.com/zqpwkLQ.png" alt=""/>
                <Formik initialValues={initialValues} onSubmit = {handleSubmit} validationSchema={validationschema}>
                    {(FormikProps) => <Form className="space-y-4">
                        <Field name="email">
                            {({field,form})=> <FormControl isInvalid={form.errors.email && form.touched.email}>
                                <Input className="w-full" {...field} id="email" placeholder="Mobile number or Email">
                                </Input>
                                <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                            </FormControl>
                            }
                        </Field>

                        <Field name="password">
                            {({field,form})=> <FormControl isInvalid={form.errors.password && form.touched.password}>
                                <Input className="w-full" {...field} id="password" placeholder="Password">
                                </Input>
                                <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                            </FormControl>
                            }
                        </Field>

                        <p className="text-center text-sm">People who use our service may have uploaded your contact information to Instagram. Learn more .</p>
                        <p className="text-center text-sm">By signing up, you agree to our Terms, Privacy Policy and Cookies policy.</p>
                        <Button className="w-full" mt={8} colorScheme="blue" type="submit" isLoading={FormikProps.isSubmitting}>
                            Sign In
                        </Button>

                        </Form>}
                </Formik>
                </Box>
            </div>
            <div className="border w-full border-slate-300 mt-5">
                <p className="text-center py-2 text-sm">If you don't have Account <span onClick={handleNavigate} className="ml-2 text-blue-700 cursor-pointer">Sign Up</span></p>
            </div>
        </div>
    )
}
