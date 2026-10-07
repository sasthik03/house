import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shantinibas.com"),

  title: {
    default: "শান্তি নিবাস | নিরাপদ ও সুন্দর আবাসিক ঠিকানা",
    template: "%s | শান্তি নিবাস",
  },

  description:
    "দিনাজপুর শহরে নিরাপদ, পরিচ্ছন্ন ও পরিবারবান্ধব আবাসিক পরিবেশে বসবাসের জন্য শান্তি নিবাস একটি সুন্দর ঠিকানা।",

  keywords: [
    "শান্তি নিবাস",
    "Shanti Nibas",
    "দিনাজপুর বাসা ভাড়া",
    "দিনাজপুর ফ্ল্যাট ভাড়া",
    "দিনাজপুর রুম ভাড়া",
    "দিনাজপুর আবাসিক ভবন",
    "ফ্ল্যাট ভাড়া দিনাজপুর",
    "রুম ভাড়া দিনাজপুর",
  ],

  authors: [
    {
      name: "শান্তি নিবাস",
    },
  ],

  creator: "শান্তি নিবাস",

  applicationName: "শান্তি নিবাস",

  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },

  openGraph: {
    type: "website",
    locale: "bn_BD",
    url: "https://shantinibas.com",
    siteName: "শান্তি নিবাস",

    title: "শান্তি নিবাস | নিরাপদ ও সুন্দর আবাসিক ঠিকানা",

    description:
      "দিনাজপুর শহরে নিরাপদ, পরিচ্ছন্ন ও পরিবারবান্ধব আবাসিক পরিবেশে আপনার পরিবারের জন্য একটি সুন্দর ঠিকানা।",

    images: [
      {
        url: "/hero-building-bg.jpg",
        width: 1200,
        height: 630,
        alt: "শান্তি নিবাস আবাসিক ভবন",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "শান্তি নিবাস | নিরাপদ ও সুন্দর আবাসিক ঠিকানা",

    description:
      "দিনাজপুর শহরে নিরাপদ, পরিচ্ছন্ন ও পরিবারবান্ধব আবাসিক পরিবেশ।",

    images: ["/hero-building-bg.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <ClerkProvider>
      <html
        lang="bn"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col">{children}</body>
      </html>
    </ClerkProvider>
  );
}
