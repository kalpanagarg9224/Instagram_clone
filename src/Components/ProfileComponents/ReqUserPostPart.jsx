import React, { useEffect, useState } from 'react'
import { RiVideoAddLine } from "react-icons/ri";
import { AiOutlineTable, AiOutlineUser } from "react-icons/ai";
import { BiBookmark } from "react-icons/bi";
import ReqUserPostCard from './ReqUserPostCard';
import "./ReqUserPostCard.css"
import { useDispatch, useSelector } from 'react-redux';
import { reqUserPostAction } from '../../Redux/Post/Action';

const ReqUserPostPart = ({ user }) => {

    const [activeTab, setActiveTab] = useState("Post");

    const dispatch = useDispatch();

    const token = localStorage.getItem("token");

    const { post } = useSelector(store => store);

    const tabs = [
        {
            tab: "Post",
            icon: <AiOutlineTable />
        },
        {
            tab: "Reels",
            icon: <RiVideoAddLine />
        },
        {
            tab: "Saved",
            icon: <BiBookmark />
        },
        {
            tab: "Tagged",
            icon: <AiOutlineUser />
        },
    ]

    useEffect(() => {

        if (user?.id) {

            dispatch(
                reqUserPostAction({
                    jwt: token,
                    userId: user.id
                })
            );
        }

    }, [user?.id, post.createdPost]);

    return (

        <div>

            <div className='flex space-x-14 border-t relative'>

                {
                    tabs.map((item) => (

                        <div
                            key={item.tab}
                            onClick={() => setActiveTab(item.tab)}
                            className={`
                                ${activeTab === item.tab
                                    ? "border-t border-black"
                                    : "opacity-60"
                                }
                                flex items-center cursor-pointer py-2 text-sm
                            `}
                        >

                            <p>{item.icon}</p>

                            <p className='ml-1'>
                                {item.tab}
                            </p>

                        </div>
                    ))
                }

            </div>

            <div>

                <div className='flex flex-wrap'>

                    {
                        activeTab === "Post"
                            ? (
                                Array.isArray(post.userPost) &&
                                post.userPost.map((item) => (
                                    <ReqUserPostCard
                                        key={item.id}
                                        post={item}
                                    />
                                ))
                            )
                            : (
                                Array.isArray(user?.savedPost) &&
                                user.savedPost.map((item) => (
                                    <ReqUserPostCard
                                        key={item.id}
                                        post={item}
                                    />
                                ))
                            )
                    }

                </div>

            </div>

        </div>
    );
};

export default ReqUserPostPart;
