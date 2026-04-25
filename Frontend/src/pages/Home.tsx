import { Navbar } from '../components/navbar';
import { Hero } from '../components/hero';
import { Features } from '../components/features';
import { Integrations } from '../components/integrations';
import { SocialProof } from '../components/social-proof';
import { Footer } from '../components/footer';

export default function Home() {
  return (
    <main className="bg-background-main min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Integrations />
      <SocialProof />
      <Footer />
    </main>
  );
}
