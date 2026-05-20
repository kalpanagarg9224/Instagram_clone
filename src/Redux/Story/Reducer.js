import {FETCH_FOLLOWING_USER_STORY,FETCH_USER_STORY} from "./ActionType";
const initialState = {
    followingStories:[],
    userStories:[]
}

export const StoryReducer = (state=initialState, action) => {
    switch(action.type){
        case FETCH_FOLLOWING_USER_STORY:
            return {
                ...state,
                followingStories:action.payload
            }

        case FETCH_USER_STORY:
            return {
                ...state,
                userStories:action.payload
            }

        default:
            return state;
    }
}