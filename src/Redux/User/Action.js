import { type } from "@testing-library/user-event/dist/type"
import { data } from "react-router-dom"
import {REQ_USER} from "./ActionType";

export const getUserProfileAction=(jwt)=>async(dispatch)=>{
try {

    const res= await fetch("http://localhost:5454/api/users/req",{
        method:"GET",
        headers:{
            "content-Type":"application/json",
            Authorization: "Bearer " + jwt
        }
    })

    const reqUser = await res.json()
    dispatch({type:REQ_USER , payload:reqUser});
} catch (error) {
    console.log("catch: ",error)
}
}