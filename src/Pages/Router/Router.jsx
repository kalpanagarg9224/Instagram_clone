import React from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";

import Sidebar from "../../Components/Sidebar/Sidebar";
import Homepage from "../HomePage/HomePage";
import Profile from "../Profile/Profile";
import Story from "../Story/Story";
import { Auth } from "../Auth/Auth";
import EditAccountDetails from "../../Components/EditAccount/EditAccountDetails";

const Router = () => {
  const location = useLocation();

  // 1. Check if the Spring Security JWT token exists in localStorage
  const isAuthenticated = localStorage.getItem("token") !== null;

  const hideSidebar =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/account/edit";

  // 2. Global Guard: If not logged in and trying to access a private app route, force redirect to /login
  if (!isAuthenticated && !["/login", "/signup"].includes(location.pathname)) {
    return <Navigate to="/login" replace />;
  }

  // 3. Reverse Guard: If they ARE logged in, don't let them wander back to /login or /signup manually
  if (isAuthenticated && ["/login", "/signup"].includes(location.pathname)) {
    return <Navigate to="/" replace />;
  }

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
              {/* Catch-all to prevent blank screens if someone types a broken URL */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      )}
    </div>
  );
};

export default Router;