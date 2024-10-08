import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "@/components/protected/ProtectedRoute";
import { SocketContextProvider } from "@/context/SocketContext";
import ClientProtectedRoute from "@/components/protected/ClientProtectedRoute";

export default function ProtectedLayout({ children }) {
  return (
    <>
      <Toaster />
      <AuthProvider>
        <ProtectedRoute>
          <ClientProtectedRoute>
            <SocketContextProvider>{children}</SocketContextProvider>
          </ClientProtectedRoute>
        </ProtectedRoute>
      </AuthProvider>
    </>
  );
}
