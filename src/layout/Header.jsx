import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import md5 from "md5";
import { fetchCategories } from "../redux/actions/thunkActions";
import { toggleCartDropdown } from "../redux/actions/shoppingCartActions";
import ShoppingCartDropdown from "../components/ShoppingCartDropdown";
import { setUser } from "../redux/actions/clientActions";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [shopMenuOpen, setShopMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const user = useSelector((state) => state.client.user);
  const categories = useSelector((state) => state.category.categories);
  const cart = useSelector((state) => state.shoppingCart.cart);
  const history = useHistory();

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const handleMouseEnter = () => {
    if (timeoutId) clearTimeout(timeoutId);
    if (window.innerWidth >= 768) {
      setIsDropdownVisible(true);
    }
  };

  const handleCartClick = () => {
    if (window.innerWidth < 768) {
      history.push("/shopping-cart");
    }
  };
  const handleMouseLeave = () => {
    const id = setTimeout(() => {
      setIsDropdownVisible(false);
    }, 200);
    setTimeoutId(id);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const toggleShopMenu = () => {
    setShopMenuOpen(!shopMenuOpen);
  };

  const toggleCartDropdownLocal = () => {
    dispatch(toggleCartDropdown());
  };

  const toggleUserDropdown = () => {
    setUserDropdownOpen(!userDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    dispatch(setUser({}));
    setUserDropdownOpen(false);
  };

  const gravatarUrl = user.email
    ? `https://www.gravatar.com/avatar/${md5(user.email.trim().toLowerCase())}`
    : null;

  const womenCategories = categories.filter((cat) => cat.gender === "k");
  const menCategories = categories.filter((cat) => cat.gender === "e");

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
            <li className="relative font-medium text-[#252B42]">
              <NavLink to="/shop">Shop</NavLink>
              <i
                className={`fas fa-chevron-${
                  shopMenuOpen ? "up" : "down"
                } fa-xs pl-2 cursor-pointer`}
                onClick={toggleShopMenu}
              ></i>
              {shopMenuOpen && (
                <div className="absolute  mt-2 shadow-md bg-white flex gap-4 justify-between p-4 z-10">
                  <div className="">
                    <h3 className="font-bold mb-4 text-second-text-color">
                      Kadın
                    </h3>
                    <ul className="flex flex-col gap-2 text-sm text-second-text-color">
                      {womenCategories.map((cat) => (
                        <li key={cat.id}>
                          <NavLink to={`/shop?category=${cat.id}`}>
                            {cat.title}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold mb-4 text-second-text-color">
                      Erkek
                    </h3>
                    <ul className="flex flex-col gap-2 text-sm text-second-text-color">
                      {menCategories.map((cat) => (
                        <li key={cat.id}>
                          <NavLink to={`/shop?category=${cat.id}`}>
                            {cat.title}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
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
              <div className="relative">
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={toggleUserDropdown}
                >
                  <img
                    src={gravatarUrl}
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <p className="font-bold hidden lg:block">{user.name}</p>
                  <i
                    className={`fas fa-chevron-${
                      userDropdownOpen ? "up" : "down"
                    } fa-xs`}
                  ></i>
                </div>
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md z-50">
                    <ul className="py-1 text-sm text-gray-700">
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={handleLogout}
                      >
                        Logout
                      </li>
                      <Link to="/previous-orders">
                        <li
                          onClick={() => setUserDropdownOpen(false)}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                          Previous Orders
                        </li>
                      </Link>
                    </ul>
                  </div>
                )}
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
          <div
            className="relative z-50"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className="flex items-center gap-1 cursor-pointer"
              onClick={toggleCartDropdownLocal}
            >
              <i
                className="fas fa-shopping-cart fa-lg"
                onClick={handleCartClick}
              ></i>
              <p className="hidden lg:block">{cart.length}</p>
            </div>
            {isDropdownVisible && <ShoppingCartDropdown cart={cart} />}
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
          <li onClick={() => setMenuOpen(false)}>
            <NavLink to="/">Home</NavLink>
          </li>
          <li onClick={() => setMenuOpen(false)}>
            <NavLink to="/shop">Shop</NavLink>
          </li>
          <li onClick={() => setMenuOpen(false)}>
            <NavLink to="/about">About</NavLink>
          </li>
          <li onClick={() => setMenuOpen(false)}>Blog</li>
          <li onClick={() => setMenuOpen(false)}>
            <NavLink to="/contact">Contact</NavLink>
          </li>
          <li onClick={() => setMenuOpen(false)}>
            <NavLink to="/team">Team</NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
}
