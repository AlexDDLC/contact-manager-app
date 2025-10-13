'use client';

import React, { useState } from 'react';
import { IActionResponse } from '@/types/IActionResponse';
import { IContact } from '@/types/IContact';

// PrimeReact
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

// Icons (react-icons)
import { FaRegTrashCan } from 'react-icons/fa6';
import { FaExclamationTriangle } from 'react-icons/fa';

interface DeleteContactProps {
  contact: IContact;
  onContactDelete: (request: IActionResponse) => void;
}

export default function DeleteContact({ contact, onContactDelete }: DeleteContactProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    if (!isLoading) setIsOpen(false);
    setError('');
  };

  const handleDelete = async () => {
    setIsLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('id', contact.id);

    try {
      const response = await fetch('http://localhost:3000/api/contacts', {
        method: 'DELETE',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        const actionResult: IActionResponse = {
          success: true,
          summary: 'Buen trabajo!',
          detail: 'Contacto eliminado correctamente',
        };
        onContactDelete(actionResult);
        setIsOpen(false);
      } else {
        setError(String(result.error || 'No se pudo eliminar'));
      }
    } catch (err) {
      setError('Ocurrió un error inesperado');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Botón que abre el diálogo */}
      <Button
        type="button"
        onClick={openModal}
        label="Eliminar"
        icon={<FaRegTrashCan size={16} />}
        severity="danger"
        size="small"
        className="rounded-md px-3 ml-2 mr-2"
      />

      {/* Diálogo de confirmación */}
      <Dialog
        header="Confirmar eliminación"
        visible={isOpen}
        onHide={closeModal}
        modal
        draggable={false}
        breakpoints={{ '960px': '32rem', '641px': '90vw' }}
        className="max-w-md"
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
              label={isLoading ? 'Eliminando…' : 'Sí, eliminar'}
              severity="danger"
              size="small"
              className="rounded-md"
              onClick={handleDelete}
              loading={isLoading}
            />
          </div>
        }
      >
        <div className="flex items-start gap-3">
          <FaExclamationTriangle className="text-red-600 text-2xl mt-1" />
          <div className="text-sm">
            <p className="text-gray-800">
              ¿Estás seguro de que deseas eliminar a <b>{contact.name}</b> de contactos?
            </p>
            {error && <p className="text-red-600 mt-2">{error}</p>}
          </div>
        </div>
      </Dialog>
    </>
  );
}
