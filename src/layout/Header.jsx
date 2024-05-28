import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faShoppingCart,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <header className="font-display">
      <div className=" w-5/6 mx-auto flex justify-between py-6">
        <h6 className="font-display font-bold text-2xl">Bandage</h6>
        <div className="flex gap-5 items-center">
          <FontAwesomeIcon icon={faUser} size="lg" />
          <FontAwesomeIcon icon={faSearch} size="lg" />
          <FontAwesomeIcon icon={faShoppingCart} size="lg" />
          <FontAwesomeIcon
            icon={faChevronDown}
            size="lg"
            onClick={toggleMenu}
          />
        </div>
      </div>
      <div
        className={`${
          !menuOpen ? "hidden" : ""
        } text-center py-6 font-display text-3xl text-[#737373]`}
      >
        <ul className="flex flex-col gap-3">
          <li>Home</li>
          <li>Shop</li>
          <li>About</li>
          <li>Blog</li>
          <li>Contact</li>
          <li>Pages</li>
        </ul>
      </div>
      <div className=" w-11/12 bg-gradient-to-r from-[#96E9FB] to-[#ABECD6] h-auto mx-auto rounded-xl mt-6 flex flex-col pt-12">
        <div className="flex flex-col text-center items-center gap-6">
          <p className="font-bold text-base text-[#2A7CC7]">SUMMER 2024</p>
          <h1 className="font-bold text-[40px] text-[#252B42] w-3/4 leading-tight">
            NEW COLLECTION
          </h1>
          <p className="w-1/2 text-xl leading-normal text-[#737373]">
            We know how large objects will act, but things on a small scale.
          </p>
          <button className="font-bold text-2xl bg-[#23A6F0] text-white px-6 py-3 rounded">
            SHOP NOW
          </button>
        </div>
        <img
          src="./../../public/assets/homepage/homepage-header-mobile-hero.png"
          alt=""
          className="w-full"
        />
      </div>
    </header>
  );
}
