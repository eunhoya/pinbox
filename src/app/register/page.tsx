"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      console.log("회원가입 성공:", result.user);
      alert("회원가입 성공! 로그인 해주세요.");
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert("회원가입 실패");
    }
  };

  return (
    <main className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">회원가입</h1>

      <div className="space-y-4">
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="비밀번호 (6자 이상)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handleSignup}
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          회원가입
        </button>
      </div>
    </main>
  );
}
