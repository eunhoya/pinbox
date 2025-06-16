export interface UserInfo {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
  }
  
  interface AuthStore {
    user: UserInfo | null;
    setUser: (user: UserInfo | null) => void;
  }
  
  import { create } from "zustand";
  
  export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
  }));
  