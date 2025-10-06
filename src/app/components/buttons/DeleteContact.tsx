'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { DELETE_Contact } from '@/app/api/auth/contacts/route'
import { FaRegTrashCan } from 'react-icons/fa6'

export default function DeleteContact({ contact }: { contact: any }) {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()

    const handleDelete = async () => {
        const confirmed = confirm(`¿Seguro que deseas eliminar el contacto "${contact.name}"?`)
        if (!confirmed) return

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
            <button
                type="button"
                disabled={isLoading}
                onClick={handleDelete}
                className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center"
            >
                {isLoading ? (
                    <span className="flex items-center gap-2">
                        <svg
                            className="animate-spin h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            ></path>
                        </svg>
                        Eliminando...
                    </span>
                ) : (
                    <>
                        <FaRegTrashCan size={18} className="mr-2" />
                        Eliminar
                    </>
                )}
            </button>

            {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
        </>
    )
}
