import type { Metadata } from "next";
import { Inter, Open_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import ReactQueryProvider from "@/app/providers/ReactQueryProvider";
import { Toaster } from "sonner";
import Footer from "./components/footer/Footer";

// Configure Inter for headings
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Configure Open Sans for body text
const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Study Abroad Africa",
  description:
    "The best resource to get all information about studying abroad as an African",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryProvider>
      <html lang="en">
        <body className={`${openSans.variable} ${inter.variable}`}>
          <Navbar />
          {children}
          <Toaster richColors position="top-right" duration={5000} />
          <Footer />
        </body>
      </html>
    </ReactQueryProvider>
  );
}
