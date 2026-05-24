import React, { useEffect, useRef, useState } from 'react';
import { IoReorderThree } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { menu } from './Sidebarconfig';
import { useDisclosure } from "@chakra-ui/react";
import MoreDropdown from './MoreDropdown';
import CreatePostModal from '../../Components/Post/CreatePostModal';
import SearchComponents from '../SearchComponents/SearchComponents';
import { useSelector } from 'react-redux';
import VybeLogo from '../../Components/Brand/VybeLogo';

const Sidebar = () => {
    const [activeTab, setActiveTab] = useState("");
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const { user } = useSelector(store => store)
    const [showMore, setShowMore] = useState(false);
    const dropdownRef = useRef();

    const handleTabClick = (title) => {
        setActiveTab(title)
        if (title === "Profile") { navigate(`/${user.reqUser?.username}`); }
        else if (title === "Home") { navigate("/") }
        else if (title === "Create") { onOpen() }
        if (title === "Search") {
            setIsSearchVisible(true)
        }
        else setIsSearchVisible(false);
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

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {

            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

        };

    }, []);


    return (
        // <div className='sticky top-0 h-[100vh] flex'>
        <div className='relative sticky top-0 h-[100vh] flex overflow-hidden'>

  {/* 🌈 BACKGROUND */}
  <div className="absolute inset-0 -z-10">

    <div className="absolute w-[500px] h-[500px] bg-pink-500/25 rounded-full blur-3xl animate-pulse top-[-120px] left-[-120px]" />

    <div className="absolute w-[400px] h-[400px] bg-blue-500/25 rounded-full blur-3xl animate-pulse bottom-[-120px] right-[-120px]" />

    <div className="absolute w-[300px] h-[300px] bg-purple-500/20 rounded-full blur-2xl animate-bounce top-[40%] left-[40%]" />

  </div>

  {/* DARK OVERLAY */}
  <div className="absolute inset-0 bg-black/40 backdrop-blur-2xl border-r border-white/10 -z-10" />
  <div
    className={`
    flex flex-col justify-between
    h-full
    ${activeTab === "Search" ? "px-2" : "px-6"}
    py-4
  `}
>
            {/* SIDEBAR CONTENT */}

                <div>
                    {activeTab !== "Search" && (<div className='pt-8 pb-6 px-2 transition-all duration-300'>
                            <VybeLogo />
                        </div>
                    )}
                    <div className='mt-10'>
                        {menu.map((item) => (
                            <div key={item.title} onClick={() => handleTabClick(item.title)} className='flex items-center mb-5 cursor-pointer text-lg'>
                                {activeTab === item.title ? item.ActiveIcon : item.icon}
                                {activeTab !== "Search" && <p className={`${activeTab === item.title ? "font-bold" : "font-semibold"}`}>{item.title}</p>}
                            </div>))}
                    </div>
                </div>
                <div className='relative pb-10 mt-auto' ref={dropdownRef}>

                    <div
                        onClick={() => setShowMore(!showMore)}
                        className='flex items-center cursor-pointer'
                    >

                        <IoReorderThree className='text-2xl' />

                        {activeTab !== "Search" && (
                            <p className='ml-5'>
                                More
                            </p>
                        )}

                    </div>

                    <MoreDropdown show={showMore} />

                </div>
            </div>
            <CreatePostModal onClose={onClose} isOpen={isOpen} />
            {isSearchVisible && <SearchComponents />}
        </div>
    );
};

export default Sidebar;

