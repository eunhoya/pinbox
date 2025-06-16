"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuthStore } from "@/store/useAuthStore";

export default function AddPage() {
  const router = useRouter();
  const { user } = useAuthStore();

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return alert("로그인이 필요합니다.");

    try {
      setLoading(true);

      await addDoc(collection(db, "links"), {
        title,
        url,
        description,
        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        userId: user.uid,
        createdAt: serverTimestamp(),
      });

      router.push("/dashboard");
    } catch (error) {
      console.error("링크 저장 오류", error);
      alert("저장에 실패했어요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">🔗 새 링크 추가</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">URL *</label>
          <input
            type="url"
            className="w-full border px-3 py-2 rounded"
            required
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">제목</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">설명</label>
          <textarea
            className="w-full border px-3 py-2 rounded"
            placeholder="링크에 대한 간단한 설명"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">태그 (쉼표로 구분)</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            placeholder="ex) 프론트엔드, React, 유틸"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          ➕ {loading ? "저장 중..." : "링크 추가"}
        </button>
      </form>
    </main>
  );
}
