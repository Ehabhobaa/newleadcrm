'use client';

import { useState } from 'react';
import ContactsList from '@/components/ContactsList';
import AddContactForm from '@/components/AddContactForm';

export default function ContactsPage() {
  // This state is used to trigger a re-fetch in the child components
  const [listVersion, setListVersion] = useState(0);

  const handleListChange = () => {
    setListVersion(prevVersion => prevVersion + 1);
  };

  return (
    <main className="container mx-auto p-8">
      <AddContactForm onContactAdded={handleListChange} />
      <ContactsList onListChange={handleListChange} />
    </main>
  );
}