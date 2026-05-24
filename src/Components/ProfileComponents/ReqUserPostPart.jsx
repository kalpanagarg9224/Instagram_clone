import React, { useEffect, useRef, useState } from "react";
import { RiVideoAddLine } from "react-icons/ri";
import { AiOutlineTable, AiOutlineUser } from "react-icons/ai";
import { BiBookmark } from "react-icons/bi";
import ReqUserPostCard from "./ReqUserPostCard";
import { useDispatch, useSelector } from "react-redux";
import { reqUserPostAction } from "../../Redux/Post/Action";

const ReqUserPostPart = ({ user }) => {
  const [activeTab, setActiveTab] = useState("Post");

  const [indicator, setIndicator] = useState({
    left: 0,
    width: 0,
  });

  const tabsRef = useRef([]);

  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { post } = useSelector((store) => store);

  const tabs = [
    { tab: "Post", icon: <AiOutlineTable /> },
    { tab: "Reels", icon: <RiVideoAddLine /> },
    { tab: "Saved", icon: <BiBookmark /> },
    { tab: "Tagged", icon: <AiOutlineUser /> },
  ];

  const handleTabClick = (tab, index) => {
    setActiveTab(tab);

    const el = tabsRef.current[index];
    if (!el) return;

    setIndicator({
      left: el.offsetLeft,
      width: el.offsetWidth,
    });
  };

  useEffect(() => {
    if (user?.id) {
      dispatch(
        reqUserPostAction({
          jwt: token,
          userId: user.id,
        })
      );
    }
  }, [user?.id, post.createdPost]);

  useEffect(() => {
  const index = tabs.findIndex((t) => t.tab === activeTab);
  const el = tabsRef.current[index];

  if (el) {
    setIndicator({
      left: el.offsetLeft,
      width: el.offsetWidth,
    });
  }
}, []);

  return (
    <div>

      {/* TABS */}
      <div className="flex space-x-14 border-t relative">

        {/* underline */}
        <span
          className="absolute top-0 h-[2px] bg-pink-500 transition-all duration-300 ease-out"
          style={{
            left: indicator.left,
            width: indicator.width,
          }}
        />

        {tabs.map((item, index) => (
          <div
            key={item.tab}
            ref={(el) => (tabsRef.current[index] = el)}
            onClick={() => handleTabClick(item.tab, index)}
            className={`
              flex items-center cursor-pointer py-2 text-sm transition-colors duration-300
              ${activeTab === item.tab ? "text-white" : "opacity-60"}
            `}
          >
            <p>{item.icon}</p>
            <p className="ml-1">{item.tab}</p>
          </div>
        ))}
      </div>

      {/* POSTS */}
      <div className="flex flex-wrap">

  {activeTab === "Post" && Array.isArray(post.userPost) &&
    post.userPost.length > 0 &&
    post.userPost.map((item) => (
      <ReqUserPostCard key={item.id} post={item} />
    ))
  }

  {activeTab === "Saved" && Array.isArray(user?.savedPost) &&
    user.savedPost.length > 0 &&
    user.savedPost.map((item) => (
      <ReqUserPostCard key={item.id} post={item} />
    ))
  }

  {activeTab === "Reels" && (
    <div className="w-full text-center text-gray-400 py-10">
      No reels yet
    </div>
  )}

  {activeTab === "Tagged" && (
    <div className="w-full text-center text-gray-400 py-10">
      No tagged posts
    </div>
  )}

</div>

    </div>
  );
};

export default ReqUserPostPart;