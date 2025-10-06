'use server'

// app/api/contacts/route.ts
import { PrismaClient } from '@/generated/prisma';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient()

// GET: Obtener todos los contactos
export async function GET_Contacts() {
  const contacts = await prisma.contact.findMany({
    orderBy:{
      name:'asc'
    }
  });

  return contacts;
}

// POST: Crear un nuevo contacto
export async function POST_Contact(formData: FormData) {
  try {

    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
    }

    const emailExist = await prisma.contact.findUnique({
      where: {
        email: data.email
      }
    })

    if (emailExist) return { success: false, error: 'Ya existe un contacto con este correo' }

    const newContact = await prisma.contact.create({ data });

    return { success: true, data: newContact }
  } catch (error) {
    console.log(error)
    return { success: false, error: 'Error al crear contacto' }
  }
}

// PUT: Actualizar un contacto
export async function PUT_Contact(formData: FormData) {
  try {
    const id = parseInt(formData.get('id') as string);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
    };

    const existingContact = await prisma.contact.findUnique({
      where: { id },
    });

    if (!existingContact) return { success: false, error: 'El contacto no existe' }

    const emailExist = await prisma.contact.findFirst({
      where: {
        email: data.email,
        NOT: { id },
      },
    });

    if (emailExist) return { success: false, error: 'Ya existe un contacto con este correo' }

    const updatedContact = await prisma.contact.update({
      where: { id },
      data,
    });

    return { success: true, data: updatedContact };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Error al actualizar contacto' };
  }
}

// DELETE: Eliminar un contacto
export async function DELETE_Contact(formData: FormData) {
  try {
    const id = formData.get('id') as string

    if (!id) {
      return { success: false, error: 'El ID del contacto es requerido' }
    }

    const existing = await prisma.contact.findUnique({
      where: { id: parseInt(id) }
    })

    if (!existing) {
      return { success: false, error: 'El contacto no existe' }
    }

    await prisma.contact.delete({
      where: { id: parseInt(id) },
    })

    return { success: true, message: 'Contacto eliminado correctamente' }
  } catch (error) {
    console.error('Error al eliminar contacto:', error)
    return { success: false, error: 'Error al eliminar contacto' }
  }
}