import "../styles/globals.css";

export const metadata = {
  title: "SwiftSend — Your Software. Your Stack. Your Savings.",
  description:
    "We craft software, engineer data, automate with AI, and grow digital presence — clean, modern, fee-smart.",
  themeColor: "#d63cff"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
