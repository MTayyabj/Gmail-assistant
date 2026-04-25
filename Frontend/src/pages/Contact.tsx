import { Navbar } from '../components/navbar';
import { Contacts } from '../components/contacts';
import { Footer } from '../components/footer';

export const metadata = {
  title: 'MailFlow AI - Contact Management',
  description: 'Manage your professional contacts and network with MailFlow AI.',
};

export default function ContactsPage() {
  return (
    <main className="bg-background-main min-h-screen">
      <Navbar />
      <Contacts />
      <Footer />
    </main>
  );
}
