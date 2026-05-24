import React, { useEffect, useRef, useState } from "react";
import { IoReorderThree } from "react-icons/io5";
import { RiSparkling2Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { menu } from "./Sidebarconfig";
import { useDisclosure } from "@chakra-ui/react";
import MoreDropdown from "./MoreDropdown";
import CreatePostModal from "../../Components/Post/CreatePostModal";
import SearchComponents from "../SearchComponents/SearchComponents";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
    const [activeTab, setActiveTab] = useState("Home");

    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const { user } = useSelector(store => store);
    const [showMore, setShowMore] = useState(false);
    const dropdownRef = useRef();
    const location = useLocation();

    const handleTabClick = (title) => {
        setActiveTab(title);

        if (title === "Profile") {
            if (user?.reqUser?.username) {
                navigate(`/${user.reqUser.username}`);
            }
        } else if (title === "Home") {
            navigate("/");
        } else if (title === "Create") {
            onOpen();
        }

        setIsSearchVisible(title === "Search");
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setShowMore(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="flex min-h-screen text-white relative overflow-hidden">

            {/* 🌈 BACKGROUND (match EditAccount) */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute w-[420px] h-[420px] bg-pink-500/25 rounded-full blur-3xl top-[-120px] left-[-120px]" />
                <div className="absolute w-[350px] h-[350px] bg-blue-500/25 rounded-full blur-3xl bottom-[-120px] right-[-120px]" />
                <div className="absolute w-[250px] h-[250px] bg-purple-500/20 rounded-full blur-2xl top-[40%] left-[30%]" />
            </div>

            {/* DARK OVERLAY */}
            <div className="absolute inset-0 bg-black/60 -z-10" />

            {/* SIDEBAR */}
            <div
                className="
                    sticky top-0 h-screen w-[260px]
                    flex flex-col justify-between
                    px-6 py-8
                    backdrop-blur-xl
                    bg-white/5
                    border-r border-white/10
                "
            >

                {/* TOP */}
                <div>
                    {/* 🌟 ANIMATED VYBE BRAND MARK */}
<div className="pt-2 flex items-center gap-3 group cursor-pointer">

    {/* LOGO WRAPPER */}
    <div className="relative w-12 h-12 rounded-2xl overflow-hidden">

        {/* 🔥 ROTATING GLOW RING */}
        <div className="
            absolute inset-[-6px]
            bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500
            rounded-2xl
            blur-md opacity-60
            animate-[spin_6s_linear_infinite]
            group-hover:opacity-90
        " />

        {/* BREATHING CORE GLOW */}
        <div className="
            absolute inset-0
            bg-gradient-to-br from-pink-500/40 via-purple-500/40 to-blue-500/40
            blur-xl
            animate-pulse
        " />

        {/* GLASS BASE */}
        <div className="
            absolute inset-1 rounded-2xl
            bg-black/40 backdrop-blur-xl
            border border-white/10
        " />

        {/* V SHAPE */}
        <div className="absolute inset-0 flex items-center justify-center">

            <div className="relative w-6 h-6">

                {/* LEFT ARM */}
                <div className="
                    absolute left-0 top-0
                    w-[3px] h-full
                    bg-gradient-to-b from-pink-400 to-transparent
                    rotate-[20deg] origin-top
                    group-hover:rotate-[15deg]
                    transition-transform duration-300
                "/>

                {/* RIGHT ARM */}
                <div className="
                    absolute right-0 top-0
                    w-[3px] h-full
                    bg-gradient-to-b from-blue-400 to-transparent
                    -rotate-[20deg] origin-top
                    group-hover:-rotate-[15deg]
                    transition-transform duration-300
                "/>

                {/* ENERGY CORE */}
                <div className="
                    absolute bottom-0 left-1/2 -translate-x-1/2
                    w-2 h-2 rounded-full
                    bg-purple-400
                    animate-ping
                "/>

                {/* CENTER DOT */}
                <div className="
                    absolute bottom-0 left-1/2 -translate-x-1/2
                    w-1.5 h-1.5 rounded-full
                    bg-white
                    shadow-[0_0_10px_rgba(168,85,247,0.8)]
                "/>

            </div>
        </div>

        {/* SHIMMER OVERLAY */}
        <div className="
            absolute inset-0
            bg-gradient-to-r from-transparent via-white/10 to-transparent
            translate-x-[-100%]
            group-hover:translate-x-[100%]
            transition-transform duration-700
        "/>

    </div>

    {/* BRAND TEXT */}
    <div className="leading-none select-none">

        <div className="text-[20px] font-black tracking-[4px]">
            <span className="text-white">V</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400">
                YBE
            </span>
        </div>

        <div className="text-[10px] tracking-[6px] text-gray-400 uppercase mt-[2px]">
            feel the vibe
        </div>

    </div>
</div>

                    {/* MENU */}
                    <div className="mt-10 space-y-2">

                        {menu.map((item) => {
                            const active = activeTab === item.title;

                            return (
                                <div
                                    key={item.title}
                                    onClick={() => handleTabClick(item.title)}
                                    className={`
                                        flex items-center gap-4
                                        px-4 py-3 rounded-2xl
                                        cursor-pointer transition

                                        ${active
                                            ? "bg-white/15 border border-white/20"
                                            : "hover:bg-white/10"
                                        }
                                    `}
                                >
                                    <div className={`${active ? "text-pink-400" : "text-white/80"}`}>
                                        {active ? item.ActiveIcon : item.icon}
                                    </div>

                                    <p className={`text-base ${active ? "font-bold text-white" : "text-gray-300"}`}>
                                        {item.title}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* MORE */}
                <div className="relative pb-4" ref={dropdownRef}>

                    <div
                        onClick={() => setShowMore(!showMore)}
                        className="
                            flex items-center gap-4
                            px-4 py-3 rounded-2xl
                            cursor-pointer hover:bg-white/10
                        "
                    >
                        <IoReorderThree className="text-2xl text-white/80" />
                        <p className="text-base text-gray-300">More</p>
                    </div>

                    <MoreDropdown show={showMore} />
                </div>
            </div>

            {/* SEARCH */}
            {isSearchVisible && (
                <div className="w-[320px] flex-shrink-0 bg-white/5 backdrop-blur-xl border-r border-white/10">
                    <SearchComponents />
                </div>
            )}

            {/* MODAL */}
            <CreatePostModal onClose={onClose} isOpen={isOpen} />
        </div>
    );
};

export default Sidebar;