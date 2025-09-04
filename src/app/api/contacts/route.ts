import { NextResponse } from 'next/server';
import { db } from '@/drizzle/db';
import { contacts } from '@/drizzle/schema';

// This function handles GET requests to fetch all contacts
export async function GET() {
  try {
    const allContacts = await db.select().from(contacts);
    return NextResponse.json(allContacts, { status: 200 });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
}

// This function handles POST requests to create a new contact
export async function POST(request: Request) {
  try {
    const { name, email, phone } = await request.json();

    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    const newContact = await db
      .insert(contacts)
      .values({ name, email, phone })
      .returning();

    return NextResponse.json(newContact[0], { status: 201 });

  } catch (error) {
    console.error('Error creating contact:', error);
    return NextResponse.json(
      { error: 'Failed to create contact' },
      { status: 500 }
    );
  }
}