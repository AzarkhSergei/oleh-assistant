import { useState, useCallback } from "react";
import { supabase } from "../supabaseClient";
import { useAuth } from "../context/AuthContext";

export interface Review {
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

export function useReviews() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);

  const loadReviews = useCallback(
    async ({ approvedOnly = false }: { approvedOnly?: boolean } = {}) => {
      let query = supabase.from("reviews").select("*");

      if (approvedOnly) {
        query = query.eq("approved", true);
      }

      const { data, error } = await query.order("created_at", { ascending: false });
      if (error) {
        console.error("Ошибка загрузки отзывов:", error.message);
        return;
      }

      setReviews(data || []);
    },
    []
  );

  const leaveReview = useCallback(
    async (name: string, text: string, rating: number, photo_url?: string) => {
      if (!user?.id) return;

      const { error } = await supabase.from("reviews").insert([
        {
          user_id: user.id,
          name,
          text,
          rating,
          photo_url,
          approved: false,
          edited: false,
        },
      ]);

      if (error) console.error("Ошибка при добавлении отзыва:", error.message);
      return !error;
    },
    [user]
  );

  const hasUserLeftReview = useCallback(async () => {
    if (!user?.id) return false;

    const { data, error } = await supabase
      .from("reviews")
      .select("id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (error) {
      console.error("Ошибка при проверке отзыва:", error.message);
      return false;
    }

    return !!data;
  }, [user]);

  const approveReview = useCallback(async (id: string) => {
    const { error } = await supabase.from("reviews").update({ approved: true }).eq("id", id);
    if (error) console.error("Ошибка одобрения отзыва:", error.message);
    else {
      setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, approved: true } : r)));
    }
  }, []);

  const editReview = useCallback(async (updatedReview: Review) => {
    const dateToSave = new Date(updatedReview.created_at);

    if (isNaN(dateToSave.getTime())) {
      alert("Некорректная дата");
      return false;
    }

    const { error } = await supabase
      .from("reviews")
      .update({
        name: updatedReview.name,
        text: updatedReview.text,
        rating: updatedReview.rating,
        created_at: dateToSave.toISOString(),
        edited: true,
      })
      .eq("id", updatedReview.id);

    if (error) {
      console.error("Ошибка редактирования отзыва:", error.message);
      return false;
    }

    // Обновляем локальное состояние
    const { data } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setReviews(data);
    return true;
  }, []);

  return {
    reviews,
    loadReviews,
    leaveReview,
    hasUserLeftReview,
    approveReview,
    editReview,
  };
}
