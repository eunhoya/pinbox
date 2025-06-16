"use client";

import { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { FirebaseError } from "firebase/app";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      useAuthStore.getState().setUser(userCredential.user);
      router.push("/dashboard");
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(err.message);
      } else {
        setError("알 수 없는 오류가 발생했어요.");
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      useAuthStore.getState().setUser(result.user);
      router.push("/dashboard");
    } catch (err) {
      console.error("구글 로그인 실패:", err);
    }
  };

  return (
    <main className="p-8 max-w-md mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center">로그인</h1>

      <form onSubmit={handleEmailLogin} className="space-y-4">
        <input
          type="email"
          placeholder="이메일"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          이메일로 로그인
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>

      <hr className="border-t border-gray-300" />

      <button
        onClick={handleGoogleLogin}
        className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
      >
        Google 계정으로 로그인
      </button>
    </main>
  );
}
