import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  user: { username: string } | null;
  authError: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  users: { username: string; password: string }[];
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  user: null,
  authError: null,
  users: [
    // Predefined users can be added here
    { username: "admin", password: "password" },
  ],
  login: async (username, password) => {
    try {
      const { users } = get();
      const existingUser = users.find(
        (user) => user.username === username && user.password === password
      );
      if (existingUser) {
        set({ isAuthenticated: true, user: { username }, authError: null });
      } else {
        set({ authError: "Invalid credentials" });
      }
    } catch (error) {
      set({ authError: "An error occurred during login" });
    }
  },
  register: async (username, password) => {
    try {
      const { users } = get();
      const userExists = users.some((user) => user.username === username);
      if (userExists) {
        set({ authError: "Username already exists" });
        return false;
      }
      set({
        users: [...users, { username, password }],
        isAuthenticated: true,
        user: { username },
        authError: null,
      });
      return true;
    } catch (error) {
      set({ authError: "An error occurred during registration" });
      return false;
    }
  },
  logout: () => set({ isAuthenticated: false, user: null }),
})); 