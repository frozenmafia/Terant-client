"use client";
import { useAppSelector } from '@/lib/hooks';
import Link from 'next/link';
import React from 'react';
import AccountMenu from './AccountMenu'; // Adjust the import path as necessary
import Logo from '../Logo/Logo';

const navItems = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
];

const Navbar = () => {
//   const auth = useAppSelector((state) => state.auth);

  return (
    <div className="shadow-md py-4 bg-gray-800 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
            <Logo/>
          {navItems.map((item) => (
            <Link key={item.path} href={item.path} className="text-white hover:text-gray-400">
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex space-x-4">
          {/* {auth.user ? (
            <AccountMenu />
          ) : (
            <>
              <Link href="/login" className="text-white hover:text-gray-400">
                Login
              </Link>
              <Link href="/register" className="text-white hover:text-gray-400">
                Register
              </Link>
            </>
          )} */}
          <AccountMenu/>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
