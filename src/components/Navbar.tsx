"use client"

import Link from "next/link";
import Image from "next/image";
import SearchBar from "./SearchBar";
import dynamic from "next/dynamic";
import { useState } from "react";

const NavIcons = dynamic(() => import("./NavIcons"), { ssr: false });

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className='shadow-lg font-poppins tracking-wide relative z-50'>
      <section className='flex relative py-3 px-4 lg:px-20 border-gray-200 border-b bg-white lg:min-h-[70px] max-lg:min-h-[60px] items-center justify-between'>
        {/* Left side - Logo */}
        <Link href="/" className="flex items-center gap-3 flex-shrink-0">
          <Image src="/logo.png" alt="" width={100} height={100} />
        </Link>

        {/* Center - Navigation Menu */}
        <nav className='hidden lg:flex flex-1 justify-center mx-8'>
          <ul className='flex items-center gap-6'>
            <li>
              <Link href='/' className='hover:text-lama text-black text-[15px] font-medium uppercase'>
                Home
              </Link>
            </li>
            <li>
              <Link href='/' className='hover:text-lama text-black text-[15px] font-medium uppercase'>
                Categories
              </Link>
            </li>
            <li>
              <Link href='/' className='hover:text-lama text-black text-[15px] font-medium uppercase'>
                Shop
              </Link>
            </li>
            <li>
              <Link href='/' className='hover:text-lama text-black text-[15px] font-medium uppercase'>
                About
              </Link>
            </li>
            <li>
              <Link href='#footer' className='hover:text-lama text-black text-[15px] font-medium uppercase'>
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Right side - Search and Icons */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:block w-[180px]">
            <div className="relative">
              <input 
                type="search" 
                placeholder="SEARCH..." 
                className="w-full py-1.5 pl-8 pr-4 text-sm rounded-full border border-gray-200 focus:outline-none focus:border-lama font-poppins uppercase"
              />
              <svg 
                className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <div className="flex items-center">
            <NavIcons />
          </div>
          <button onClick={handleClick} className='lg:hidden'>
            <svg className="w-7 h-7" fill="#333" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd">
              </path>
            </svg>
          </button>
        </div>
      </section>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className='lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50'>
          <div className='fixed right-0 top-0 h-full w-[300px] bg-white p-6 overflow-auto font-poppins'>
            <button onClick={handleClick} className='absolute top-4 right-4 rounded-full bg-white w-9 h-9 flex items-center justify-center border'>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 fill-black" viewBox="0 0 320.591 320.591">
                <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"></path>
                <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"></path>
              </svg>
            </button>

            <div className='mt-8'>
              
              {/* Search bar in mobile menu */}
              <div className="mb-6">
                <div className="relative">
                  <input 
                    type="search" 
                    placeholder="SEARCH..." 
                    className="w-full py-2 pl-10 pr-4 text-sm rounded-full border border-gray-200 focus:outline-none focus:border-lama bg-gray-50 font-poppins uppercase"
                  />
                  <svg 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              <ul className='space-y-4'>
                <li className='border-b py-3'>
                  <Link href='/' className='hover:text-lama text-black text-[15px] font-medium uppercase block'>
                    Home
                  </Link>
                </li>
                <li className='border-b py-3'>
                  <Link href='/' className='hover:text-lama text-black text-[15px] font-medium uppercase block'>
                    Categories
                  </Link>
                </li>
                <li className='border-b py-3'>
                  <Link href='/' className='hover:text-lama text-black text-[15px] font-medium uppercase block'>
                    Shop
                  </Link>
                </li>
                <li className='border-b py-3'>
                  <Link href='/' className='hover:text-lama text-black text-[15px] font-medium uppercase block'>
                    About
                  </Link>
                </li>
                <li className='border-b py-3'>
                  <Link href='/' className='hover:text-lama text-black text-[15px] font-medium uppercase block'>
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;