import React from 'react'
import Image from 'next/image'
import { FaEdit } from 'react-icons/fa'
import { FaRegTrashCan } from 'react-icons/fa6'

export default function ContactList() {
    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto">
                <div className="align-middle inline-block min-w-full">
                    <div className="shadow overflow-hidden">
                        <table className="table-fixed min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th scope="col" className="p-4">
                                        <div className="flex items-center">
                                            <input id="checkbox-all" aria-describedby="checkbox-1" type="checkbox"
                                                className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded" />
                                            <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                                        </div>
                                    </th>
                                    <th scope="col"
                                        className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                                        Name
                                    </th>
                                    <th scope="col"
                                        className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                                        Position
                                    </th>
                                    <th scope="col"
                                        className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                                        Country
                                    </th>
                                    <th scope="col"
                                        className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                                        Status
                                    </th>
                                    <th scope="col" className="p-4">
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">

                                <tr className="hover:bg-gray-100">
                                    <td className="p-4 w-4">
                                        <div className="flex items-center">
                                            <input id="checkbox-1" aria-describedby="checkbox-1" type="checkbox"
                                                className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded" />
                                            <label htmlFor="checkbox-1" className="sr-only">checkbox</label>
                                        </div>
                                    </td>
                                    <td className="p-4 flex items-center whitespace-nowrap space-x-6 mr-12 lg:mr-0">
                                        <Image className="h-10 w-10 rounded-full" width={20} height={20}
                                            src="/user.png"
                                            alt="Neil Sims avatar" />
                                        <div className="text-sm font-normal text-gray-500">
                                            <div className="text-base font-semibold text-gray-900">Neil Sims</div>
                                            <div className="text-sm font-normal text-gray-500">
                                                neil.sims@windster.com</div>
                                        </div>
                                    </td>
                                    <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                                        Front-end developer</td>
                                    <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">United
                                        States</td>
                                    <td className="p-4 whitespace-nowrap text-base font-normal text-gray-900">
                                        <div className="flex items-center">
                                            <div className="h-2.5 w-2.5 rounded-full bg-green-400 mr-2"></div>
                                            Active
                                        </div>
                                    </td>
                                    <td className="p-4 whitespace-nowrap space-x-2">
                                        <button type="button" data-modal-toggle="user-modal"
                                            className="text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center">
                                            <div className="mr-2 h-5 w-5">
                                                <FaEdit size={20}/>
                                            </div>
                                            Editar
                                        </button>
                                        <button type="button" data-modal-toggle="delete-user-modal"
                                            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center">
                                            <div className="mr-2 h-5 w-5">
                                                <FaRegTrashCan size={20}/>
                                            </div>
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
