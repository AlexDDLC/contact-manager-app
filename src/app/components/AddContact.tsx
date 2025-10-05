import React from 'react'
import { IoMdPersonAdd } from 'react-icons/io'

export default function AddContact() {
    return (
        <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">
            <button type="button" data-modal-toggle="add-user-modal"
                className="w-1/2 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto">
                <div className="-ml-1 mr-2 h-6 w-6">
                    <IoMdPersonAdd size={25} />
                </div>
                Agregar contacto
            </button>
        </div>
    )
}
