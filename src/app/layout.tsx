import type { Metadata } from "next";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackClientApp } from "../stack/client";
import { quicksand, figtree } from "@/branding/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Don't Forget the TP!",
  description: "Shopping for the whole house",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${figtree.className} ${quicksand.className} antialiased`}
      >
        <StackProvider app={stackClientApp}>
          <StackTheme>{children}</StackTheme>
        </StackProvider>
      </body>
    </html>
  );
}
