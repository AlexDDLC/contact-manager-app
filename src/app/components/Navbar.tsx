'use client'

import Image from 'next/image';
import React from 'react';
import { signOut } from 'next-auth/react';

export default function Navbar() {

  const handleSignOut = () => {
    signOut();
  };

  return (
    <nav className="bg-white border-b border-gray-200 fixed z-30 w-full shadow-md">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <div className="text-xl font-bold flex items-center lg:ml-2.5">
              <Image src="/contacts-book.png" alt='Logo' width={50} height={50} />
              <span className='self-center text-2xl font-bold whitespace-nowrap'>Contact Manager</span>
            </div>
          </div>
          <div className='flex items-center'>
            <button
              onClick={handleSignOut}
              className="flex items-center space-x-2 text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition duration-150 active:scale-95"
              aria-label="Cerrar sesión">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
              <span className="hidden sm:inline">Cerrar sesión</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
