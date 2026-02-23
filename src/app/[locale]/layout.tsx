import { VideoProvider } from "@/provider/VideoProvider";
import { ThemeProvider } from "next-themes";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { ContactModalProvider } from '@/context/contact-modal-context';
import { gallery, aladin, syne_body, syne_heading, syne_p, syne, marcellus } from '../fonts';

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning={true}>
      <body
        id="body"
        suppressHydrationWarning={true}
        className={`${gallery.variable} ${aladin.variable} ${syne_body.variable} ${syne_heading.variable} ${syne_p.variable} ${syne.variable} ${marcellus.variable}`}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider defaultTheme="dark">
            <VideoProvider>
              <ContactModalProvider>
                {children}
              </ContactModalProvider>
            </VideoProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

