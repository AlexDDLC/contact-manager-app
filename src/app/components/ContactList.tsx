"use client";

import React, { useEffect, useState, useRef } from 'react';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import EditContact from './buttons/EditContact';
import DeleteContact from './buttons/DeleteContact';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { addLocale } from 'primereact/api';
import AddContact from './buttons/AddContact';
import { Toolbar } from 'primereact/toolbar';
import { Toast } from 'primereact/toast';
import { IActionResponse } from '@/types/IActionResponse';

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
})

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
        constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        ],
    },
    email: {
        operator: FilterOperator.AND,
        constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        ],
    },
    phone: {
        operator: FilterOperator.AND,
        constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        ],
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
            if (!resp.ok) {
                throw new Error('Error cargando los contactos');
            }
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
            severity: severity,
            summary: response.summary,
            detail: response.detail,
            life: response.life
        });

        if (response.success) {
            fetchContacts();
        }
    };

    useEffect(() => {
    setLoading(true);
    fetchContacts().finally(() => {
        setTimeout(() => setLoading(false), 100); // pequeño delay
    });
    }, []);

    const initFilters = () => {
        setFilters(
            {
                global: { value: null, matchMode: FilterMatchMode.CONTAINS },
                name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
                email: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
                phone: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            });
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

    const renderHeader = () => {
        return (
            <div className="flex justify-between items-center">
                <Button
                    type="button"
                    icon="pi pi-filter-slash"
                    label="Limpiar"
                    outlined
                    onClick={initFilters}
                />
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText
                        value={globalFilterValue}
                        onChange={onGlobalFilterChange}
                        placeholder="Buscar..."
                        className="p-inputtext p-component"
                    />
                </span>
            </div>
        );
    };

    const nameBodyTemplate = (row: Contact) => {
        return (
            <div className="flex items-center space-x-2">
                <img
                    src="/user.png"
                    alt={`${row.name} avatar`}
                    width={32}
                    height={32}
                    className="rounded-full"
                />
                <div>
                    <div className="font-semibold">{row.name}</div>
                    <div className="text-sm text-gray-500">
                        Última actualización{' '}
                        {new Date(row.updatedAt).toLocaleString('es-DO')}
                    </div>
                </div>
            </div>
        );
    };

    const dateBodyTemplate = (row: Contact) => {
        return new Date(row.createdAt).toLocaleString('es-DO');
    };

    const actionBodyTemplate = (row: Contact) => {
        return (
            <>
                <EditContact contact={row} onContactEdit={onActionComplete} />
                <DeleteContact contact={row} onContactDelete={onActionComplete} />
            </>
        );
    };

    const header = renderHeader();

    const rightToolbarTemplate = () => {
        return <AddContact onContactAdded={onActionComplete} />
    };

    return (
        <div className="cardTable">
            <Toast ref={toast} /> 

            <Toolbar className="mb-4" right={rightToolbarTemplate}></Toolbar>

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
                onFilter={(e) => setFilters(e.filters)}>

                <Column
                    field="name"
                    header="Nombre"
                    body={nameBodyTemplate}
                    filter
                    filterPlaceholder="Buscar por nombre"
                />
                <Column field="phone"
                    header="Teléfono"
                    filter
                    filterPlaceholder='Buscar por teléfono'
                />
                <Column
                    field="createdAt"
                    header="Creado en"
                    body={dateBodyTemplate}
                />
                <Column
                    field="email"
                    header="Correo"
                    filter
                    filterPlaceholder="Buscar por correo"
                />
                <Column header="Acciones" body={actionBodyTemplate} />
            </DataTable>
        </div>
    );
}
