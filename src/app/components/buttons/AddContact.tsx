'use client'

import React, { useState } from 'react'
import { IoMdPersonAdd } from 'react-icons/io'
import { useForm } from 'react-hook-form'
import { IActionResponse } from '@/types/IActionResponse';
import { InputMask } from "primereact/inputmask";

interface AddContactProps {
    onContactAdded: (response: IActionResponse) => void;
}

export default function AddContact({ onContactAdded }: AddContactProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const openModal = () => setIsOpen(true)
    const closeModal = () => setIsOpen(false)

    let actionResponse: IActionResponse = {
        success: false,
        summary: "",
        detail: ""
    }

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = handleSubmit(async (data) => {
        setError('');
        setIsLoading(true);

        const formData = new FormData()
        formData.append('name', data.name)
        formData.append('email', data.email)
        formData.append('phone', data.phone)
        formData.append('company', data.company || '')
        formData.append('address', data.address || '')

        try {
            const response = await fetch('http://localhost:3000/api/contacts', {
                method: 'POST',
                body: formData,
            })

            const result = await response.json()

            if (result.success) {
                reset()
                closeModal()

                actionResponse = {
                    success: true,
                    summary: "Buen trabajo!",
                    detail: "Contacto guardado correctamente",
                }

                onContactAdded(actionResponse)
            } else {
                setError(result.error as string)
            }
        } catch (err) {
            setError('Ocurrió un error inesperado')
        } finally {
            setIsLoading(false)
        }
    })

    return (
        <>
            {/* Botón para abrir modal */}
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
                <div className="fixed inset-0 bg-black/60 top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-full max-h-full">
                    <div className="relative w-full max-w-2xl px-4 h-full md:h-auto">
                        <div className="bg-white rounded-lg shadow relative">
                            {/* Header */}
                            <div className="flex items-start justify-between p-5 border-b rounded-t">
                                <h3 className="text-xl font-semibold">
                                    Crear nuevo contacto
                                </h3>
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center">
                                    <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Cerrar modal</span>
                                </button>
                            </div>

                            {/* Error */}
                            {error && (
                                <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 mt-3 mx-3" role="alert">
                                    <p className="font-bold">Oops!!!</p>
                                    <p>{error}</p>
                                </div>
                            )}

                            {/* Body */}
                            <div className="p-6 space-y-6">
                                <form onSubmit={onSubmit}>
                                    <div className="grid grid-cols-6 gap-6">
                                        {/* Nombre */}
                                        <div className="col-span-6">
                                            <label className="text-sm font-medium block mb-2">Nombre</label>
                                            <input
                                                type="text"
                                                placeholder="Bonnie"
                                                disabled={isLoading}
                                                className="shadow-sm bg-gray-50 border border-gray-300 rounded-lg block w-full p-2.5"
                                                {...register("name", { required: { value: true, message: "El nombre es requerido" } })}
                                            />
                                            {errors.name && <span className='text-red-500 text-xs'>{String(errors.name.message)}</span>}
                                        </div>

                                        {/* Correo */}
                                        <div className="col-span-6 sm:col-span-3">
                                            <label className="text-sm font-medium block mb-2">Correo</label>
                                            <input
                                                type="email"
                                                placeholder="example@mail.com"
                                                className="shadow-sm bg-gray-50 border border-gray-300 rounded-lg block w-full p-2.5"
                                                {...register("email", { required: { value: true, message: "El correo es requerido" } })}
                                            />
                                            {errors.email && <span className='text-red-500 text-xs'>{String(errors.email.message)}</span>}
                                        </div>

                                        {/* Teléfono */}
                                        <div className="col-span-6 sm:col-span-3">
                                            <label className="text-sm font-medium block mb-2">Teléfono</label>
                                            <InputMask
                                                className="shadow-sm bg-gray-50 border border-gray-300 rounded-lg block w-full p-2.5"
                                                placeholder="(809) 123-4567"
                                                mask="(999) 999-9999"
                                                {...register("phone", { required: { value: true, message: "El teléfono es requerido" } })}
                                            />
                                            {errors.phone && <span className='text-red-500 text-xs'>{String(errors.phone.message)}</span>}
                                        </div>

                                        {/* Empresa */}
                                        <div className="col-span-6 sm:col-span-3">
                                            <label className="text-sm font-medium block mb-2">Empresa</label>
                                            <input
                                                type="text"
                                                placeholder="Nombre de empresa"
                                                className="shadow-sm bg-gray-50 border border-gray-300 rounded-lg block w-full p-2.5"
                                                {...register("company")}
                                            />
                                        </div>

                                        {/* Dirección */}
                                        <div className="col-span-6 sm:col-span-3">
                                            <label className="text-sm font-medium block mb-2">Dirección</label>
                                            <input
                                                type="text"
                                                placeholder="Calle, ciudad..."
                                                className="shadow-sm bg-gray-50 border border-gray-300 rounded-lg block w-full p-2.5"
                                                {...register("address")}
                                            />
                                        </div>

                                        {/* Comments */}
                                        <div className="col-span-12 sm:col-span-6">
                                            <label className="text-sm font-medium block mb-2">Comentarios</label>
                                            <textarea
                                                placeholder="Especifique cualquier comentario adicional"
                                                className="shadow-sm bg-gray-50 border border-gray-300 rounded-lg block w-full p-2.5"
                                                {...register("comments")}
                                            />
                                        </div>

                                    </div>

                                    {/* Botón guardar */}
                                    <div className='mt-7'>
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                            {isLoading ? (
                                                <span className='flex items-center gap-2'>
                                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Agregando contacto...
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-2">
                                                    <IoMdPersonAdd size={18} />
                                                    Agregar contacto
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
