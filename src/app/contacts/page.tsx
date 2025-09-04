'use client';

import { useState } from 'react';
import ContactsList from '@/components/ContactsList';
import AddContactForm from '@/components/AddContactForm';

export default function ContactsPage() {
  const [listVersion, setListVersion] = useState(0);

  const handleListChange = () => {
    setListVersion(prevVersion => prevVersion + 1);
  };

  return (
    <main className="container mx-auto p-4 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Column: Add Contact Form */}
        <div className="md:col-span-1">
          <AddContactForm onContactAdded={handleListChange} />
        </div>

        {/* Right Column: Contacts List */}
        <div className="md:col-span-2">
          <ContactsList onListChange={handleListChange} />
        </div>
        
      </div>
    </main>
  );
}