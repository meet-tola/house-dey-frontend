import { AuthProvider } from "@/context/AuthContext";
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
              {children}
          </SocketContextProvider>
        </ProtectedRoute>
      </AuthProvider>
    </>
  );
}
