'use client';

import React, { useEffect, useState, useRef } from 'react';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode, FilterOperator, addLocale } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Toast } from 'primereact/toast';

import EditContact from './buttons/EditContact';
import DeleteContact from './buttons/DeleteContact';
import AddContact from './buttons/AddContact';
import { IActionResponse } from '@/types/IActionResponse';

// 🔔 react-icons (en vez de primeicons)
import { FiSearch, FiFilter } from 'react-icons/fi';

addLocale('en', {
  matchAll: 'Coincidir con todos',
  matchAny: 'Coincidir con cualquiera',
  addRule: 'Añadir regla',
  startsWith: 'Empieza con',
  contains: 'Contiene',
  notContains: 'No contiene',
  endsWith: 'Termina en',
  equals: 'Igual a',
  notEquals: 'No es igual a',
  apply: 'Aplicar',
  clear: 'Limpiar',
  removeRule: 'Remover regla'
});

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

const defaultFilters: DataTableFilterMeta = {
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
  email: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
  phone: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
};

export default function ContactList() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filters, setFilters] = useState<DataTableFilterMeta>(defaultFilters);
  const [globalFilterValue, setGlobalFilterValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useRef<Toast>(null);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const resp = await fetch('http://localhost:3000/api/contacts', {
        method: 'GET',
        cache: 'no-store',
      });
      if (!resp.ok) throw new Error('Error cargando los contactos');
      const data: Contact[] = await resp.json();
      setContacts(data);
    } catch (err) {
      console.error('Error al cargar contactos:', err);
    } finally {
      setLoading(false);
    }
  };

  const onActionComplete = (response: IActionResponse) => {
    const severity = response.success ? 'success' : 'error';
    toast.current?.show({
      severity,
      summary: response.summary,
      detail: response.detail,
      life: response.life,
    });
    if (response.success) fetchContacts();
  };

    useEffect(() => {
    setLoading(true);
    fetchContacts().finally(() => {
        setTimeout(() => setLoading(false), 100); // pequeño delay
    });
    }, []);

  const initFilters = () => {
    setFilters(defaultFilters);
    setGlobalFilterValue('');
  };

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const newFilters = { ...filters };
    // @ts-ignore
    newFilters.global.value = value;
    setFilters(newFilters);
    setGlobalFilterValue(value);
  };

  // ⛏️ Avatar + metadata
  const nameBodyTemplate = (row: Contact) => (
    <div className="flex items-center gap-3">
      <img
        src="/user.png"
        alt={`${row.name} avatar`}
        width={36}
        height={36}
        className="rounded-full"
      />
      <div className="leading-tight">
        <div className="font-semibold text-gray-900">{row.name}</div>
        <div className="text-xs text-gray-500">
          Última actualización {new Date(row.updatedAt).toLocaleString('es-DO')}
        </div>
      </div>
    </div>
  );

  const dateBodyTemplate = (row: Contact) =>
    new Date(row.createdAt).toLocaleString('es-DO');

  const actionBodyTemplate = (row: Contact) => (
    <div className="flex items-center gap-2">
      <EditContact contact={row} onContactEdit={onActionComplete} />
      <DeleteContact contact={row} onContactDelete={onActionComplete} />
    </div>
  );

  // 🔎 Header de la tabla: botón limpiar + búsqueda con icono (react-icons)
  const header = (
    <div className="flex items-center justify-between gap-3">
      <Button
        type="button"
        label="Limpiar"
        outlined
        icon={<FiFilter size={16} />}
        onClick={initFilters}
        className="rounded-md"
      />

      <div className="relative w-full max-w-xs">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <InputText
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          placeholder="Buscar…"
          className="w-full pl-9 pr-3 py-2 rounded-md"
        />
      </div>
    </div>
  );

  // ➕ Botón “Agregar contacto” en la toolbar (lado derecho)
  const rightToolbarTemplate = () => <AddContact onContactAdded={onActionComplete} />;

  return (
    <section className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 md:p-5 my-4">
      <Toast ref={toast} />

      <Toolbar className="mb-4 !border-0 !p-0 bg-transparent" right={rightToolbarTemplate} />

      <DataTable
        value={contacts}
        paginator
        rows={10}
        dataKey="id"
        filters={filters}
        globalFilterFields={['name', 'email', 'phone']}
        header={header}
        loading={loading}
        emptyMessage="No se encontraron contactos."
        onFilter={(e) => setFilters(e.filters)}
        stripedRows
        showGridlines={false}
        rowHover
        className="rounded-xl overflow-hidden"
        tableClassName="text-sm"
      >
        <Column
          field="name"
          header="Nombre"
          body={nameBodyTemplate}
          headerClassName="bg-gray-50 text-gray-700 text-xs font-semibold uppercase tracking-wide"
        />
        <Column
          field="phone"
          header="Teléfono"
          filter
          filterPlaceholder="Buscar por teléfono"
          headerClassName="bg-gray-50 text-gray-700 text-xs font-semibold uppercase tracking-wide"
        />
        <Column
          field="createdAt"
          header="Creado en"
          body={dateBodyTemplate}
          headerClassName="bg-gray-50 text-gray-700 text-xs font-semibold uppercase tracking-wide"
        />
        <Column
          field="email"
          header="Correo"
          filter
          filterPlaceholder="Buscar por correo"
          headerClassName="bg-gray-50 text-gray-700 text-xs font-semibold uppercase tracking-wide"
        />
        <Column
          header="Acciones"
          body={actionBodyTemplate}
          headerClassName="bg-gray-50 text-gray-700 text-xs font-semibold uppercase tracking-wide"
          style={{ minWidth: 150 }}
        />
      </DataTable>
    </section>
  );
}
