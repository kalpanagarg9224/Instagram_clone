import { api } from "../../Config/api";
import { FETCH_FOLLOWING_USER_STORY, FETCH_USER_STORY} from "./ActionType";
import { CREATE_STORY } from "./ActionType";

export const createStoryAction = (reqData) => async (dispatch) => {

    try {

        const { data } = await api.post(
            `/api/stories/create`,
            reqData.storyData,
            {
                headers: {
                    Authorization: `Bearer ${reqData.token}`,
                },
            }
        );

        console.log("created story ", data);

        dispatch({
            type: CREATE_STORY,
            payload: data,
        });

    } catch (error) {

        console.log("create story error ", error);

    }

};

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


