import {
  CREATE_NEW_POST,
  DELETE_POST,
  GET_SINGLE_POST,
  GET_USER_POST,
  LIKE_POST,
  SAVE_POST,
  UNLIKE_POST,
  UNSAVE_POST,
} from "./ActionType";

import { api } from "../../Config/api";

export const createPostAction = (data) => async (dispatch) => {
  try {
    const res = await api.post(
      "/api/posts/create",
      data.data,
      {
        headers: {
          Authorization: `Bearer ${data.jwt}`,
        },
      }
    );

    console.log("Created post:", res.data);

    dispatch({
      type: CREATE_NEW_POST,
      payload: res.data,
    });
  } catch (error) {
    console.log("Create Post Error:", error);
  }
};

export const findUserPostAction = (data) => async (dispatch) => {
  try {
    const res = await api.get(
      `/api/posts/following/${data.userIds}`,
      {
        headers: {
          Authorization: `Bearer ${data.jwt}`,
        },
      }
    );

    console.log("Find post by user ids:", res.data);

    dispatch({
      type: GET_USER_POST,
      payload: res.data,
    });
  } catch (error) {
    console.log("Find User Post Error:", error);
  }

  console.log("UserIds sent to API:", data.userIds);
};

export const reqUserPostAction = (data) => async (dispatch) => {
  try {
    console.log("Sending userId:", data.userId);

    const res = await api.get(
      `/api/posts/all/${data.userId}`,
      {
        headers: {
          Authorization: `Bearer ${data.jwt}`,
        },
      }
    );

    console.log("Response:", res.data);

    dispatch({
      type: GET_USER_POST,
      payload: res.data,
    });
  } catch (error) {
    console.log("Req User Post Error:", error);
  }
};

export const likePostAction = (data) => async (dispatch) => {
  try {
    const res = await api.put(
      `/api/posts/like/${data.postId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${data.jwt}`,
        },
      }
    );

    console.log("FULL liked post response:", res.data);
    console.log(
      "likedByUsers after like:",
      res.data.likedByUsers
    );

    dispatch({
      type: LIKE_POST,
      payload: res.data,
    });
  } catch (error) {
    console.log("Like Post Error:", error);
  }
};

export const unlikePostAction = (data) => async (dispatch) => {
  try {
    const res = await api.put(
      `/api/posts/unlike/${data.postId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${data.jwt}`,
        },
      }
    );

    dispatch({
      type: UNLIKE_POST,
      payload: res.data,
    });
  } catch (error) {
    console.log("Unlike Post Error:", error);
  }
};

export const savePostAction = (data) => async (dispatch) => {
  try {
    const res = await api.put(
      `/api/posts/save_post/${data.postId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${data.jwt}`,
        },
      }
    );

    console.log("Saved post:", res.data);

    dispatch({
      type: SAVE_POST,
      payload: res.data,
    });
  } catch (error) {
    console.log("Save Post Error:", error);
  }
};

export const unsavePostAction = (data) => async (dispatch) => {
  try {
    const res = await api.put(
      `/api/posts/unsave_post/${data.postId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${data.jwt}`,
        },
      }
    );

    console.log("Unsaved post:", res.data);

    dispatch({
      type: UNSAVE_POST,
      payload: res.data,
    });
  } catch (error) {
    console.log("Unsave Post Error:", error);
  }
};

export const findPostByIdAction = (data) => async (dispatch) => {
  try {
    const res = await api.get(
      `/api/posts/${data.postId}`,
      {
        headers: {
          Authorization: `Bearer ${data.jwt}`,
        },
      }
    );

    dispatch({
      type: GET_SINGLE_POST,
      payload: res.data,
    });
  } catch (error) {
    console.log("Find Post By Id Error:", error);
  }
};

export const deletePostAction = (data) => async (dispatch) => {
  try {
    const res = await api.delete(
      `/api/posts/delete/${data.postId}`,
      {
        headers: {
          Authorization: `Bearer ${data.jwt}`,
        },
      }
    );

    console.log("Deleted post:", res.data);

    dispatch({
      type: DELETE_POST,
      payload: res.data,
    });
  } catch (error) {
    console.log("Delete Post Error:", error);
  }
};