import Image from 'next/image';
import React from 'react';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 fixed z-30 w-full">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <div className="text-xl font-bold flex items-center lg:ml-2.5">
              <Image src="/contacts-book.png" alt='Logo' width={50} height={50} />
              <span className='self-center text-2xl font-bold whitespace-nowrap'>Contact Manager</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

