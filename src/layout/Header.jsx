import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import md5 from "md5";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const user = useSelector((state) => state.client.user);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const gravatarUrl = user.email
    ? `https://www.gravatar.com/avatar/${md5(user.email.trim().toLowerCase())}`
    : null;

  return (
    <header className="font-display">
      <div className="bg-[#252B42] text-white w-full py-3 font-bold text-sm hidden lg:block">
        <div className="w-11/12 flex mx-auto justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <i className="fas fa-phone"></i>
              <p>(225) 555-0118</p>
            </div>
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-envelope"></i>
              <p>michelle.rivera@example.com</p>
            </div>
          </div>
          <h1>Follow Us and get a chance to win 80% off</h1>
          <div className="flex items-center gap-4">
            <p>Follow Us :</p>
            <i className="fa-brands fa-instagram"></i>
            <i className="fa-brands fa-youtube"></i>
            <i className="fa-brands fa-facebook"></i>
            <i className="fa-brands fa-twitter"></i>
          </div>
        </div>
      </div>
      <div className="w-5/6 md:w-11/12 mx-auto flex justify-between py-6 text-[#252B42]">
        <div className="flex gap-24">
          <h6 className="font-display font-bold text-2xl">
            <NavLink to="/">Bandage</NavLink>
          </h6>
          <ul className="hidden lg:flex gap-3 items-center text-[#737373] font-bold">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="font-medium text-[#252B42] cursor-pointer ">
              <NavLink to="/shop">
                Shop
                <i className="fas fa-chevron-down fa-xs pl-2 "></i>
              </NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>Blog</li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
            <li>
              <NavLink to="/team">Team</NavLink>
            </li>
          </ul>
        </div>
        <div className="flex gap-6 items-center md:text-[#23A6F0] relative">
          <div className="flex items-center gap-1">
            <i
              className={`fas fa-user fa-lg cursor-pointer ${
                user.email ? "hidden" : ""
              }`}
              onClick={toggleUserMenu}
            ></i>
            {user.email ? (
              <div className="flex items-center gap-2">
                <img
                  src={gravatarUrl}
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
                />
                <p className="font-bold hidden lg:block">{user.name}</p>
              </div>
            ) : (
              <p className="font-bold hidden lg:block">
                <NavLink to="/login">Login</NavLink> /{" "}
                <span>
                  <NavLink to="/signup">Register</NavLink>
                </span>
              </p>
            )}
          </div>
          {userMenuOpen && !user.email && (
            <div className="absolute top-12 right-14 bg-white shadow-md rounded-md p-4 z-10 lg:hidden">
              <NavLink
                to="/login"
                className="block text-text-color font-bold py-1"
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="block text-text-color font-bold py-1"
              >
                Register
              </NavLink>
            </div>
          )}
          <i className="fas fa-search fa-lg"></i>
          <div className="flex items-center gap-1">
            <i className="fas fa-shopping-cart fa-lg"></i>
            <p className="hidden lg:block">1</p>
          </div>
          <i
            className="fas fa-bars fa-lg lg:hidden cursor-pointer"
            onClick={toggleMenu}
          ></i>
          <div className="hidden lg:flex items-center gap-1">
            <i className="fas fa-heart hidden lg:block"></i>
            <p className="hidden lg:block">1</p>
          </div>
        </div>
      </div>
      <div
        className={`${
          !menuOpen ? "hidden" : ""
        } text-center py-6 font-display text-3xl text-[#737373] lg:hidden`}
      >
        <ul className="flex flex-col gap-3">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/shop">Shop</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>Blog</li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
          <li>
            <NavLink to="/team">Team</NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
}
