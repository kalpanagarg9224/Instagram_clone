import React, { useEffect, useState } from "react";
import SuggestionCard from "./SuggestionCard";
import { useDispatch, useSelector } from "react-redux";
import { getPopularUser } from "../../Redux/User/Action";
import defaultImage from "../../Images/userAvatar.png";

const HomeRight = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { user } = useSelector((store) => store);

  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
  if (token) {
    dispatch(getPopularUser(token));
  }
}, [dispatch, token]);

  const suggestions =
    Array.isArray(user.popularUsers)
      ? user.popularUsers.filter((item) => item.id !== user.reqUser?.id)
      : [];

  const visibleSuggestions = showAll
    ? suggestions
    : suggestions.slice(0, 5);

  return (
      <div className="relative text-white w-[380px] ml-auto pt-3 pb-3 pl-3 pr-3">

      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[500px] h-[500px] bg-pink-500/25 rounded-full blur-3xl top-[-120px] left-[-120px]" />
        <div className="absolute w-[400px] h-[400px] bg-blue-500/25 rounded-full blur-3xl bottom-[-120px] right-[-120px]" />
      </div>

      <div className="absolute inset-0 bg-black/60 -z-10" />

      <div className="space-y-6">

        {/* PROFILE CARD */}
        <div className="relative flex justify-between items-center rounded-[26px] p-5 border border-white/10 bg-white/10 backdrop-blur-xl overflow-hidden">

          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-blue-500/10" />
          <div className="absolute inset-0 bg-black/30" />

          <div className="relative flex items-center">
            <img
              src={user.reqUser?.image || defaultImage}
              className="w-12 h-12 rounded-full object-cover border border-white/20"
              alt=""
            />

            <div className="ml-3">
              <p className="text-sm font-semibold text-white">
                {user.reqUser?.name}
              </p>
              <p className="text-xs text-gray-300">
                {user.reqUser?.username}
              </p>
            </div>
          </div>

          <p className="relative text-sm font-semibold text-pink-400 cursor-pointer">
            Switch
          </p>
        </div>

        {/* SUGGESTIONS */}
        <div className="relative rounded-[26px] p-5 border border-white/10 bg-white/10 backdrop-blur-xl overflow-hidden">

          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-blue-500/10" />
          <div className="absolute inset-0 bg-black/30" />

          <div className="relative flex justify-between items-center mb-3">
            <p className="text-xs text-gray-300">
              Suggested for you
            </p>

            {suggestions.length > 4 && (
              <button
                onClick={() => setShowAll(!showAll)}
                className="text-xs text-pink-400 hover:text-pink-300 font-semibold"
              >
                {showAll ? "Show less" : "See more"}
              </button>
            )}
          </div>

          <div className="relative space-y-3">
            {visibleSuggestions.map((item) => (
              <SuggestionCard key={item.id} user={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeRight;