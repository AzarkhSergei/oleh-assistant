import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { supabase } from "../supabaseClient";
import { useAuth } from "../context/AuthContext";

export default function LeaveReview() {
  const { user } = useAuth();
  const [hasReview, setHasReview] = useState(false);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const checkReview = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("reviews")
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) console.error("Ошибка при проверке отзыва", error);

      setHasReview(!!data);
      setLoading(false);
    };

    checkReview();
  }, [user]);

  const handleSubmit = async () => {
    if (!user?.id || !name.trim() || !text.trim()) return;

    const { error } = await supabase.from("reviews").insert([
      {
        user_id: user.id,
        name,
        text,
        rating,
        photo_url: photoUrl,
        approved: false,
        edited: false,
      },
    ]);

    if (error) {
      console.error("Ошибка при добавлении отзыва", error);
    } else {
      setSuccess(true);
      setHasReview(true);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500 mt-10">Загрузка...</p>;
  }

  if (success) {
    return (
      <div className="text-center text-green-600 mt-10">
        <p>Отзыв отправлен на модерацию. Спасибо!</p>
      </div>
    );
  }

  if (hasReview) {
    return (
      <div className="text-center text-gray-600 mt-10">
        <p>Вы уже оставили отзыв. Спасибо!</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-4 bg-white border rounded shadow mt-10">
      <h2 className="text-xl font-semibold mb-4 text-primary">Оставить отзыв</h2>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Ваше имя"
        className="w-full border rounded p-2 mb-4"
      />

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        className="w-full border rounded p-2 mb-4"
        placeholder="Ваш отзыв..."
      />

      <input
        type="url"
        value={photoUrl}
        onChange={(e) => setPhotoUrl(e.target.value)}
        placeholder="URL фото (необязательно)"
        className="w-full border rounded p-2 mb-4"
      />

      <div className="flex items-center gap-2 mb-4">
        <label className="text-sm text-gray-700">Оценка:</label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="border rounded p-1"
        >
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>
              {r} ⭐
            </option>
          ))}
        </select>
        <Star className="text-yellow-500" size={16} />
      </div>

      <button
        onClick={handleSubmit}
        className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Отправить
      </button>
    </div>
  );
}
