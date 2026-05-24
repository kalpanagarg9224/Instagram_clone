import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Sidebar from "../../Components/Sidebar/Sidebar";
import Homepage from "../HomePage/HomePage";
import Profile from "../Profile/Profile";
import Story from "../Story/Story";
import { Auth } from "../Auth/Auth";
import EditAccountDetails from "../../Components/EditAccount/EditAccountDetails";

const Router = () => {
  const location = useLocation();

  const hideSidebar =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/account/edit";

  return (
    <div>

      {/* 🔴 FULL SCREEN ROUTES (NO SIDEBAR) */}
      {hideSidebar ? (
        <Routes>
          <Route path="/login" element={<Auth />} />
          <Route path="/signup" element={<Auth />} />
          <Route path="/account/edit" element={<EditAccountDetails />} />
        </Routes>
      ) : (
        /* 🟢 MAIN APP LAYOUT (WITH SIDEBAR) */
        <div className="flex">

          <div className="w-[20%] border border-l-slate-500">
            <Sidebar />
          </div>

          <div className="w-full">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/:username" element={<Profile />} />
              <Route path="/story/:userId" element={<Story />} />
              <Route path="/comment?/:postId" element={<Homepage />} />
            </Routes>
          </div>

        </div>
      )}

    </div>
  );
};

export default Router;