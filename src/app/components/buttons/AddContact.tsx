'use client'

import React, { useState } from 'react'
import { IoMdPersonAdd } from 'react-icons/io'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation';
import { POST_Contact } from '@/app/api/auth/contacts/route'

export default function AddContact() {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const openModal = () => setIsOpen(true)
    const closeModal = () => setIsOpen(false)
    const router = useRouter()

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = handleSubmit(async (data) => {
        setError('');
        setIsLoading(true);

        const formData = new FormData()
        formData.append('name', data.name)
        formData.append('email', data.email)
        formData.append('phone', data.phone)

        const result = await POST_Contact(formData)

        console.log(result);

        if (result.success) {
            setIsLoading(false)
            closeModal()
            router.refresh()
        } else {
            setIsLoading(false)
            setError(result.error as string)
        }
    })

    return (
        <>
            <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">
                <button
                    type="button"
                    onClick={openModal}
                    className="w-1/2 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto">
                    <div className="-ml-1 mr-2 h-6 w-6">
                        <IoMdPersonAdd size={25} />
                    </div>
                    Agregar contacto
                </button>
            </div>

            {isOpen && (
                <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-full max-h-full">
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        {/* Modal content */}
                        <div className="relative bg-white rounded-lg shadow-lg dark:bg-gray-700">
                            {/* Modal header */}
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Crear Nuevo Contacto
                                </h3>
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
                            {/* Show error alert */}
                            {error && (
                                <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative'>
                                    <span className='block sm:inline'>{error}</span>
                                    <button className='absolute top-0 bottom-0 right-0 px-4 py-3'
                                        onClick={() => setError('')}>
                                        <span className='text-2xl'>&times;</span>
                                    </button>
                                </div>
                            )}
                            {/* Modal body */}
                            <form onSubmit={onSubmit} className="p-4 md:p-5">
                                <div className="grid gap-4 mb-4 grid-cols-2">

                                    <div className="col-span-2">
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                                        <input type="text"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nombre completo"
                                            disabled={isLoading}
                                            {...register("name", {
                                                required: {
                                                    value: true,
                                                    message: "El nombre es requerido"
                                                }
                                            })} />
                                        {errors.name && (
                                            <span className='text-red-500 text-xs'>
                                                {String(errors.name.message)}
                                            </span>
                                        )}
                                    </div>

                                    <div className="col-span-2">
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                        <input type="email"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="nombre@ejemplo.com"
                                            {...register("email", {
                                                required: {
                                                    value: true,
                                                    message: "El correo es requerido"
                                                }
                                            })} />
                                        {errors.email && (
                                            <span className='text-red-500 text-xs'>
                                                {String(errors.email.message)}
                                            </span>
                                        )}
                                    </div>

                                    <div className="col-span-2">
                                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Teléfono</label>
                                        <input type="tel"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="809-123-4567"
                                            {...register("phone", {
                                                required: {
                                                    value: true,
                                                    message: "El correo es requerido"
                                                }
                                            })} />
                                        {errors.phone && (
                                            <span className='text-red-500 text-xs'>
                                                {String(errors.phone.message)}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    {isLoading ? (
                                        <span className='flex items-center justify-center gap-2'>
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Agregando contacto...
                                        </span>
                                    ) : (
                                        'Agregar contacto'
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}