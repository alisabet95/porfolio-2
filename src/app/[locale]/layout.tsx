// src/app/[locale]/layout.tsx
import "../globals.css";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ReactNode } from "react";

const supportedLocales = ["en", "fa"];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isFA = locale === "fa";

  const siteUrl = "https://ali-ssabet.vercel.app";

  const title = isFA
    ? "علی ثابت | نمونه‌کار توسعه‌دهنده فول‌استک"
    : "Ali Sabet | Full-Stack Developer Portfolio";

  const description = isFA
    ? "نمونه‌کار علی شفیعی ثابت، توسعه‌دهنده فول‌استک با بیش از ۵ سال تجربه در ساخت برنامه‌های وب نوآورانه و مقیاس‌پذیر با استفاده از نکست‌جی‌اس، ری‌اکت و غیره."
    : "Portfolio of Ali Sabet, a Full-Stack Developer with over 5 years of experience in building innovative and scalable web applications using Next.js, React, and more.";

  return {
    title: {
      default: title,
      template: `%s | Ali Sabet Portfolio`,
    },
    description,
    keywords: [
      "Ali Sabet",
      "Ali Shafiee Sabet",
      "Full-Stack Developer",
      "Android Dev",
      "Android Developer",
      "Application",
      "Ronak dam",
      "علی ثابت",
      "علی شفیعی ثابت",
      "Next.js",
      "React",
      "JavaScript",
      "FastAPI",
      "Prisma",
      "MySQL",
      "Portfolio",
      ...(isFA ? ["نمونه کار", "توسعه‌دهنده وب", "نکست جی اس", "ری‌اکت"] : []),
    ],
    openGraph: {
      title,
      description,
      url: `${siteUrl}/${locale}`,
      siteName: "Ali Sabet Portfolio",
      images: [
        {
          url: `${siteUrl}/ali.jpg`,
          width: 1200,
          height: 630,
          alt: "Ali Sabet Portfolio Preview",
        },
      ],
      locale: isFA ? "fa_IR" : "en_US",
      type: "website",
    },
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: {
        en: `${siteUrl}/en`,
        fa: `${siteUrl}/fa`,
      },
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
      google: "SClRQTWUQDku7CXv2KkWF8E6Rxe3-CGS4PBEPlpFIbM",
    },
    authors: [{ name: "Ali Sabet", url: siteUrl }],
    icons: {
      icon: "/favicon.ico",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params; // Resolve the Promise

  if (!hasLocale(supportedLocales, locale)) {
    notFound();
  }

  return (
    <html
      lang={locale}
      dir={locale === "fa" ? "rtl" : "ltr"}
      data-scroll-behavior="smooth"
    >
      <body>
        <NextIntlClientProvider locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
