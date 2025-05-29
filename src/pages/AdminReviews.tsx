import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Pencil } from "lucide-react";

interface Review {
  id: string;
  name: string;
  text: string;
  rating: number;
  created_at: string;
  approved: boolean;
  edited: boolean;
  photo_url?: string;
  user_id?: string;
}

export default function AdminReviews() {
  const [userId, setUserId] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editState, setEditState] = useState<Review | null>(null);

  useEffect(() => {
    const load = async () => {
      const { data: sessionData } = await supabase.auth.getUser();
      const uid = sessionData?.user?.id;
      if (!uid) return;

      setUserId(uid);

      const { data: profileData } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", uid)
        .single();

      if (!profileData?.is_admin) {
        alert("Доступ только для админов");
        return;
      }

      setIsAdmin(true);

      const { data: reviewsData } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });

      setReviews(reviewsData || []);
    };

    load();
  }, []);

  const approveReview = async (id: string) => {
    await supabase.from("reviews").update({ approved: true }).eq("id", id);
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, approved: true } : r))
    );
  };

  const handleEdit = (review: Review) => {
    let dateForInput = "";
    try {
      const parsed = new Date(review.created_at);
      if (!isNaN(parsed.getTime())) {
        dateForInput = parsed.toISOString().slice(0, 16);
      }
    } catch {
      dateForInput = "";
    }

    setEditState({
      ...review,
      created_at: dateForInput,
    });
  };

  const handleSave = async () => {
    if (!editState) return;

    const dateToSave = new Date(editState.created_at);

    if (isNaN(dateToSave.getTime())) {
      alert("Некорректная дата");
      return;
    }

    await supabase
      .from("reviews")
      .update({
        name: editState.name,
        text: editState.text,
        rating: editState.rating,
        created_at: dateToSave.toISOString(),
        edited: true,
      })
      .eq("id", editState.id);

    setEditState(null);

    const { data } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });

    setReviews(data || []);
  };

  const handleCancel = () => {
    setEditState(null);
  };

  if (!userId || !isAdmin) {
    return <p className="text-center mt-10 text-gray-500">Загрузка...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-primary">Модерация отзывов</h1>

      {reviews.length === 0 ? (
        <p className="text-gray-500">Пока нет отзывов</p>
      ) : (
        reviews.map((r) => {
          const isEditing = editState?.id === r.id;

          return (
            <div key={r.id} className="bg-white border p-4 rounded shadow mb-4">
              {isEditing ? (
                <>
                  <input
                    className="border rounded p-1 mb-2 w-full"
                    value={editState.name}
                    onChange={(e) =>
                      setEditState((prev) => prev && { ...prev, name: e.target.value })
                    }
                  />
                  <input
                    type="datetime-local"
                    className="border rounded p-1 mb-2 w-full"
                    value={editState.created_at}
                    onChange={(e) =>
                      setEditState((prev) =>
                        prev ? { ...prev, created_at: e.target.value } : prev
                      )
                    }
                  />
                  <textarea
                    className="border rounded p-1 mb-2 w-full"
                    value={editState.text}
                    onChange={(e) =>
                      setEditState((prev) => prev && { ...prev, text: e.target.value })
                    }
                  />
                  <select
                    value={editState.rating}
                    onChange={(e) =>
                      setEditState((prev) => prev && { ...prev, rating: Number(e.target.value) })
                    }
                    className="border p-1 rounded mb-2"
                  >
                    {[5, 4, 3, 2, 1].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                  <div className="flex gap-3">
                    <button
                      onClick={handleSave}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      💾 Сохранить
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
                    >
                      ❌ Выйти без сохранения
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-lg font-medium">{r.name}</div>
                  <div className="text-sm text-gray-500">
                    {new Date(r.created_at).toLocaleString()}
                  </div>
                  <p className="my-2">{r.text}</p>
                  <div className="text-yellow-600">Оценка: {r.rating}⭐</div>
                  {r.edited && (
                    <div className="text-sm text-gray-400">Отредактировано вручную</div>
                  )}
                  <div className="mt-2 flex gap-3">
                    {!r.approved && (
                      <button
                        onClick={() => approveReview(r.id)}
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        ✅ Одобрить
                      </button>
                    )}
                    <button
                      onClick={() => handleEdit(r)}
                      className="text-blue-600 flex items-center gap-1"
                    >
                      <Pencil size={16} /> Редактировать
                    </button>
                  </div>
                </>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
