"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

type LinkItem = {
  id: string;
  title: string;
  url: string;
  description: string;
  tags: string[];
  createdAt?: { seconds: number; nanoseconds: number };
  updatedAt?: { seconds: number; nanoseconds: number };
};

export default function DashboardPage() {
  
  const { user } = useAuthStore();
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  

  useEffect(() => {
    if (!user) return;

    const fetchLinks = async () => {
      try {
        const q = query(
          collection(db, "links"),
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(q);
        const items: LinkItem[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<LinkItem, "id">),
        }));
        setLinks(items);
      } catch (err) {
        console.error("링크 가져오기 실패", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLinks();
  }, [user]);

  const handleDelete = async (id: string) => {
    const ok = confirm("정말 삭제하시겠어요?");
    if (!ok) return;

    try {
      await deleteDoc(doc(db, "links", id));
      alert("삭제 완료!");
      setLinks((prev) => prev.filter((link) => link.id !== id));
    } catch (error) {
      console.error("삭제 실패", error);
      alert("삭제에 실패했어요.");
    }
  };

  const handleEdit = (link: LinkItem) => {
    router.push(`/edit?id=${link.id}`);
  };

  if (!user) return <p className="p-8">로그인이 필요합니다.</p>;

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📋 저장된 링크 목록</h1>
      {loading ? (
        <p>불러오는 중...</p>
      ) : links.length === 0 ? (
        <p className="text-gray-500">아직 저장된 링크가 없습니다.</p>
      ) : (
        <ul className="space-y-4">
          {links.map((link) => (
            <li
              key={link.id}
              className="p-4 border rounded hover:shadow transition"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-semibold text-blue-600 hover:underline"
                  >
                    {link.title}
                  </a>
                  <p className="text-sm text-gray-700">{link.description}</p>
                  <div className="mt-1 text-sm text-gray-500">
                    {link.tags?.map((tag) => `#${tag}`).join(" ")}
                  </div>
                </div>
                <div className="ml-4 flex flex-col gap-1">
                  <button
                    onClick={() => handleEdit(link)}
                    className="text-sm text-blue-500 hover:underline"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => handleDelete(link.id)}
                    className="text-sm text-red-500 hover:underline"
                  >
                    삭제
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
