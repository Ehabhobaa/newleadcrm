import { NextResponse } from 'next/server';
import { db } from '@/drizzle/db';
import { contacts } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';

// Function to handle PUT requests (Update a contact)
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const { name, email, phone } = await request.json();

    const updatedContact = await db
      .update(contacts)
      .set({ name, email, phone })
      .where(eq(contacts.id, id))
      .returning();

    return NextResponse.json(updatedContact[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update contact' }, { status: 500 });
  }
}

// Function to handle DELETE requests (Delete a contact)
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    await db.delete(contacts).where(eq(contacts.id, id));
    return NextResponse.json({ message: 'Contact deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete contact' }, { status: 500 });
  }
}