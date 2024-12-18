import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthStore } from "../../store/auth";

export default function Dashboard() {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen bg-lightBlue-50 p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user?.username}!</h1>
      {/* Dashboard content goes here */}
    </div>
  );
} 