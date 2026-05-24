import React, { useEffect } from "react";
import ProfileUserDetails from "../../Components/ProfileComponents/ProfileUserDetails";
import ReqUserPostPart from "../../Components/ProfileComponents/ReqUserPostPart";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { isFollowing, isReqUser } from "../../Config/Logic";
import {
  findUserByUserNameAction,
  getUserProfileAction,
} from "../../Redux/User/Action";

const Profile = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { username } = useParams();

  const user = useSelector((store) => store.user);
  const post = useSelector((store) => store.post);

  const isRequser = isReqUser(
    user.reqUser?.id,
    user.findByUsername?.id
  );

  const isFollowed = isFollowing(
    user.reqUser,
    user.findByUsername
  );

  useEffect(() => {
    dispatch(getUserProfileAction(token));
    dispatch(
      findUserByUserNameAction({
        jwt: token,
        username,
      })
    );
  }, [username]);

  return (
    <div className="min-h-screen relative text-white px-6 py-10 overflow-hidden">

      {/* 🌈 background (same system as edit page) */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[500px] h-[500px] bg-pink-500/20 rounded-full blur-3xl top-[-120px] left-[-120px]" />
        <div className="absolute w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-3xl bottom-[-120px] right-[-120px]" />
        <div className="absolute w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-2xl top-[40%] left-[40%]" />
      </div>

      {/* overlay for readability */}
      <div className="absolute inset-0 bg-black/60 -z-10" />

      <div className="max-w-5xl mx-auto space-y-10">

        <ProfileUserDetails
          user={
            isRequser ? user.reqUser : user.findByUsername
          }
          isFollowing={isFollowed}
          isRequser={isRequser}
          postCount={post.userPost?.length || 0}
        />

        <ReqUserPostPart
          user={
            isRequser ? user.reqUser : user.findByUsername
          }
        />

      </div>
    </div>
  );
};

export default Profile;