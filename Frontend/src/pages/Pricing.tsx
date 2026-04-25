import { Navbar } from '../components/navbar';
import { Pricing } from '../components/pricing';
import { Footer } from '../components/footer';

export const metadata = {
  title: 'MailFlow AI - Pricing Plans',
  description: 'Choose the perfect plan for your team. Flexible pricing with no long-term contracts.',
};

export default function PricingPage() {
  return (
    <main className="bg-background-main min-h-screen">
      <Navbar />
      <Pricing />
      <Footer />
    </main>
  );
}
