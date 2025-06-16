"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, setUser } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-zinc-900 text-white px-6 py-4 flex justify-between items-center">
        <Link href="/" className="font-bold text-xl">
          📌 PinBox
        </Link>
        <nav className="space-x-4">
          {user ? (
            <>
              <Link href="/add" className="hover:underline">
                새 링크 추가
              </Link>
              <Link href="/dashboard" className="hover:underline">
                대시보드
              </Link>
              <button onClick={handleLogout} className="hover:underline">
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:underline">
                로그인
              </Link>
              <Link href="/signup" className="hover:underline">
                회원가입
              </Link>
            </>
          )}
        </nav>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="text-center text-sm text-gray-500 py-4 border-t">
        &copy; 2025 PinBox. All rights reserved.
      </footer>
    </div>
  );
}
