import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { SocketContextProvider } from "@/context/SocketContext";
import { MapProvider } from "@/provider/map-provider";

const plus = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata = {
  manifest: "/manifest.json",
  title: "HouseDey",
  description: "Discover the perfect place to live, rent, or invest.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <meta name="apple-mobile-web-app-capable" content="yes" />

        <link rel="icon" href="/favicon.png" sizes="any" />

        {/* Icon and Splash screen */}
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link
          href="/apple_splash_2048.png"
          sizes="2048x2732"
          rel="apple-touch-startup-image"
        />
        <link href="/apple_splash_750.png" sizes="750x1334" rel="apple-touch-startup-image" />
        <link href="/apple_splash_750.png" sizes="640x1136" rel="apple-touch-startup-image" />

      </head>
      <AuthProvider>
        <SocketContextProvider>
          <body className={plus.className}>
            <Toaster />
            <Navbar />
            <MapProvider>{children}</MapProvider>
            <Footer />
          </body>
        </SocketContextProvider>
      </AuthProvider>
    </html>
  );
}
