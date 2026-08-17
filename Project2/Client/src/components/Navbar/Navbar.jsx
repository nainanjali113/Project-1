import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import {
  FiSearch,
  FiMenu,
  FiX
} from 'react-icons/fi'

import {
  HiOutlineUser,
  HiOutlineShoppingBag
} from 'react-icons/hi'

import { FaRegHeart } from 'react-icons/fa'

export default function Navbar() {

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const location = useLocation()

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Women', path: '/women' },
    { name: 'Men', path: '/men' },
    { name: 'Kids', path: '/kids' },
    { name: 'Collection', path: '/collection' },
    { name: 'Sale', path: '/sale' }
  ]

  const handleLinkClick = () => {
    setIsMenuOpen(false)
  }

  return (

    <nav
      className="
        sticky top-0 z-50
        bg-white/90 backdrop-blur-xl
        border-b border-blue-100
        shadow-[0_5px_30px_rgba(0,0,0,0.05)]
      "
    >

      {/* Top Banner */}
      <div
        className="
          bg-gradient-to-r from-black via-blue-950 to-black
          text-white text-center
          py-3
          text-sm
          tracking-[0.2em]
          font-medium
        "
      >
        ✨ NEW ARRIVALS • PREMIUM FASHION COLLECTION
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

        {/* Navbar */}
        <div
          className="
            flex items-center justify-between
            py-5
            gap-6
          "
        >

          {/* LEFT SECTION */}
          <div
            className="
              flex items-center
              gap-4 lg:gap-5
              shrink-0
            "
          >

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="
                lg:hidden
                w-11 h-11
                rounded-2xl
                bg-[#F8F5F0]
                flex items-center justify-center
                text-2xl text-black
                shadow-sm
              "
            >
              {isMenuOpen ? <FiX /> : <FiMenu />}
            </button>

            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-3"
            >

              {/* Logo Icon */}
              <div
                className="
                  w-12 h-12
                  rounded-2xl
                  bg-gradient-to-br from-blue-600 via-blue-700 to-black
                  flex items-center justify-center
                  shadow-lg
                "
              >
                <span className="text-white text-xl font-bold">
                  E
                </span>
              </div>

              {/* Logo Text */}
              <div>

                <h1
                  className="
                    text-2xl lg:text-3xl
                    font-black
                    tracking-[0.25em]
                    text-black
                    leading-none
                  "
                >
                  ELARA
                </h1>

                <p
                  className="
                    text-[10px]
                    uppercase
                    tracking-[0.3em]
                    text-gray-500
                    mt-1
                  "
                >
                  Fashion Store
                </p>

              </div>

            </Link>

          </div>

          {/* CENTER NAVIGATION */}
          <div className="hidden xl:flex flex-1 justify-center">

            <ul
              className="
                flex items-center
                gap-8 2xl:gap-10
              "
            >

              {navLinks.map((item) => {

                const isActive = location.pathname === item.path

                return (

                  <li key={item.name}>

                    <Link
                      to={item.path}
                      onClick={handleLinkClick}
                      className={`
                        relative
                        text-[15px]
                        font-semibold
                        uppercase
                        tracking-[0.08em]
                        pb-2
                        transition-all duration-300
                        ${
                          isActive
                            ? 'text-blue-700'
                            : 'text-gray-700 hover:text-black'
                        }
                      `}
                    >

                      {item.name}

                      {/* Underline */}
                      <span
                        className={`
                          absolute left-0 -bottom-[2px]
                          h-[3px]
                          rounded-full
                          bg-gradient-to-r from-blue-600 to-black
                          transition-all duration-300
                          ${
                            isActive
                              ? 'w-full'
                              : 'w-0 hover:w-full'
                          }
                        `}
                      />

                    </Link>

                  </li>
                )
              })}

            </ul>

          </div>

          {/* RIGHT SECTION */}
          <div
            className="
              hidden lg:flex
              items-center
              gap-5 xl:gap-6
              shrink-0
            "
          >

            {/* Search Bar */}
            <div className="relative">

              <input
                type="text"
                placeholder="Search products..."
                className="
                  w-[230px] xl:w-[270px]
                  focus:w-[320px]
                  transition-all duration-500
                  pl-12 pr-5 py-3
                  rounded-full
                  bg-[#F8F5F0]
                  border border-transparent
                  focus:border-blue-200
                  focus:outline-none
                  text-sm
                  shadow-sm
                "
              />

              <FiSearch
                className="
                  absolute left-4 top-1/2 -translate-y-1/2
                  text-gray-500 text-lg
                "
              />

            </div>

            {/* Icons */}
            <div className="flex items-center gap-3">

              {/* Profile */}
              <Link
                to="/profile"
                className="
                  w-11 h-11
                  rounded-2xl
                  bg-[#F8F5F0]
                  flex items-center justify-center
                  text-[22px]
                  text-gray-700
                  hover:bg-blue-600
                  hover:text-white
                  transition-all duration-300
                  shadow-sm
                "
              >
                <HiOutlineUser />
              </Link>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="
                  w-11 h-11
                  rounded-2xl
                  bg-[#F8F5F0]
                  flex items-center justify-center
                  text-[20px]
                  text-gray-700
                  hover:bg-blue-600
                  hover:text-white
                  transition-all duration-300
                  shadow-sm
                "
              >
                <FaRegHeart />
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                className="
                  relative
                  w-11 h-11
                  rounded-2xl
                  bg-black
                  flex items-center justify-center
                  text-[22px]
                  text-white
                  shadow-lg
                "
              >

                <HiOutlineShoppingBag />

                <span
                  className="
                    absolute -top-2 -right-2
                    w-5 h-5
                    rounded-full
                    bg-blue-600
                    text-[10px]
                    font-bold
                    flex items-center justify-center
                    border border-white
                  "
                >
                  0
                </span>

              </Link>

            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">

              {/* Sign Up */}
              <Link to="/signup">

                <button
                  className="
                    px-5 py-2.5
                    rounded-full
                    border border-gray-300
                    bg-white
                    text-gray-700
                    font-medium
                    hover:bg-[#F8F5F0]
                    transition-all duration-300
                    whitespace-nowrap
                  "
                >
                  Sign Up
                </button>

              </Link>

              {/* Login */}
              <Link to="/login">

                <button
                  className="
                    px-5 py-2.5
                    rounded-full
                    bg-gradient-to-r from-blue-600 to-black
                    text-white
                    font-medium
                    hover:opacity-90
                    transition-all duration-300
                    shadow-lg
                    whitespace-nowrap
                  "
                >
                  Login
                </button>

              </Link>

            </div>

          </div>

          {/* MOBILE RIGHT */}
          <div className="flex lg:hidden items-center gap-3">

            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="
                w-10 h-10
                rounded-2xl
                bg-[#F8F5F0]
                flex items-center justify-center
                text-xl text-black
                shadow-sm
              "
            >
              <FiSearch />
            </button>

            {/* Cart */}
            <Link
              to="/cart"
              className="
                relative
                w-10 h-10
                rounded-2xl
                bg-black
                flex items-center justify-center
                text-white text-xl
                shadow-lg
              "
            >

              <HiOutlineShoppingBag />

              <span
                className="
                  absolute -top-2 -right-2
                  w-5 h-5
                  rounded-full
                  bg-blue-600
                  text-[10px]
                  flex items-center justify-center
                  border border-white
                "
              >
                0
              </span>

            </Link>

          </div>

        </div>

        {/* MOBILE SEARCH */}
        {isSearchOpen && (

          <div className="lg:hidden pb-5">

            <div className="relative">

              <input
                type="text"
                placeholder="Search products..."
                className="
                  w-full
                  pl-12 pr-4 py-3
                  rounded-2xl
                  bg-[#F8F5F0]
                  border border-blue-100
                  focus:outline-none
                "
              />

              <FiSearch
                className="
                  absolute left-4 top-1/2 -translate-y-1/2
                  text-gray-500
                "
              />

            </div>

          </div>
        )}

        {/* MOBILE MENU */}
        {isMenuOpen && (

          <div
            className="
              lg:hidden
              border-t border-gray-100
              py-5
            "
          >

            {/* Mobile Nav Links */}
            <ul className="flex flex-col gap-3">

              {navLinks.map((item) => (

                <li key={item.name}>

                  <Link
                    to={item.path}
                    onClick={handleLinkClick}
                    className={`
                      block
                      py-3 px-4
                      rounded-2xl
                      font-medium
                      transition-all duration-300
                      ${
                        location.pathname === item.path
                          ? 'bg-gradient-to-r from-blue-600 to-black text-white'
                          : 'bg-[#F8F5F0] text-gray-700 hover:bg-blue-50'
                      }
                    `}
                  >
                    {item.name}
                  </Link>

                </li>
              ))}

            </ul>

            {/* Mobile Buttons */}
            <div className="grid grid-cols-2 gap-4 mt-6">

              <Link to="/signup">

                <button
                  className="
                    w-full py-3
                    rounded-2xl
                    border border-gray-300
                    bg-white
                    font-medium
                  "
                >
                  Sign Up
                </button>

              </Link>

              <Link to="/login">

                <button
                  className="
                    w-full py-3
                    rounded-2xl
                    bg-gradient-to-r from-blue-600 to-black
                    text-white
                    font-medium
                    shadow-lg
                  "
                >
                  Login
                </button>

              </Link>

            </div>

          </div>
        )}

      </div>

    </nav>
  )
}