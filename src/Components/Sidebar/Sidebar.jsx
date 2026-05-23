import React, { useEffect, useRef, useState } from 'react';
import { IoReorderThree } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { menu } from './Sidebarconfig';
import { useDisclosure } from "@chakra-ui/react";
import MoreDropdown from './MoreDropdown';
import CreatePostModal from '../../Components/Post/CreatePostModal';
import SearchComponents from '../SearchComponents/SearchComponents';
import { useSelector } from 'react-redux';

const Sidebar = () => {
    const [activeTab,setActiveTab]=useState("");
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const {user} = useSelector(store=>store)
    const [showMore, setShowMore] = useState(false);
    const dropdownRef = useRef();

    const handleTabClick=(title)=>{
        setActiveTab(title)
        if(title==="Profile"){ navigate(`/${user.reqUser?.username}`);}
        else if(title==="Home"){navigate("/")}
        else if(title==="Create"){onOpen()}
        if(title==="Search"){
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


    return(
        <div className='Sticky top-0 h-[100vh] flex'>
            <div className={`"flex flex-col justify-between h-full ${activeTab==="Search"?"px-2":'px-10'}`}>
                <div>
                    {activeTab !== "Search" && <div className='pt-10'>
                    <img className='w-40' src="https://i.imgur.com/zqpwkLQ.png" alt="" />
                </div>}
                <div className='mt-10'>
                    {menu.map((item) => (
                        <div  key={item.title} onClick={()=>handleTabClick(item.title)} className='flex items-center mb-5 cursor-pointer text-lg'>
                        {activeTab===item.title ? item.ActiveIcon : item.icon}
                         {activeTab !== "Search" && <p className={`${activeTab===item.title ? "font-bold" : "font-semibold"}`}>{item.title}</p>}
                    </div>))}
                </div>
                </div>
                <div className='relative pb-10' ref={dropdownRef}>

    <div
        onClick={() => setShowMore(!showMore)}
        className='flex items-center cursor-pointer'
    >

        <IoReorderThree className='text-2xl'/>

        {activeTab !== "Search" && (
            <p className='ml-5'>
                More
            </p>
        )}

    </div>

    <MoreDropdown show={showMore}/>

</div>
            </div>
            <CreatePostModal onClose={onClose} isOpen={isOpen}/>
            {isSearchVisible && <SearchComponents/>}
        </div>
    );
};

export default Sidebar;

