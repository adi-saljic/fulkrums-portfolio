import type { Metadata } from "next";
import "swiper/css/bundle";
import "./globals.scss";

export const metadata: Metadata = {
  title: {
    default: "Fulkrums - Video Production & Marketing Agency Sarajevo | Digital Agency Bosnia",
    template: "%s | Fulkrums Digital Agency Sarajevo",
  },
  icons: {
    icon: '/assets/img/logo/logo-transparent.png',
    apple: '/assets/img/logo/logo-transparent.png',
  },
  description: "Expert video production and marketing agency in Sarajevo. We create high-performance video content, run data-driven campaigns, and design compelling visuals for brands across Bosnia, Herzegovina, and the Balkans.",
  keywords: [
    "Fulkrums",
    "digital agency Sarajevo",
    "digitalna agencija Sarajevo",
    "video production Sarajevo",
    "video produkcija Sarajevo",
    "video production agency Bosnia",
    "agencija za video produkciju Sarajevo",
    "performance marketing Sarajevo",
    "performance marketing Bosna",
    "marketing agencija Sarajevo",
    "social media marketing Bosnia",
    "društvene mreže Sarajevo",
    "photography Sarajevo",
    "fotografija Sarajevo",
    "drone filming Sarajevo",
    "dron snimanje Sarajevo",
    "brand storytelling Bosna",
    "video marketing Bosna",
    "kreativna agencija Sarajevo",
    "marketing plan Bosnia",
    "Balkans digital agency",
  ],
  authors: [{ name: "Fulkrums Digital Agency" }],
  creator: "Fulkrums",
  publisher: "Fulkrums",
  metadataBase: new URL("https://fulkrums.com"),
  openGraph: {
    type: "website",
    locale: "bs_BA",
    url: "https://fulkrums.com",
    siteName: "Fulkrums Digital Agency",
    title: "Fulkrums - Video Production & Marketing Agency Sarajevo",
    description: "Expert video production and marketing agency in Sarajevo. High-performance video content, data-driven campaigns, and graphic design for brands across Bosnia and the Balkans.",
    images: [
      {
        url: "/assets/img/logo/logo-transparent.png",
        width: 1200,
        height: 630,
        alt: "Fulkrums Digital Agency Sarajevo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fulkrums - Digital Agency Sarajevo, Bosnia",
    description: "Video production & performance marketing agency in Sarajevo, Bosnia and Herzegovina",
    creator: "@fulkrums",
    images: ["/assets/img/logo/logo-transparent.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
