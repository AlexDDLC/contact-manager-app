// app/api/contacts/route.ts
import { prisma } from '@/libs/prisma';
import { NextResponse } from 'next/server';

// GET: Obtener todos los contactos
export async function GET() {
  const contacts = await prisma.contact.findMany();
  return NextResponse.json(contacts);
}

// POST: Crear un nuevo contacto
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const newContact = await prisma.contact.create({ data });
    return NextResponse.json(newContact, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error al crear el contacto' }, { status: 500 });
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