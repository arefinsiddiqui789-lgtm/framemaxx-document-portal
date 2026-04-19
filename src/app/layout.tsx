import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FrameMaxx - Client Intake",
  description:
    "FrameMaxx Web Development Agency - Client Intake Portal. Submit your project request and let us build something extraordinary.",
  keywords: [
    "FrameMaxx",
    "Web Development",
    "Agency",
    "Client Intake",
    "Project Request",
  ],
  authors: [{ name: "FrameMaxx" }],
  icons: {
    icon: "/framemaxx-logo.png",
  },
  openGraph: {
    title: "FrameMaxx - Client Intake Portal",
    description: "Submit your project request to FrameMaxx Web Development Agency",
    siteName: "FrameMaxx",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
