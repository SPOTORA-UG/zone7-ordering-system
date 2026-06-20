import "./globals.css";

export const metadata = {
title: "Zone 7 Ordering",
description: "QR Ordering by Spotora",
};

export const viewport = {
width: "device-width",
initialScale: 1,
maximumScale: 1,
};

export default function RootLayout({ children }) {
return ( <html lang="en"><html lang="en">
  <head>
    <link
      rel="preconnect"
      href="https://fonts.googleapis.com"
    />

    <link
      rel="preconnect"
      href="https://fonts.gstatic.com"
      crossOrigin=""
    />

    <link
      href="https://fonts.googleapis.com/css2?family=Italianno&display=swap"
      rel="stylesheet"
    />
  </head> 
        <body>{children}</body> </html>
);
}
