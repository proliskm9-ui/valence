import { LoadProvider } from '@/components/providers/LoadProvider';
import { LanguageProvider } from '@/components/providers/LanguageProvider';
import MotionSetup from '@/components/providers/MotionSetup';
import SmoothScroll from '@/components/providers/SmoothScroll';
import Preloader from '@/components/ui/Preloader';
import Cursor from '@/components/ui/Cursor';
import CookieBanner from '@/components/ui/CookieBanner';
import Header from '@/components/layout/Header';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <MotionSetup>
        <LoadProvider>
          <SmoothScroll>
            <Preloader />
            <Cursor />
            <Header />
            <main>{children}</main>
            <CookieBanner />
          </SmoothScroll>
        </LoadProvider>
      </MotionSetup>
    </LanguageProvider>
  );
}
