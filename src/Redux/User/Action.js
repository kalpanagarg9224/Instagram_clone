import { type } from "@testing-library/user-event/dist/type"
import { data } from "react-router-dom"
import {FOLLOW_USER, GET_USER_BY_USERNAME, GET_USERS_BY_USER_IDS, POPULAR_USER, REQ_USER, SEARCH_USER, UNFOLLOW_USER, UPDATE_USER} from "./ActionType";
const BASE_API = "http://localhost:5454/api"

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

export const findUserByUserNameAction = (data)=>async(dispatch)=>{
    const res = await fetch(`${BASE_API}/users/username/${data.username}`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            Authorization:"Bearer "+ data.jwt
        }
    });
    const user = await res.json();
    console.log("Find by username : ", user);
    dispatch({type:GET_USER_BY_USERNAME,payload:user});
}

export const findUserByUserIdsAction = (data)=>async(dispatch)=>{
    const res = await fetch(`${BASE_API}/users/m/${data.userIds}`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            Authorization:"Bearer "+ data.jwt
        }
    });
    const users = await res.json();
    console.log("Find by userIds : ", users)
    dispatch({type:GET_USERS_BY_USER_IDS,payload:users});
}

export const followUserAction = (data)=>async(dispatch)=>{
    const res = await fetch(
        `${BASE_API}/users/follow/${data.userId}`,
        {
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                Authorization:"Bearer "+ data.jwt
            }
        }
    );
    await res.json();
    dispatch(getUserProfileAction(data.jwt));
}

// export const unFollowUserAction = (data)=>async(dispatch)=>{
//     const res = await fetch(`${BASE_API}/users/unfollow/${data.userId}`,{
//         method:"PUT",
//         headers:{
//             "Content-Type":"application/json",
//             Authorization:"Bearer "+ data.jwt
//         }
//     });
//     const user = await res.json();
//     console.log("Unfollow user : ", user)
//     dispatch({type:UNFOLLOW_USER,payload:user});
// }

export const unFollowUserAction = (data)=>async(dispatch)=>{
    const res = await fetch(
        `${BASE_API}/users/unfollow/${data.userId}`,
        {
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                Authorization:"Bearer "+ data.jwt
            }
        }
    );
    await res.json();
    dispatch(getUserProfileAction(data.jwt));
}

export const searchUserAction = (data)=>async(dispatch)=>{
    try {
        const res = await fetch(`${BASE_API}/users/search?q=${data.query}`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            Authorization:"Bearer "+ data.jwt
        }
    });
    const user = await res.json();
    // console.log("Search user : ", user)
    console.log("search response", data)
    dispatch({type:SEARCH_USER,payload:user});
    } catch (error) {
        console.log("catch error ", error);
    }

    
}

export const updateUserAction = (data)=>async(dispatch)=>{
    try {
        const res = await fetch(`${BASE_API}/users/account/edit`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            Authorization:"Bearer "+ data.jwt
        },
        body: JSON.stringify(data.data),
    });
    const user = await res.json();
    dispatch({type:UPDATE_USER,payload:user});
    } catch (error) {
        console.log("catch error ", error);
    }
}

export const getPopularUser = (jwt)=>async(dispatch)=>{
    try {
        const res = await fetch(`${BASE_API}/users/popular`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                Authorization:"Bearer " + jwt
            }
        });

        const users = await res.json();
        // console.log("POPULAR USERS API => ", users);
        // console.log("POPULAR USERS FULL RESPONSE", users);
        // console.log("IS ARRAY", Array.isArray(users));
        dispatch({
            type: POPULAR_USER,
            payload: users
        });
    } catch (error) {
        console.log("catch error ", error);
    }
}