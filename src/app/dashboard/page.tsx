export const dynamic = 'force-dynamic';

import React from 'react'
import Navbar from '../components/Navbar'
import ContactMenu from '../components/ContactListTop'
import ContactList from '../components/ContactList';

function Dashboard() {
    return (
        <>
            <Navbar />
            <div className="flex overflow-hidden bg-white pt-16">
                <div className='h-full w-full bg-gray-50 relative overflow-y-auto'>
                    <ContactList />
                </div>
            </div>
        </>
    )
}

export default Dashboard