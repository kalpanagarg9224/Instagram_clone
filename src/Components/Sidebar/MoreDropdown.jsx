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
        <div className="absolute bottom-16 left-4 w-60 z-50 overflow-hidden
            rounded-2xl border border-white/10
            bg-white/10 backdrop-blur-xl
            shadow-2xl text-white">

            {/* 🌈 subtle gradient overlay like EditAccount */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-blue-500/10" />

            {/* SETTINGS */}
            <div className="relative p-4 flex items-center gap-3
                hover:bg-white/10 cursor-pointer transition">

                <FiSettings className="text-xl text-black/80" />
                <p className="text-sm font-medium text-black text-gray-200">Settings</p>
            </div>

            <hr className="border-white/10" />

            {/* LOGOUT */}
            <div
                onClick={handleLogout}
                className="relative p-4 flex items-center gap-3
                hover:bg-red-500/10 cursor-pointer transition
                text-red-700"
            >
                <FiLogOut className="text-xl" />
                <p className="text-sm font-medium">Logout</p>
            </div>
        </div>
    );
};

export default MoreDropdown;