import "@/styles/globals.css";
import Header from "@/components/layout/Header";
import type { ReactNode } from "react";

export const metadata = {
  title: "SwiftSend — Your Software. Your Stack. Your Savings.",
  themeColor: "#d63cff"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Header is rendered via the component below */}
        <Header />
        {children}
      </body>
    </html>
  );
}
