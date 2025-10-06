'use client'

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation';
import { FaUserEdit } from 'react-icons/fa'

export default function EditContact({ contact }: { contact: any }) {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter()

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            name: contact?.name || '',
            email: contact?.email || '',
            phone: contact?.phone || ''
        }
    });

    useEffect(() => {
        if (contact) {
            reset({
                name: contact.name || '',
                email: contact.email || '',
                phone: contact.phone || ''
            });
        }
    }, [contact, isOpen, reset]);

    const openModal = () => setIsOpen(true)
    const closeModal = () => setIsOpen(false)

    const onSubmit = handleSubmit(async (data) => {
        setError('');
        setIsLoading(true);

        const formData = new FormData();
        formData.append('id', contact.id);
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('phone', data.phone);

        try {
            const response = await fetch('http://localhost:3000/api/contacts', {
                method: 'PUT',
                body: formData,
            })

            const result = await response.json()
            console.log(result)

            if (result.success) {
                reset()
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
    });

    return (
        <>
            <button
                type="button"
                onClick={openModal}
                className="text-white bg-amber-500 hover:bg-amber-600 focus:ring-4 focus:ring-amber-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center">
                <FaUserEdit size={20} className="mr-2" />
                Editar
            </button>

            {isOpen && (
                // <!-- Add User Modal -->
                <div className="fixed inset-0 bg-black/60 top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-full max-h-full"
                    id="add-user-modal">
                    <div className="relative w-full max-w-2xl px-4 h-full md:h-auto">
                        {/* <!-- Modal content --> */}
                        <div className="bg-white rounded-lg shadow relative">
                            {/* <!-- Modal header --> */}
                            <div className="flex items-start justify-between p-5 border-b rounded-t">
                                <h3 className="text-xl font-semibold">
                                    Editar contacto
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
                                <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 mt-3 ml-3 mr-3" role="alert">
                                    <p className="font-bold">Oops!!!</p>
                                    <p>{error}</p>
                                </div>
                            )}
                            {/* <!-- Modal body --> */}
                            <div className="p-6 space-y-6">
                                <form onSubmit={onSubmit}>
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6">
                                            <label htmlFor="name"
                                                className="text-sm font-medium text-gray-900 block mb-2">Nombre</label>
                                            <input type="text"
                                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                                placeholder="Bonnie"
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
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="email"
                                                className="text-sm font-medium text-gray-900 block mb-2">Correo</label>
                                            <input type="email"
                                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                                placeholder="example@mail.com"
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
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="phone"
                                                className="text-sm font-medium text-gray-900 block mb-2">Teléfono</label>
                                            <input type="text"
                                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                                placeholder="809-123-4567"
                                                {...register("phone", {
                                                    required: {
                                                        value: true,
                                                        message: "El teléfono es requerido"
                                                    }
                                                })} />
                                            {errors.phone && (
                                                <span className='text-red-500 text-xs'>
                                                    {String(errors.phone.message)}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className='mt-7'>
                                        <button type="submit" className="text-white bg-amber-500 hover:bg-amber-600 focus:ring-4 focus:ring-amber-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center">
                                            {isLoading ? (
                                                <span className='flex items-center justify-center gap-2'>
                                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Guardando cambios...
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-2">
                                                    <FaUserEdit size={18} />
                                                    Editar contacto
                                                </span>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
