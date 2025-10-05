import React from 'react'
import { FaEdit } from 'react-icons/fa'

export default function EditContact() {
    return (
        <button type="button" data-modal-toggle="user-modal"
            className="text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center">
            <div className="mr-2 h-5 w-5">
                <FaEdit size={20} />
            </div>
            Editar
        </button>
    )
}
