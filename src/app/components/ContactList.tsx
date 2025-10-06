import React from 'react'
import Image from 'next/image'
import { GET_Contacts } from '../api/auth/contacts/route'
import EditContact from './buttons/EditContact'
import DeleteContact from './buttons/DeleteContact'

export default async function ContactList() {

    const contacts = await GET_Contacts()

    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto">
                <div className="align-middle inline-block min-w-full">
                    <div className="shadow overflow-hidden">
                        <table className="table-fixed min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th scope="col"
                                        className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                                        Nombre
                                    </th>
                                    <th scope="col"
                                        className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                                        Teléfono
                                    </th>
                                    <th scope="col"
                                        className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                                        Creado en
                                    </th>
                                    <th scope="col"
                                        className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                                        Correo
                                    </th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">

                                {contacts && contacts.map((contact) => (
                                    <tr key={contact.id} className="hover:bg-gray-100">
                                        <td className="p-4 flex items-center whitespace-nowrap space-x-6 mr-12 lg:mr-0">
                                            <Image className="h-10 w-10 rounded-full" width={20} height={20}
                                                src="/user.png"
                                                alt={`${contact.name} avatar`} />
                                            <div className="text-sm font-normal text-gray-500">

                                                <div className="text-base font-semibold text-gray-900">
                                                    {contact.name}
                                                </div>
                                                <div className="text-sm font-normal text-gray-500">
                                                    Última actualización { }
                                                    {new Date(contact.updatedAt).toLocaleString()}
                                                </div>

                                            </div>
                                        </td>

                                        <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                                            {contact.phone}
                                        </td>

                                        <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                                            {new Date(contact.createdAt).toLocaleString()}
                                        </td>

                                        <td className="p-4 whitespace-nowrap text-base font-normal text-gray-900">
                                            {contact.email}
                                        </td>

                                        <td className="whitespace-nowrap space-x-2">
                                            <EditContact contact={contact} />

                                            <DeleteContact />
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
