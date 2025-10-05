import React from 'react'
import { IoMdPersonAdd } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { FaRegTrashCan } from 'react-icons/fa6';

export default function ContactMenu() {
    return (
        <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5">
            <div className="mb-1 w-full">
                <div className="mb-4">
                    <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Lista de contactos</h1>
                </div>
                <div className="sm:flex">
                    <div className="hidden sm:flex items-center sm:divide-x sm:divide-gray-100 mb-3 sm:mb-0">
                        <form className="lg:pr-3" action="#" method="GET">
                            <div className="mt-1 relative lg:w-64 xl:w-96">
                                <input type="text" name="email" id="users-search"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                    placeholder="Buscar contacto" />
                            </div>
                        </form>
                        <div className="flex space-x-1 pl-0 sm:pl-2 mt-3 sm:mt-0">
                            <button className="text-gray-500 hover:text-gray-900 cursor-pointer p-4 hover:bg-gray-100 rounded inline-flex justify-center">
                                <div className="w-5 h-5 text-gray-500">
                                    <FaSearch size={25} />
                                </div>
                            </button>
                            <button className="text-gray-500 hover:text-gray-900 cursor-pointer p-4 hover:bg-gray-100 rounded inline-flex justify-center">
                                <div className="w-6 h-6">
                                    <FaRegTrashCan size={25} />
                                </div>
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">
                        <button type="button" data-modal-toggle="add-user-modal"
                            className="w-1/2 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto">
                            <div className="-ml-1 mr-2 h-6 w-6">
                                <IoMdPersonAdd size={25}/>
                            </div>
                            Agregar contacto
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
