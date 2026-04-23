import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stellavia — Smart Premium Living | Khoraj, Gandhinagar",
  description:
    "Premium real estate landing page for Stellavia with gallery, floor plans, amenities, EMI calculator, and enquiry form.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
