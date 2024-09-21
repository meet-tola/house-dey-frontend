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
  title: "HouseDey",
  description: "Discover the perfect place to live, rent, or invest.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo2.png" sizes="any" />
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
