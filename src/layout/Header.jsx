import { useState } from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
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
      <div className=" w-5/6 md:w-11/12 mx-auto flex justify-between py-6 text-[#252B42]">
        <div className="flex gap-24">
          <h6 className="font-display font-bold text-2xl">Bandage</h6>
          <ul className="hidden lg:flex gap-3 items-center text-[#737373] font-bold">
            <li>
              {" "}
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
        <div className="flex gap-6 items-center md:text-[#23A6F0]">
          <div className="flex items-center gap-1">
            <i className="fas fa-user fa-lg ]"></i>
            <p className="font-bold hidden lg:block">Login / Register</p>
          </div>

          <i className="fas fa-search fa-lg"></i>
          <div className="flex items-center gap-1">
            <i className="fas fa-shopping-cart fa-lg "></i>
            <p className="hidden lg:block">1</p>
          </div>

          <i
            className="fas fa-bars fa-lg lg:hidden cursor-pointer"
            onClick={toggleMenu}
          ></i>
          <div className=" hidden lg:flex items-center gap-1 ">
            <i className="fas fa-heart hidden lg:block"></i>
            <p className="hidden lg:block">1</p>
          </div>
        </div>
      </div>
      <div
        className={`${
          !menuOpen ? "hidden" : ""
        } text-center py-6 font-display text-3xl text-[#737373] md:hidden`}
      >
        <ul className="flex flex-col gap-3 ">
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
