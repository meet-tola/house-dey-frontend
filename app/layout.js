import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { SocketContext, SocketContextProvider } from "@/context/SocketContext";

const plus = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <SocketContextProvider>
        <AuthProvider>
          <body className={plus.className}>
            <Toaster /> <Navbar />
            {children}
            <Footer />
          </body>
        </AuthProvider>
      </SocketContextProvider>
    </html>
  );
}
