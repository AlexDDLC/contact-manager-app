import React from 'react'
import { FaSearch } from "react-icons/fa";
import { FaRegTrashCan } from 'react-icons/fa6';
import AddContact from './buttons/AddContact';

export default function ContactMenu() {
    return (
        <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5">
            <div className="mb-1 w-full">
                <div className="mb-4">
                    <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Lista de contactos</h1>
                </div>
                <div className="sm:flex">
                    <AddContact />
                </div>
            </div>
        </div>
    )
}
