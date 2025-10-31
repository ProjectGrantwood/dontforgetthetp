import type { Metadata } from "next";
import { quicksand, figtree } from "@/branding/fonts"
import "./globals.css";

export const metadata: Metadata = {
  title: "SharedShopping",
  description: "Shopping for the whole house",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body className={`${figtree.className} ${quicksand.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
