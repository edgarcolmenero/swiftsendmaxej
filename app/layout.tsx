// SwiftSend: placeholder scaffold added 2025-10-07T23:34:08Z — real implementation to follow
import "@/styles/base.css";
import type { Metadata } from "next";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "SwiftSend",
  description: "SwiftSend placeholder experience while the full app is under construction."
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
