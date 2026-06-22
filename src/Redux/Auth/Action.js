import { SIGN_IN, SIGN_UP } from "./ActionType";
const API_URL = process.env.REACT_APP_API_URL;

export const signinAction=(data)=>async (dispatch)=>{
    try {
        const res = await fetch(`${API_URL}/signin`,{
            method:"POST",
            headers:{
                // "Content-Type":"application/json",
                Authorization:"Basic "+btoa(data.email + ":" + data.password),
            }
        })
        const token = res.headers.get("Authorization");
        localStorage.setItem("token", token);
        dispatch({type:SIGN_IN, payload:token});
        console.log("Signin token: "+token )
    } catch (error) {
        console.log(error);
    }
}

export const signupAction=(data)=>async (dispatch)=>{
    try {
        const res = await fetch(`${API_URL}/signup`, {
            method: "POST",
            headers:{
                "Content-Type":"application/json",

            },
                body: JSON.stringify(data)

        })
        const user = await res.json();
        console.log("Signup user: ", user)
        dispatch({type:SIGN_UP, payload: user});
    } catch (error) {
        console.log(error);
    }
}