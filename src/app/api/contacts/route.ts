import { PrismaClient } from '@/generated/prisma'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

// GET: Obtener todos los contactos
export async function GET() {
  const contacts = await prisma.contact.findMany({
    orderBy: { name: 'asc' },
  })

  return NextResponse.json(contacts)
}

// POST: Crear un nuevo contacto
export async function POST(request: Request) {
  try {
    const formData = await request.formData()

    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
    }

    const emailExist = await prisma.contact.findUnique({
      where: { email: data.email },
    })

    if (emailExist)
      return NextResponse.json({ success: false, error: 'Ya existe un contacto con este correo' })

    const newContact = await prisma.contact.create({ data })
    return NextResponse.json({ success: true, data: newContact })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false, error: 'Error al crear contacto' })
  }
}

// PUT: Actualizar un contacto
export async function PUT(request: Request) {
  try {
    const formData = await request.formData()
    const id = parseInt(formData.get('id') as string)
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
    }

    const existing = await prisma.contact.findUnique({ where: { id } })
    if (!existing)
      return NextResponse.json({ success: false, error: 'El contacto no existe' })

    const emailExist = await prisma.contact.findFirst({
      where: { email: data.email, NOT: { id } },
    })
    if (emailExist)
      return NextResponse.json({ success: false, error: 'Ya existe un contacto con este correo' })

    const updated = await prisma.contact.update({ where: { id }, data })
    return NextResponse.json({ success: true, data: updated })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false, error: 'Error al actualizar contacto' })
  }
}

// DELETE: Eliminar un contacto
export async function DELETE(request: Request) {
  try {
    const formData = await request.formData()
    const id = formData.get('id') as string

    if (!id)
      return NextResponse.json({ success: false, error: 'El ID del contacto es requerido' })

    const existing = await prisma.contact.findUnique({ where: { id: parseInt(id) } })
    if (!existing)
      return NextResponse.json({ success: false, error: 'El contacto no existe' })

    await prisma.contact.delete({ where: { id: parseInt(id) } })
    return NextResponse.json({ success: true, message: 'Contacto eliminado correctamente' })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false, error: 'Error al eliminar contacto' })
  }
}
