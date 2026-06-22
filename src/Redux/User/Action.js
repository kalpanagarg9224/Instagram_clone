import {
  GET_USER_BY_USERNAME,
  GET_USERS_BY_USER_IDS,
  POPULAR_USER,
  REQ_USER,
  SEARCH_USER,
  UPDATE_USER,
} from "./ActionType";

import { api } from "../../Config/api";

export const getUserProfileAction = (jwt) => async (dispatch) => {
  try {
    const res = await api.get("/api/users/req", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    dispatch({
      type: REQ_USER,
      payload: res.data,
    });
  } catch (error) {
    console.log("Get Profile Error:", error);
  }
};

export const findUserByUserNameAction = (data) => async (dispatch) => {
  try {
    const res = await api.get(
      `/api/users/username/${data.username}`,
      {
        headers: {
          Authorization: `Bearer ${data.jwt}`,
        },
      }
    );

    console.log("Find by username:", res.data);

    dispatch({
      type: GET_USER_BY_USERNAME,
      payload: res.data,
    });
  } catch (error) {
    console.log("Find User By Username Error:", error);
  }
};

export const findUserByUserIdsAction = (data) => async (dispatch) => {
  try {
    const res = await api.get(
      `/api/users/m/${data.userIds}`,
      {
        headers: {
          Authorization: `Bearer ${data.jwt}`,
        },
      }
    );

    console.log("Find by userIds:", res.data);

    dispatch({
      type: GET_USERS_BY_USER_IDS,
      payload: res.data,
    });
  } catch (error) {
    console.log("Find Users By Ids Error:", error);
  }
};

export const followUserAction = (data) => async (dispatch) => {
  try {
    await api.put(
      `/api/users/follow/${data.userId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${data.jwt}`,
        },
      }
    );

    dispatch(getUserProfileAction(data.jwt));
  } catch (error) {
    console.log("Follow User Error:", error);
  }
};

export const unFollowUserAction = (data) => async (dispatch) => {
  try {
    await api.put(
      `/api/users/unfollow/${data.userId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${data.jwt}`,
        },
      }
    );

    dispatch(getUserProfileAction(data.jwt));
  } catch (error) {
    console.log("Unfollow User Error:", error);
  }
};

export const searchUserAction = (data) => async (dispatch) => {
  try {
    const res = await api.get(
      `/api/users/search?q=${data.query}`,
      {
        headers: {
          Authorization: `Bearer ${data.jwt}`,
        },
      }
    );

    console.log("Search response:", res.data);

    dispatch({
      type: SEARCH_USER,
      payload: res.data,
    });
  } catch (error) {
    console.log("Search User Error:", error);
  }
};

export const updateUserAction = (data) => async (dispatch) => {
  try {
    const res = await api.put(
      "/api/users/account/edit",
      data.data,
      {
        headers: {
          Authorization: `Bearer ${data.jwt}`,
        },
      }
    );

    dispatch({
      type: UPDATE_USER,
      payload: res.data,
    });
  } catch (error) {
    console.log("Update User Error:", error);
  }
};

export const getPopularUser = (jwt) => async (dispatch) => {
  try {
    const res = await api.get(
      "/api/users/popular",
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    dispatch({
      type: POPULAR_USER,
      payload: res.data,
    });
  } catch (error) {
    console.log("Popular User Error:", error);
  }
};