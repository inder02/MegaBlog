import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import authService, { AuthService } from "./appwrite/auth";
import React from "react";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { login, logout } from "./store/authSlice";
import { Outlet } from "react-router-dom";
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else dispatch(logout());
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  ) : (
    <div>...loading</div>
  );
}

export default App;
