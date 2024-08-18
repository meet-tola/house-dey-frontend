import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "@/components/ProtectedRoute";
import { SocketContextProvider } from "@/context/SocketContext";

export default function ProtectedLayout({ children }) {
  return (
    <>
      <Toaster />

      <AuthProvider>
        <ProtectedRoute>
          <SocketContextProvider>
            <div>
              <Navbar />
              {children}
              <Footer />
            </div>
          </SocketContextProvider>
        </ProtectedRoute>
      </AuthProvider>
    </>
  );
}
