"use client";
import { useEffect, useState } from "react";
import { goal } from "@/lib/metrika";

/** H1 с именем из заявки (sessionStorage) + цель Метрики на загрузке. */
export default function Title({ className }: { className: string }) {
  const [name, setName] = useState("");
  useEffect(() => {
    try { setName((JSON.parse(sessionStorage.getItem("popov_lead") || "{}").name || "").trim().split(" ")[0]); } catch {}
    goal("thanks_page");
  }, []);
  return <h1 className={className}>{name ? `${name}, спасибо — заявка отправлена` : "Спасибо, заявка отправлена"}</h1>;
}
