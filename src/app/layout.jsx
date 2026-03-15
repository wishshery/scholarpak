import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Script from 'next/script';

export const metadata = {
  metadataBase: new URL('https://scholarpak.com'),
  title: {
    default: 'ScholarPak — Global Scholarships for Pakistani Students 2026',
    template: '%s | ScholarPak',
  },
  description:
    'Discover fully funded international scholarships for Pakistani students in Germany, UK, USA, Turkey, China, Australia, and 30+ countries. Updated daily for 2026 intakes.',
  keywords: [
    'scholarships for pakistani students',
    'fully funded scholarships pakistan',
    'study abroad pakistan',
    'international scholarships 2026',
    'scholarships in germany for pakistani students',
    'chevening scholarship',
    'daad scholarship',
    'fulbright pakistan',
  ],
  authors: [{ name: 'ScholarPak Team' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://scholarpak.com',
    siteName: 'ScholarPak',
    title: 'ScholarPak — Global Scholarships for Pakistani Students',
    description: 'Daily updated fully funded scholarships for Bachelor, Master, and PhD programs worldwide.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@scholarpak',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://scholarpak.com' },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#1e3a8a',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="ScholarPak" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50 overflow-x-hidden">
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-75FNYNT6H0"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-75FNYNT6H0');
          `}
        </Script>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
