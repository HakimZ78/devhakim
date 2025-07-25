import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GlobalAdminProvider } from "@/contexts/GlobalAdminContext";
import ConditionalLayout from "@/components/layout/ConditionalLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "DevHakim - Full-Stack Python Developer",
  description: "Hakim's journey from healthcare to software engineering. Specializing in Python, FastAPI, React, and fintech applications.",
  keywords: ["Full-Stack Developer", "Python", "React", "Fintech", "Career Transition", "Software Engineer"],
  authors: [{ name: "Hakim" }],
  openGraph: {
    title: "DevHakim - Full-Stack Python Developer",
    description: "From healthcare to software engineering - building real-time trading platforms and fintech applications",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        <GlobalAdminProvider>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </GlobalAdminProvider>
      </body>
    </html>
  );
}
