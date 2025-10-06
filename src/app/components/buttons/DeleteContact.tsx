'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
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

        try {
            const response = await fetch('http://localhost:3000/api/contacts', {
                method: 'DELETE',
                body: formData,
            })

            const result = await response.json()
            console.log(result)

            if (result.success) {
                closeModal()
                router.refresh()
            } else {
                setError(result.error as string)
            }
        } catch (err) {
            setError('Ocurrió un error inesperado')
        } finally {
            setIsLoading(false)
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
                                        {isLoading ? (
                                            <span className='flex items-center justify-center gap-2'>
                                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Eliminando contacto...
                                            </span>
                                        ) : 'Sí, eliminar'}
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
