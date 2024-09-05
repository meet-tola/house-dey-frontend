import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "@/components/protected/ProtectedRoute";
import { SocketContextProvider } from "@/context/SocketContext";
import AgentProtectedRoute from "@/components/protected/AgentProtectedRoute";

export default function ProtectedLayout({ children }) {
  return (
    <>
      <Toaster />
      <AuthProvider>
        <ProtectedRoute>
          <AgentProtectedRoute>
            <SocketContextProvider>{children}</SocketContextProvider>
          </AgentProtectedRoute>
        </ProtectedRoute>
      </AuthProvider>
    </>
  );
}
