import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, LoadingProvider, ModalProvider } from '../providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'KaypohSG',
  description:
    'Explore the benefits of KaypohSG - a vigilant platform that combines technology and community engagement for safer streets and stronger neighborhoods.',
  icons: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      sizes: 'any',
      url: '/favicon.svg',
    },
  ],
  openGraph: {
    title: 'KaypohSG | Enhancing Community Safety and Engagement',
    description:
      'Explore the benefits of KaypohSG - a vigilant platform that combines technology and community engagement for safer streets and stronger neighborhoods.',
    images: {
      url: '/favicon.svg`',
    },
    url: 'https://kaypoh-sg.jeraldlyh.com/',
    locale: 'en-US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dracula" className="font-primary">
      <body>
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            duration: 5000,
          }}
        />
        <AuthProvider>
          <LoadingProvider>
            <ModalProvider>{children}</ModalProvider>
          </LoadingProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
