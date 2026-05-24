import { AiOutlineHome,AiFillHome, AiOutlineSearch,AiFillHeart,AiFillPlusCircle,AiOutlineHeart,AiOutlineMessage, AiOutlineCompass, AiFillCompass,AiFillMessage, AiOutlinePlusCircle } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { RiVideoFill,RiVideoLine } from "react-icons/ri";
import { BsFillSearchHeartFill } from "react-icons/bs";
export const menu=[
    {title:"Home", icon:<AiOutlineHome className="text-2xl mr-5"/>, ActiveIcon:<AiFillHome className="text-2xl mr-5"/>},
    {title:"Search", icon:<AiOutlineSearch className="text-2xl mr-5"/>, ActiveIcon:<BsFillSearchHeartFill className="text-2xl mr-5"/>},
    {title:"Explore", icon:<AiOutlineCompass className="text-2xl mr-5"/>, ActiveIcon:<AiFillCompass className="text-2xl mr-5"/>},
    {title:"VibeFeed", icon:<RiVideoLine className="text-2xl mr-5"/>, ActiveIcon:<RiVideoFill className="text-2xl mr-5"/>},
    {title:"Chat", icon:<AiOutlineMessage className="text-2xl mr-5"/>, ActiveIcon:<AiFillMessage className="text-2xl mr-5"/>},
    {title:"Alerts", icon:<AiOutlineHeart className="text-2xl mr-5"/>, ActiveIcon:<AiFillHeart className="text-2xl mr-5"/>},
    {title:"Create", icon:<AiOutlinePlusCircle className="text-2xl mr-5"/>, ActiveIcon:<AiFillPlusCircle className="text-2xl mr-5"/>},
    {title:"Profile", icon:<CgProfile className="text-2xl mr-5"/>, ActiveIcon:<CgProfile className="text-2xl mr-5"/>}
]
