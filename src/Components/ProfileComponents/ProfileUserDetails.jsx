import React from "react";
import { FiSettings } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import AddStory from "../Story/AddStory";

export const ProfileUserDetails = ({
  user,
  isFollowing,
  isRequser,
  postCount,
}) => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-white/10 backdrop-blur-xl p-6">

      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-blue-500/10" />

      <div className="relative flex items-center gap-10">

        {/* avatar */}
        <div className="relative w-32 h-32 flex items-center justify-center">

  {/* STORY RING */}
  <div className="absolute w-36 h-36 rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-yellow-400 animate-pulse" />

  {/* INNER CUT (creates ring effect) */}
  <div className="absolute w-32 h-32 rounded-full bg-black" />

  {/* PROFILE IMAGE */}
  <img
    className="relative w-28 h-28 rounded-full object-cover border-2 border-black"
    src={
      user?.image ||
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_7-ogoOaTH4Qxk9xEfPTPsY-w9AD4GRG_Cw&s"
    }
    alt=""
  />
</div>

        {/* details */}
        <div className="space-y-4 w-full">

          {/* username + actions */}
          <div className="flex items-center gap-6">

            <p className="text-xl font-semibold">
              {user?.username}
            </p>

            {isRequser ? (
              <button
                onClick={() => navigate("/account/edit")}
                className="px-4 py-1 rounded-xl bg-white/10 border border-white/10 hover:bg-white/20 transition"
              >
                Edit Aura
              </button>
            ) : (
              <button className="px-4 py-1 rounded-xl bg-pink-500 text-white">
                {isFollowing ? "Following" : "Follow"}
              </button>
            )}

<FiSettings className="text-xl text-gray-300 cursor-pointer hover:text-white transition" />
          </div>

         {/* stats */}
<div className="flex gap-10 text-sm">

  <div className="flex flex-col items-center px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition">
    <span className="text-white font-bold text-base">
      {postCount}
    </span>
    <span className="text-gray-300 text-xs tracking-wide uppercase">
      Posts
    </span>
  </div>

  <div className="flex flex-col items-center px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition">
    <span className="text-white font-bold text-base">
      {user?.follower?.length || 0}
    </span>
    <span className="text-gray-300 text-xs tracking-wide uppercase">
      Followers
    </span>
  </div>

  <div className="flex flex-col items-center px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition">
    <span className="text-white font-bold text-base">
      {user?.following?.length || 0}
    </span>
    <span className="text-gray-300 text-xs tracking-wide uppercase">
      Following
    </span>
  </div>

</div>

          {/* bio */}
          <div>
            <p className="font-semibold text-white">
              {user?.name}
            </p>

            <p className="text-sm text-gray-300">
              {user?.bio}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfileUserDetails;