import React from 'react'
import { FaRegTrashCan } from 'react-icons/fa6'

export default function DeleteContact() {
    return (
        <button type="button" data-modal-toggle="delete-user-modal"
            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center">
            <div className="mr-2 h-5 w-5">
                <FaRegTrashCan size={20} />
            </div>
            Eliminar
        </button>
    )
}