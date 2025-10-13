export const dynamic = 'force-dynamic';

import React from 'react';
import Navbar from '../components/Navbar';
import ContactList from '../components/ContactList';

export default function Dashboard() {
  return (
    <>
      <Navbar />
      {/* deja espacio al navbar fijo */}
      <div className="pt-16 bg-gray-50 min-h-screen">
        <main className="mx-auto max-w-7xl px-4 lg:px-6">
          <ContactList />
        </main>
      </div>
    </>
  );
}
