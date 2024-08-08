import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function ProtectedLayout({ children }) {
  return (
    <>
      <Toaster />
      <AuthProvider>
        <ProtectedRoute>
          <body>
            <Navbar />
            {children}
            <Footer />
          </body>
        </ProtectedRoute>
      </AuthProvider>
    </>
  );
}

