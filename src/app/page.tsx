"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { googleOAuthUrl } from "../config/config";
import { useAuthStore } from "../store/auth";

export default function Home() {
  const { login, authError, isAuthenticated } = useAuthStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    await login(username, password);
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-lightBlue-50">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <div className="w-full max-w-md bg-softAmber-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-center text-blue-600">Login</h2>
          {authError && <p className="text-red-500">{authError}</p>}
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 mb-4 border rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-4 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleLogin}
            className="w-full bg-lightBlue-500 text-white p-2 rounded hover:bg-lightBlue-600"
          >
            Login
          </button>
          <div className="mt-4 text-center">
            <button
              onClick={() => {
                window.location.href = googleOAuthUrl;
              }}
              className="bg-blue-600 text-white p-3 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Login with Gmail
            </button>
          </div>
          <div className="mt-4 text-center">
            <Link href="/register" className="text-blue-500 hover:underline">
              Create a new user
            </Link>
          </div>
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
