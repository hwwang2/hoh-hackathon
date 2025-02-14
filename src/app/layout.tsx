import type { Metadata } from "next";
import "./globals.css";
import { inter } from "./fonts";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/toaster"
import { Navigation } from "./navigation";

export const metadata: Metadata = {
  title: "Win by play wordle",
  description: "Win by play wordle",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} `}>
        <div className="min-h-screen bg-background font-sans antialiased">
          <Providers>
            <Navigation />
            {children}
          </Providers>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
