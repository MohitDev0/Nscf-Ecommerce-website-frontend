import React, { useState } from 'react'
import "./login.css";
import { TextField, InputAdornment, IconButton, FormControl, InputLabel, OutlinedInput } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useFormik } from 'formik';
import { validateUser, validateNewUser } from '../helper/validateAuth';
import { toast } from "react-hot-toast";
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [SignPage, setSignPage] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [isFetch, setIsFetch] = useState(false);
    const [updatePassword, setUpdatePassword] = useState(false);
    const url = process.env.REACT_APP_BASE_URL;

    const sendOTP = async () => {
        if (!formik.values.email) {
            return toast.error("Email required");
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formik.values.email)
        ) {
            return toast.error("Invalid Email Address");
        }
        setIsFetching(true);
        await axios.post(url + "auth/sendOtp", { email: formik.values.email })
            .then(res => {
                if (res.data === "otp send") {
                    toast.success("OTP send \n Check Your Email");
                }
            }).catch((err) => {
                if (err.response.data === "OTP error") {
                    toast.error("Sorry Something Error Try Again");
                } else if (err.response.data === "email already used") {
                    toast.error("Email already used");
                }
            })

        setIsFetching(false);
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const formik = useFormik({
        initialValues: {
            SignPage,
            updatePassword,
            username: '',
            password: '',
            email: '',
            confirmPassword: '',
            otp: '',
        },
        enableReinitialize: true,
        validate: validateUser,
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: async (values) => {
            setIsFetch(true);
            if (values.SignPage) {
                await axios.post(url + "auth/signUp", values)
                    .then((res) => {
                        if (res.data.usertoken.split(" ")[0] === "Bearer") {
                            toast.success("User Successfully Created");
                            localStorage.setItem("jwt", res.data.usertoken);
                            navigate("/");
                        }
                    })
                    .catch((err) => {
                        validateNewUser(err.response.data);
                    })
            } else if (values.updatePassword) {
                await axios.put(url + "user/updatePassword", values)
                    .then((res) => {
                        if (res.data === "update successfully") {
                            toast.success("Password update Successfully");
                        }
                        setIsFetch(false);
                        setSignPage(false);
                        setUpdatePassword(false);
                    })
                    .catch((err) => {
                        validateNewUser(err.response.data);
                    })

            } else {
                await axios.post(url + "auth/login", values)
                    .then((res) => {
                        if (res.data.usertoken.split(" ")[0] === "Bearer") {
                            toast.success("Login Successfully");
                            localStorage.setItem("jwt", res.data.usertoken);
                            navigate("/")
                        }
                    })
                    .catch((err) => {
                        validateNewUser(err.response.data);
                    })

            }
            setIsFetch(false);
        },
    });

    return (
        <div className='bg-[#D8FBE9] loginpage h-screen w-screen flex'>

            <div className='login container mx-auto flex flex-wrap text-center rounded-2xl border shadow-xl z-30 sticky m-auto p-10 pt-5  w-3/4 bg-white'>
                <div className="loginLeft flex-auto w-64 max-[806px]:h-64 border-2 rounded-md mr-3 pt-3 grid  place-content-center text-white">
                    <h1>Welcome to Nscf</h1>
                    <p>We are selling the organic Product</p>
                    {/* <button className=' flex items-center justify-center text-5xl mt-4 p-2 rounded-md bg-green-500 '>Google</button> */}
                </div>

                <div className="loginRight flex-auto w-64 mt-7">
                    <div className="loginTop mb-4">
                        <h1 className='text-4xl font-bold'>Get Started</h1>
                        <p>{SignPage ? "Already Have Account ? " : "Create new Account ! "}<button style={{ color: "blue" }} onClick={() => { setSignPage(p => !p); setUpdatePassword(false) }}>{SignPage ? "Login" : "Sign up"}</button></p>
                    </div>

                    <form className="flex flex-col" id='formParent' onSubmit={formik.handleSubmit}>
                        <TextField id="Email" name="email" sx={{ m: 1 }} label="Email" variant="outlined" {...formik.getFieldProps("email")} />
                        {SignPage && <TextField id="username" sx={{ m: 1 }} label="Username" variant="outlined" {...formik.getFieldProps("username")} />}
                        <FormControl variant="outlined" sx={{ m: 1 }} >
                            <InputLabel htmlFor="outlined-adornment-password" >{updatePassword ? "New Password" : "Password"}</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label={updatePassword ? "New Password" : "Password"}
                                {...formik.getFieldProps("password")}
                            />
                        </FormControl>
                        {(SignPage || updatePassword) && <FormControl variant="outlined" sx={{ m: 1 }}  >
                            <InputLabel htmlFor="outlined-adornment-Confirmpassword">{updatePassword ? "Confirm New Password" : "Confirm Password"}</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-Confirmpassword"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label={updatePassword ? "Confirm New Password" : "Confirm Password"}
                                {...formik.getFieldProps("confirmPassword")}
                            />
                        </FormControl>}
                        {(SignPage || updatePassword) && <div className='flex'>
                            <TextField type="number" sx={{ m: 1 }} label="Otp" variant="outlined" pattern=".{6,6}" {...formik.getFieldProps("otp")} />
                            <button type='button' className='border rounded-md w-32 h-12 mt-3' onClick={() => sendOTP()}>{isFetching ? <CircularProgress size={25} /> : "Send OTP"}</button>
                        </div>}
                        <button type='submit' className='bg-green-400 max-w-fit px-10 py-3 border rounded-md mx-auto text-2xl leading-none'>{isFetch ? <CircularProgress size={20} /> : updatePassword ? "Update" : SignPage ? "Sign up" : "Login"}</button>
                    </form>
                    {(!SignPage && !updatePassword) && <div>Create a New Password ? <button style={{ color: "blue", paddingTop: "6px" }} onClick={() => setUpdatePassword(true)}>Forgot Password</button></div>}
                </div>
            </div>
        </div> 
    )
}

export default Login