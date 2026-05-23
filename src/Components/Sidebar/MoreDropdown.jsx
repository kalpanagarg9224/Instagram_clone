import React from 'react';
import { FiSettings, FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const MoreDropdown = ({ show }) => {

    const navigate = useNavigate();

    const handleLogout = () => {

    localStorage.clear();

    navigate("/login");

    window.location.reload();

};

    if (!show) return null;

    return (

        <div className='absolute bottom-16 left-4 bg-white shadow-xl rounded-2xl w-60 border z-50 overflow-hidden'>

            <div className='p-4 hover:bg-gray-100 cursor-pointer flex items-center space-x-3'>

                <FiSettings className='text-xl'/>

                <p>Settings</p>

            </div>

            <hr/>

            <div
                onClick={handleLogout}
                className='p-4 hover:bg-red-50 text-red-500 cursor-pointer flex items-center space-x-3'
            >

                <FiLogOut className='text-xl'/>

                <p>Logout</p>

            </div>

        </div>

    );

};

export default MoreDropdown;