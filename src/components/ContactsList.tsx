'use client';

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';

interface Contact {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
}

export default function ContactsList({ onListChange }: { onListChange: () => void }) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);

  useEffect(() => {
    async function fetchContacts() {
      try {
        const response = await fetch('/api/contacts');
        const data = await response.json();
        if (Array.isArray(data)) {
          setContacts(data);
        } else {
          setContacts([]);
        }
      } catch (error) {
        console.error("Failed to fetch contacts:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchContacts();
  }, [onListChange]);

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this contact?')) {
      await fetch(`/api/contacts/${id}`, { method: 'DELETE' });
      onListChange();
    }
  };
  
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingContact) return;

    await fetch(`/api/contacts/${editingContact.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingContact),
    });
    setEditingContact(null);
    onListChange();
  };

  if (loading) return <p>Loading contacts...</p>;
  
  if (editingContact) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Edit Contact</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdate}>
            <div className="space-y-4">
              <Input type="text" value={editingContact.name} onChange={e => setEditingContact({...editingContact, name: e.target.value})} />
              <Input type="email" value={editingContact.email || ''} onChange={e => setEditingContact({...editingContact, email: e.target.value})} />
              <Input type="text" value={editingContact.phone || ''} onChange={e => setEditingContact({...editingContact, phone: e.target.value})} />
            </div>
            <div className="mt-4 flex space-x-2">
              <Button type="submit">Save Changes</Button>
              <Button variant="ghost" onClick={() => setEditingContact(null)}>Cancel</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contacts</CardTitle>
        <CardDescription>A list of all contacts in your CRM.</CardDescription>
      </CardHeader>
      <CardContent>
        {contacts.length === 0 ? (
          <p>No contacts found.</p>
        ) : (
          <ul className="space-y-4">
            {contacts.map((contact) => (
              <li key={contact.id} className="flex items-center justify-between border p-4 rounded-lg">
                <div>
                  <p className="font-semibold">{contact.name}</p>
                  <p className="text-sm text-muted-foreground">{contact.email}</p>
                </div>
                <div className="space-x-2">
                  <Button size="sm" variant="outline" onClick={() => setEditingContact(contact)}>Edit</Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(contact.id)}>Delete</Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}