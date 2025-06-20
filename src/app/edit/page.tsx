"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

export default function EditPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchLink = async () => {
      try {
        const ref = doc(db, "links", id);
        const snap = await getDoc(ref); 
        if (snap.exists()) {  //해당 문서가 실제로 존재하는지 확인
          const data = snap.data();
          setTitle(data.title || "");
          setUrl(data.url || "");
          setDescription(data.description || "");
          setTags((data.tags || []).join(", "));
        } else {
          alert("링크를 찾을 수 없습니다.");
          router.push("/dashboard");
        }
      } catch (err) {
        console.error("링크 로딩 실패", err);
        alert("오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchLink();
  }, [id, router]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    try {
      await updateDoc(doc(db, "links", id), {
        title,
        url,
        description,
        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        updatedAt: serverTimestamp(),
      });

      alert("수정 완료!");
      router.push("/dashboard");
    } catch (err) {
      console.error("수정 실패", err);
      alert("저장 실패");
    }
  };

  if (loading) return <p className="p-8">불러오는 중...</p>;

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">✏️ 링크 수정</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">URL *</label>
          <input
            type="url"
            className="w-full border px-3 py-2 rounded"
            required
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">제목</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">설명</label>
          <textarea
            className="w-full border px-3 py-2 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">태그 (쉼표로 구분)</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          저장하기
        </button>
      </form>
    </main>
  );
}
