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
      <SocketContextProvider>
        <AuthProvider>
          <ProtectedRoute>
            <div>
              <Navbar />
              {children}
              <Footer />
            </div>
          </ProtectedRoute>
        </AuthProvider>
      </SocketContextProvider>
    </>
  );
}
