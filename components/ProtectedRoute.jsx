// components/ProtectedRoute.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { checkAuth } from '@/utils/auth';
import PageLoader from '@/components/PageLoader'; // Assume you have a loading spinner component

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authenticate = async () => {
      const auth = await checkAuth();
      if (!auth) {
        router.push('/login');
      } else {
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };

    authenticate();
  }, [router]);

  if (isLoading) {
    return <PageLoader />; // Display a loading spinner while checking authentication
  }

  if (!isAuthenticated) {
    return null; // Return null if not authenticated (or redirect to login)
  }

  return children; // Render the protected component if authenticated
};

export default ProtectedRoute;
