'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { DELETE_Contact } from '@/app/api/auth/contacts/route'
import { FaRegTrashCan } from 'react-icons/fa6'

export default function DeleteContact({ contact }: { contact: any }) {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const openModal = () => setIsOpen(true)
    const closeModal = () => setIsOpen(false)

    const handleDelete = async () => {
        setIsLoading(true)
        setError('')

        const formData = new FormData()
        formData.append('id', contact.id)

        const result = await DELETE_Contact(formData)

        if (result.success) {
            setIsLoading(false)
            router.refresh()
        } else {
            setIsLoading(false)
            setError(result.error as string)
        }
    }

    return (
        <>
            <button type="button"
                onClick={openModal}
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center">
                <div className="mr-2 h-5 w-5">
                    <FaRegTrashCan size={20} />
                </div>
                Eliminar
            </button>

            {isOpen && (
                // <!-- Delete User Modal -->
                <div className="fixed inset-0 bg-black/60 top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-full max-h-full">
                    <div className="relative w-full max-w-md px-4 h-full md:h-auto">
                        {/* <!-- Modal content --> */}
                        <div className="bg-white rounded-lg shadow overflow-hidden overflow-y-auto max-h-[90vh] relative">
                            {/* <!-- Modal header --> */}
                            <div className="flex justify-end p-2">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Cerrar modal</span>
                                </button>
                            </div>
                            {/* <!-- Modal body --> */}
                            <div className="p-6 pt-0 text-center break-words">
                                <svg className="w-20 h-20 text-red-600 mx-auto" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
                                    </path>
                                </svg>
                                <h3 className="text-xl font-normal text-gray-500 mt-5 mb-6 break-words whitespace-normal text-center">
                                    Estas seguro de querer eliminar a <b> {contact.name} </b> de contactos?
                                </h3>
                                {error && (
                                    <p className="text-red-600 mb-4 text-sm break-words">{error}</p>
                                )}
                                <div className="flex justify-center gap-3">
                                    <button
                                        type="button"
                                        onClick={handleDelete}
                                        disabled={isLoading}
                                        className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-5 py-2.5 text-center">
                                        {isLoading ? 'Eliminando...' : 'Sí, eliminar'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 border border-gray-200 font-medium rounded-lg text-base px-5 py-2.5 text-center">
                                        No, cancelar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
