import { api } from "../../Config/api";
import { FETCH_FOLLOWING_USER_STORY, FETCH_USER_STORY} from "./ActionType";

export const createStoryAction = (reqData) => async (dispatch) => {
    try {

        const response = await api.post(
            "/api/stories/create",
            reqData.data,
            {
                headers:{
                    Authorization:`Bearer ${reqData.token}`
                }
            }
        );

        console.log("created story ", response.data);

    } catch (error) {
        console.log(error);
    }
}

export const fetchUserStoryAction =
(userId, token) => async(dispatch) => {

    try {

        const {data} = await api.get(
            `/api/stories/${userId}`,
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        );

        dispatch({
            type:FETCH_USER_STORY,
            payload:data
        });

    } catch (error) {
        console.log(error);
    }
}


export const fetchFollowingStoryAction = (token) => async (dispatch) => {

    try {

        const {data} = await api.get(
            "/api/stories/following",
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        );

        dispatch({
            type:FETCH_FOLLOWING_USER_STORY,
            payload:data
        });
        console.log("FOLLOWING STORIES API", data);

    } catch (error) {
        console.log(error);
    }
}