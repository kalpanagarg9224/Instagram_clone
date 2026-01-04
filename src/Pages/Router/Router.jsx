import React from 'react';
import {Route, Routes} from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Homepage from "../HomePage/HomePage";
import Profile from "../Profile/Profile";
import Story from '../Story/Story';

const Router = () => {
    return(
        <div>
            <div className='flex'>
                <div className='w=[20%] border border-l-slate-500'>
                    <Sidebar/>
                </div>
                <div className='w-full'>
                    <Routes>
                        <Route path='/' element={<Homepage/>}></Route>
                        <Route path='/username' element={<Profile/>}></Route>
                        <Route path='/story' element={<Story/>}></Route>
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default Router;