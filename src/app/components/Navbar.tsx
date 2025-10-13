'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { signOut } from 'next-auth/react';

// ✅ PrimeReact
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

// ✅ React Icons
import { FaSignOutAlt, FaExclamationTriangle } from 'react-icons/fa';

export default function Navbar() {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      await signOut();
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-30 bg-white/80 backdrop-blur border-b border-gray-200 shadow-sm">
      <div className="px-4 lg:px-6">
        <div className="h-14 flex items-center justify-between">
          {/* Logo + nombre */}
          <div className="flex items-center gap-2">
            <Image
              src="/contacts-book.png"
              alt="Logo"
              width={36}
              height={36}
              className="rounded-md"
              priority
            />
            <span className="text-lg font-semibold tracking-tight text-gray-900">
              Contact Manager
            </span>
          </div>

          {/* Botón cerrar sesión */}
          <div className="flex items-center">
            <Button
              label="Cerrar sesión"
              icon={<FaSignOutAlt size={16} />}
              severity="danger"
              size="small"
              className="rounded-md px-3"
              onClick={openModal}
              aria-label="Cerrar sesión"
            />
          </div>
        </div>
      </div>

      {/* Modal de confirmación */}
      <Dialog
        header="Confirmar cierre de sesión"
        visible={isOpen}
        onHide={closeModal}
        modal
        draggable={false}
        breakpoints={{ '960px': '40vw', '641px': '90vw' }}
        className="max-w-md"
        contentClassName="pt-1"
        footer={
          <div className="flex justify-end gap-2">
            <Button
              label="Cancelar"
              severity="secondary"
              outlined
              size="small"
              className="rounded-md"
              onClick={closeModal}
            />
            <Button
              label={isLoading ? 'Cerrando…' : 'Sí, cerrar sesión'}
              icon={<FaSignOutAlt size={16} />}
              severity="danger"
              size="small"
              className="rounded-md"
              loading={isLoading}
              onClick={handleSignOut}
            />
          </div>
        }
      >
        <div className="flex items-start gap-3">
          <FaExclamationTriangle className="text-red-600 text-2xl mt-1" />
          <p className="text-sm text-gray-700">
            ¿Estás seguro de que deseas cerrar la sesión?
          </p>
        </div>
      </Dialog>
    </nav>
  );
}
