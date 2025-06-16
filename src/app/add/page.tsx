"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 여기서 Firestore로 저장 로직 호출 예정
    console.log({ title, url, description, tags });
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
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ➕ 링크 추가
        </button>
      </form>
    </main>
  );
}
