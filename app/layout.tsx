import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mansi Agarwal | Senior Product Designer",
  description:
    "I design for systems that can't afford to be wrong. Carnegie Mellon CS + HCI · New York City · 4 years in complex B2B systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
