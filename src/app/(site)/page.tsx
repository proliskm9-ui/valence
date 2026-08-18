import Hero from '@/components/sections/Hero';
import Marquee from '@/components/sections/Marquee';
import Services from '@/components/sections/Services';
import Cases from '@/components/sections/Cases';
import Process from '@/components/sections/Process';
import Stats from '@/components/sections/Stats';
import CTA from '@/components/sections/CTA';
import ContactForm from '@/components/sections/ContactForm';
import Footer from '@/components/layout/Footer';
import { LandingTracker } from '@/components/layout/LandingTracker';

export default function Home() {
  return (
    <>
      <LandingTracker />
      <Hero />
      <Marquee />
      <Services />
      <Cases />
      <Process />
      <Stats />
      <CTA />
      <ContactForm />
      <Footer />
    </>
  );
}
