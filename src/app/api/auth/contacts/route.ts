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
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json();
    const updatedContact = await prisma.contact.update({
      where: { id: parseInt(params.id) },
      data,
    });
    return NextResponse.json(updatedContact);
  } catch (error) {
    return NextResponse.json({ message: 'Error al actualizar' }, { status: 500 });
  }
}

// DELETE: Eliminar un contacto
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.contact.delete({
      where: { id: parseInt(params.id) },
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: 'Error al eliminar' }, { status: 500 });
  }
}