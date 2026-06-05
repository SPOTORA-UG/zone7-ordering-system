import "./globals.css";

export const metadata = {
  title: "Zone 7 Ordering",
  description: "QR Ordering by Spotora",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
