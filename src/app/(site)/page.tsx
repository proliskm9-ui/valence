import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Cases from '@/components/sections/Cases';
import Process from '@/components/sections/Process';
import Stats from '@/components/sections/Stats';
import ContactForm from '@/components/sections/ContactForm';
import Footer from '@/components/layout/Footer';
import { LandingTracker } from '@/components/layout/LandingTracker';

export default function Home() {
  return (
    <>
      <LandingTracker />
      <Hero />
      <Services />
      <Cases />
      <Process />
      <Stats />
      <ContactForm />
      <Footer />
    </>
  );
}
