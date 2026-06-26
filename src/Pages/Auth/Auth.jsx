import React from "react";
import "./Auth.css";
import {Signin} from "../../Components/Register/Signin";
import { useLocation } from "react-router-dom";
import Signup from "../../Components/Register/Signup";

export const Auth = () => {
    const location = useLocation();
    return (
        <div>
            <div className="flex items-center justify-center h-[100vh] space-x-2">
                <div className="relative hidden lg:block">
                    <div className="h-[35rem] w-[40rem]">

                        {/* Phone mockup image */}
                        <img
                            className="h-full w-full"
                            src="https://static.cdninstagram.com/rsrc.php/v4/yt/r/pAv7hjq-51n.png"
                            alt=""
                        />

                        {/* Middle phone animated screen */}
                        <div className="mobileWallpaper absolute">

                        </div>
                    </div>
                </div>
                <div className="w-full max-w-md">
                    {location.pathname==="/login" ? <Signin/> : <Signup/>}
                </div>
            </div>
        </div>
    );
};

