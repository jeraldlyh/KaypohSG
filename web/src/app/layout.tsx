import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import { ModalProvider } from '../providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO: add auth provider
  return (
    <html lang="en" data-theme="dracula">
      <body>
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          toastOptions={{
            duration: 5000,
          }}
        />
        <ModalProvider>{children}</ModalProvider>
      </body>
    </html>
  );
}
