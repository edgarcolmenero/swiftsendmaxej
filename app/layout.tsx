// SwiftSend: placeholder scaffold added 2025-10-07T23:34:08Z — real implementation to follow
import "../styles/globals.css";
import type { Metadata } from "next";

import Header from "../components/Header";
import Footer from "@/components/footer/Footer";

export const metadata: Metadata = {
  title: "SwiftSend",
  description: "SwiftSend placeholder experience while the full app is under construction."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
