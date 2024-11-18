import React from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { Key, Search, LogOut, LogIn } from "lucide-react";
import { getUser } from "../utils/utils";

const MainLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const userData = getUser();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear(); // Clear all localStorage
    navigate("/auth"); // Navigate to auth page
    window.location.reload(); // Refresh page
  };

  // If no login message, redirect to auth

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#074839] to-[#121212] text-white">
      <nav className="bg-black/20 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-bold">Vehicle Check</h1>

          <div className="flex items-center space-x-6">
            {/* Nav Links */}
            <Link
              to="/search"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
               ${
                 location.pathname === "/search"
                   ? "bg-[#1DB954] text-black"
                   : "text-white/60 hover:text-white hover:bg-white/10"
               }`}
            >
              <Search className="w-5 h-5" />
              Search Vehicle
            </Link>

            <Link
              to="/genratekey"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
               ${
                 location.pathname === "/genratekey"
                   ? "bg-[#1DB954] text-black"
                   : "text-white/60 hover:text-white hover:bg-white/10"
               }`}
            >
              <Key className="w-5 h-5" />
              API Key
            </Link>

            {/* Logout Button */}
            {userData && userData.message === "Login successful" ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            ) : (
              <Link
                to="/auth"
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
              >
                <LogIn className="w-5 h-5" />
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
