import { Navbar } from '../components/navbar';
import { Profile } from '../components/profile';
import { Footer } from '../components/footer';

export const metadata = {
  title: 'MailFlow AI - Profile Settings',
  description: 'Manage your account, authorizations, and integrations.',
};

export default function ProfilePage() {
  return (
    <main className="bg-background-main min-h-screen">
      <Navbar />
      <Profile />
      <Footer />
    </main>
  );
}
