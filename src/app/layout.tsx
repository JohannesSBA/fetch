import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { Toaster } from "@/components/ui/sonner";


export const metadata: Metadata = {
  title: "Fetch a Dog",
  description: "Fetch a Dog",
  icons: "/favicon.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <link rel="icon" href="/favicon.png" />
      <body
        className={`antialiased w-screen h-screen`}
      >
        <AuthProvider>
          <FavoritesProvider>
          {children}
        </FavoritesProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
