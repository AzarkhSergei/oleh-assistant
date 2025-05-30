import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useReviews, Review } from "../hooks/useReviews";

export default function AdminReviews() {
  const { user, isAdmin } = useAuth();
  const {
    reviews,
    loadReviews,
    approveReview,
    editReview,
  } = useReviews();
  const [editState, setEditState] = useState<Review | null>(null);

  useEffect(() => {
    if (user && isAdmin) loadReviews();
  }, [user, isAdmin, loadReviews]);

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

    setEditState({ ...review, created_at: dateForInput });
  };

  const handleSave = async () => {
    if (!editState) return;
    const success = await editReview(editState);
    if (success) setEditState(null);
  };

  const handleCancel = () => {
    setEditState(null);
  };

  if (!user || !isAdmin) {
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
                      setEditState((prev: Review | null) =>
                        prev ? { ...prev, name: e.target.value } : prev
                      )
                    }
                  />
                  <input
                    type="datetime-local"
                    className="border rounded p-1 mb-2 w-full"
                    value={editState.created_at}
                    onChange={(e) =>
                      setEditState((prev: Review | null) =>
                        prev ? { ...prev, created_at: e.target.value } : prev
                      )
                    }
                  />
                  <textarea
                    className="border rounded p-1 mb-2 w-full"
                    value={editState.text}
                    onChange={(e) =>
                      setEditState((prev: Review | null) =>
                        prev ? { ...prev, text: e.target.value } : prev
                      )
                    }
                  />
                  <select
                    value={editState.rating}
                    onChange={(e) =>
                      setEditState((prev: Review | null) =>
                        prev ? { ...prev, rating: Number(e.target.value) } : prev
                      )
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
