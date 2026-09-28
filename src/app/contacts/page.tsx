import type { Metadata } from 'next';
import { texts } from '@/src/shared/config/texts';
import ContactsView from './ContactsView';

export const metadata: Metadata = {
	title: texts.contacts.title,
	description: texts.contacts.description,
};

// settings и socials (email, телефон, соцсети) уже предзагружены в layout.tsx
export default function ContactsPage() {
	return <ContactsView />;
}
