import { pgTable, serial, text, timestamp, integer, numeric } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  fullName: text('full_name'),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const companies = pgTable('companies', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  website: text('website'),
  ownerId: integer('owner_id').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const contacts = pgTable('contacts', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email'),
  phone: text('phone'),
  companyId: integer('company_id').references(() => companies.id),
  ownerId: integer('owner_id').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const deals = pgTable('deals', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  value: numeric('value', { precision: 12, scale: 2 }).default('0').notNull(),
  status: text('status').default('lead').notNull(),
  contactId: integer('contact_id').references(() => contacts.id),
  ownerId: integer('owner_id').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});