"use client";

import { useEffect } from "react";
import { toast } from "react-hot-toast";

const SignInSuccessToast = () => {
    useEffect(() => {
        const signupSuccess = sessionStorage.getItem("signup-success");
        const signinSuccess = sessionStorage.getItem("signin-success");

        if (signupSuccess === "true") {
            sessionStorage.removeItem("signup-success");
            toast.success("সফলভাবে সাইন আপ হয়েছে!");
        } else if (signinSuccess === "true") {
            sessionStorage.removeItem("signin-success");
            toast.success("সফলভাবে সাইন ইন হয়েছে!");
        }
    }, []);

    return null;
};

export default SignInSuccessToast;