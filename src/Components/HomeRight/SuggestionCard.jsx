import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  followUserAction,
  unFollowUserAction,
} from "../../Redux/User/Action";
import defaultImage from "../../Images/userAvatar.png";

const SuggestionCard = ({ user }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const reqUser = useSelector((store) => store.user.reqUser);

  const isFollowed = reqUser?.following?.some(
    (item) => item.id === user.id
  );

  const handleToggleFollow = () => {
    dispatch(
      isFollowed
        ? unFollowUserAction({ jwt: token, userId: user.id })
        : followUserAction({ jwt: token, userId: user.id })
    );
  };

  return (
    <div className="relative flex items-center justify-between p-3 rounded-xl bg-white/10 border border-white/10 backdrop-blur-xl overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-blue-500/10" />
      <div className="absolute inset-0 bg-black/30" />

      {/* USER */}
      <div className="relative flex items-center">
        <img
          src={user?.image || defaultImage}
          className="w-8 h-8 rounded-full object-cover border border-white/20"
        />

        <div className="ml-2">
          <p className="text-xs font-semibold text-white leading-tight">
            {user?.username}
          </p>
          <p className="text-[11px] text-gray-300 leading-tight">
            {user?.name}
          </p>
        </div>
      </div>

      {/* BUTTON */}
      <button
        onClick={handleToggleFollow}
        className={`relative px-3 py-1 rounded-lg text-[11px] font-semibold transition
        ${
          isFollowed
            ? "bg-white/10 text-gray-200 border border-white/10"
            : "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white"
        }`}
      >
        {isFollowed ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

export default SuggestionCard;