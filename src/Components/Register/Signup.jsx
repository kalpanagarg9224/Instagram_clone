import { Box, Button, FormControl, FormErrorMessage, Input } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import React from "react";
import { useNavigate } from "react-router-dom";


const validationschema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().min(8,"Password must be t least 8 characters").required("Password is required"),
});

const Signup = () =>{
    const initialValues={email:"",username:"", name:"", password:""} 
    const navigate = useNavigate();
    const handleSubmit=(values)=>{
        console.log("values: ", values);
    }
    const handleNavigate=()=>navigate("/login");

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

                                    <Field name="usename">
                                        {({field,form})=> <FormControl isInvalid={form.errors.username && form.touched.username}>
                                            <Input className="w-full" {...field} id="usename" placeholder="username">
                                            </Input>
                                            <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                                        </FormControl>
                                        }
                                    </Field>

                                    <Field name="name">
                                        {({field,form})=> <FormControl isInvalid={form.errors.name && form.touched.name}>
                                            <Input className="w-full" {...field} id="name" placeholder="Full name">
                                            </Input>
                                            <FormErrorMessage>{form.errors.name}</FormErrorMessage>
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
                                    <p className="text-center text-sm">By tapping Submit, you agree to create an account and to Instagram's Terms, Privacy Policy and Cookies policy.</p>
                                    <Button className="w-full" mt={8} colorScheme="blue" type="submit" isLoading={FormikProps.isSubmitting}>
                                        Sign Up
                                    </Button>
            
                                    </Form>}
                            </Formik>
                            </Box>
                        </div>
                        <div className="border w-full border-slate-300 mt-5">
                            <p className="text-center py-2 text-sm">If you alreay have an Account <span onClick={handleNavigate} className="ml-2 text-blue-700 cursor-pointer">Sign In</span></p>
                        </div>
        </div>
    )
}

export default Signup;