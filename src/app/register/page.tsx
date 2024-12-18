import { useRouter } from "next/router";
import { useState } from "react";
import { useAuthStore } from "../../store/auth";

export default function Register() {
  const { register, authError } = useAuthStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    const success = await register(username, password);
    if (success) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-lightBlue-50">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="w-full max-w-md bg-softAmber-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>
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
            onClick={handleRegister}
            className="w-full bg-softAmber-500 text-white p-2 rounded hover:bg-softAmber-600"
          >
            Register
          </button>
          <div className="mt-4 text-center">
            <a href="/" className="text-blue-500 hover:underline">
              Back to Login
            </a>
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        {/* ... existing footer content ... */}
      </footer>
    </div>
  );
} 