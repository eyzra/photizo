import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { AmbientBackground } from "@/components/AmbientBackground";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Photizo Global | The Illumination Church",
    template: "%s | Photizo Global",
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "Photizo Global",
    "The Illumination Church",
    "Ezra Anya",
    "IMMERSION camp meeting",
    "Christian teaching",
    "Christian apologetics",
    "discipleship",
    "Abuja",
    "Minna",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "Photizo Global | The Illumination Church",
    description: site.description,
    locale: "en_NG",
  },
  twitter: { card: "summary_large_image", title: "Photizo Global | The Illumination Church", description: site.description },
};

export const viewport: Viewport = {
  themeColor: "#071D49",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  alternateName: site.church,
  slogan: site.mandate,
  url: site.url,
  email: site.email,
  telephone: site.phoneDisplay,
  founder: { "@type": "Person", name: site.founder },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NG">
      <head>
        <noscript>
          <style>{`[data-reveal],[data-draw]{opacity:1!important;transform:none!important;clip-path:none!important;stroke-dasharray:none!important;stroke-dashoffset:0!important}[data-hero]{height:auto!important}[data-hero-stage]{position:relative!important;height:auto!important}[data-hero-moment]{position:relative!important;inset:auto!important;opacity:1!important;transform:none!important;filter:none!important;padding:7rem 0 3rem}[data-hero-moment] *{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <AmbientBackground />
        <Nav />
        <main id="main" className="relative">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
