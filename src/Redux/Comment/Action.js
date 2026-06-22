import {
  CREATE_COMMENT,
  GET_POST_COMMENT,
  LIKE_COMMENT,
  UNLIKE_COMMENT,
} from "./ActionType";

import { api } from "../../Config/api";

export const createCommentAction = (data) => async (dispatch) => {
  try {
    const res = await api.post(
      `/api/comments/create/${data.postId}`,
      data.data,
      {
        headers: {
          Authorization: `Bearer ${data.jwt}`,
        },
      }
    );

    console.log("Created comment:", res.data);

    dispatch({
      type: CREATE_COMMENT,
      payload: res.data,
    });
  } catch (error) {
    console.log("Create Comment Error:", error);
  }
};

export const findPostCommentAction = (data) => async (dispatch) => {
  try {
    const res = await api.get(
      `/api/comments/${data.postId}`,
      {
        headers: {
          Authorization: `Bearer ${data.jwt}`,
        },
      }
    );

    console.log("Find post comments:", res.data);

    dispatch({
      type: GET_POST_COMMENT,
      payload: res.data,
    });
  } catch (error) {
    console.log("Find Comment Error:", error);
  }
};

export const likeCommentAction = (data) => async (dispatch) => {
  try {
    const res = await api.put(
      `/api/comments/like/${data.commentId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${data.jwt}`,
        },
      }
    );

    console.log("Liked comment:", res.data);

    dispatch({
      type: LIKE_COMMENT,
      payload: res.data,
    });
  } catch (error) {
    console.log("Like Comment Error:", error);
  }
};

export const unlikeCommentAction = (data) => async (dispatch) => {
  try {
    const res = await api.put(
      `/api/comments/unlike/${data.commentId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${data.jwt}`,
        },
      }
    );

    console.log("Unliked comment:", res.data);

    dispatch({
      type: UNLIKE_COMMENT,
      payload: res.data,
    });
  } catch (error) {
    console.log("Unlike Comment Error:", error);
  }
};