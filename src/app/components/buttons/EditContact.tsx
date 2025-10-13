'use client'

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { InputMask } from 'primereact/inputmask'
import { IActionResponse } from '@/types/IActionResponse'
import { IContact } from '@/types/IContact'

// PrimeReact
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'

// Icons
import { FaUserEdit } from 'react-icons/fa'
import { FaExclamationTriangle } from 'react-icons/fa'

interface EditContactProps {
  contact: IContact;
  onContactEdit: (response: IActionResponse) => void;
}

export default function EditContact({ contact, onContactEdit }: EditContactProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      name: contact?.name || '',
      email: contact?.email || '',
      phone: contact?.phone || '',
      company: contact?.company || '',
      address: contact?.address || '',
    }
  })

  useEffect(() => {
    if (contact) {
      reset({
        name: contact.name || '',
        email: contact.email || '',
        phone: contact.phone || '',
        company: contact.company || '',
        address: contact.address || '',
      })
    }
  }, [contact, isOpen, reset])

  const openModal = () => setIsOpen(true)
  const closeModal = () => {
    if (!isLoading) setIsOpen(false)
    setError('')
  }

  const onSubmit = handleSubmit(async (data) => {
    setError('')
    setIsLoading(true)

    const formData = new FormData()
    formData.append('id', contact.id)
    formData.append('name', data.name)
    formData.append('email', data.email)
    formData.append('phone', data.phone)
    formData.append('company', data.company || '')
    formData.append('address', data.address || '')

    try {
      const response = await fetch('http://localhost:3000/api/contacts', {
        method: 'PUT',
        body: formData,
      })
      const result = await response.json()

      if (result.success) {
        reset()
        closeModal()
        onContactEdit({
          success: true,
          summary: 'Buen trabajo!',
          detail: 'Contacto actualizado correctamente',
        })
      } else {
        setError(String(result.error || 'No se pudo actualizar'))
      }
    } catch {
      setError('Ocurrió un error inesperado')
    } finally {
      setIsLoading(false)
    }
  })

  return (
    <>
      {/* Botón abrir modal */}
      <Button
        type="button"
        onClick={openModal}
        label="Editar"
        icon={<FaUserEdit size={16} />}
        severity="warning"
        size="small"
        className="rounded-md px-3 ml-2 mr-2"
      />

      {/* Modal PrimeReact */}
      <Dialog
        header="Editar contacto"
        visible={isOpen}
        onHide={closeModal}
        modal
        draggable={false}
        breakpoints={{ '960px': '40vw', '641px': '90vw' }}
        className="max-w-xl"
        contentClassName="pt-2"
        footer={
          <div className="flex justify-end gap-2">
            <Button
              label="Cancelar"
              severity="secondary"
              outlined
              size="small"
              className="rounded-md"
              onClick={closeModal}
              disabled={isLoading}
            />
            <Button
              label={isLoading ? 'Guardando…' : 'Guardar cambios'}
              severity="warning"
              size="small"
              className="rounded-md"
              loading={isLoading}
              onClick={onSubmit}
            />
          </div>
        }
      >
        {/* Error */}
        {error && (
          <div className="flex items-start gap-2 mb-3 text-sm text-red-700">
            <FaExclamationTriangle className="mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={onSubmit} className="grid grid-cols-6 gap-4">
          {/* Nombre */}
          <div className="col-span-6">
            <label className="block text-sm mb-1">Nombre</label>
            <input
              type="text"
              placeholder="Bonnie"
              disabled={isLoading}
              className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5"
              {...register('name', { required: { value: true, message: 'El nombre es requerido' } })}
            />
            {errors.name && <span className="text-xs text-red-600">{String(errors.name.message)}</span>}
          </div>

          {/* Email */}
          <div className="col-span-6 sm:col-span-3">
            <label className="block text-sm mb-1">Correo</label>
            <input
              type="email"
              placeholder="example@mail.com"
              className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5"
              {...register('email', { required: { value: true, message: 'El correo es requerido' } })}
            />
            {errors.email && <span className="text-xs text-red-600">{String(errors.email.message)}</span>}
          </div>

          {/* Teléfono */}
          <div className="col-span-6 sm:col-span-3">
            <label className="block text-sm mb-1">Teléfono</label>
            <InputMask
              className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5"
              placeholder="(809) 123-4567"
              mask="(999) 999-9999"
              {...register('phone', { required: { value: true, message: 'El teléfono es requerido' } })}
            />
            {errors.phone && <span className="text-xs text-red-600">{String(errors.phone.message)}</span>}
          </div>

          {/* Empresa */}
          <div className="col-span-6 sm:col-span-3">
            <label className="block text-sm mb-1">Empresa</label>
            <input
              type="text"
              placeholder="Nombre de empresa"
              className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5"
              {...register('company')}
            />
          </div>

          {/* Dirección */}
          <div className="col-span-6 sm:col-span-3">
            <label className="block text-sm mb-1">Dirección</label>
            <input
              type="text"
              placeholder="Calle, ciudad…"
              className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5"
              {...register('address')}
            />
          </div>
        </form>
      </Dialog>
    </>
  )
}
