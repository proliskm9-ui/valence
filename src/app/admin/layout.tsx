import type { Metadata } from 'next';
import { LanguageProvider } from '@/components/providers/LanguageProvider';
import MotionSetup from '@/components/providers/MotionSetup';

export const metadata: Metadata = {
  title: 'Заявки — админка',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <MotionSetup>
        <div className="min-h-svh bg-bg text-fg">{children}</div>
      </MotionSetup>
    </LanguageProvider>
  );
}
