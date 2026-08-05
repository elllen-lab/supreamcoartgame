"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({
  children,
}: ProtectedRouteProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch(
          "http://localhost:3001/auth/me",
          {
            credentials: "include",
          },
        );

        const data = await res.json();

        if (!data.authenticated) {
          router.replace("/");
          return;
        }

        setLoading(false);
      } catch (error) {
        console.error(error);
        router.replace("/");
      }
    }

    checkAuth();
  }, [router]);

  if (loading) {
    return <div>Проверка доступа...</div>;
  }

  return <>{children}</>;
}