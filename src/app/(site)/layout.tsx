import { LoadProvider } from '@/components/providers/LoadProvider';
import { LanguageProvider } from '@/components/providers/LanguageProvider';
import MotionSetup from '@/components/providers/MotionSetup';
import SmoothScroll from '@/components/providers/SmoothScroll';
import RouteReset from '@/components/providers/RouteReset';
import Preloader from '@/components/ui/Preloader';
import Cursor from '@/components/ui/Cursor';
import CookieBanner from '@/components/ui/CookieBanner';
import Header from '@/components/layout/Header';
import AIChatWidget from '@/components/ui/AIChatWidget';
import CostEstimatorModal from '@/components/ui/CostEstimatorModal';
import GlobalAmbientBackground from '@/components/ui/GlobalAmbientBackground';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <MotionSetup>
        <LoadProvider>
          <SmoothScroll>
            <RouteReset />
            <Preloader />
            <Cursor />
            <GlobalAmbientBackground />
            <Header />
            <main className="relative z-10">{children}</main>
            <AIChatWidget />
            <CostEstimatorModal />
            <CookieBanner />
          </SmoothScroll>
        </LoadProvider>
      </MotionSetup>
    </LanguageProvider>
  );
}
