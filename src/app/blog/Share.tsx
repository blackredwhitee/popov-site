"use client";
import { useEffect, useState } from "react";
import s from "../inner.module.css";

export default function Share({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState("");
  useEffect(() => setUrl(location.href), []);
  const u = () => encodeURIComponent(url);
  const t = encodeURIComponent(title);
  return (
    <div className={s.share}>
      <span>Поделиться</span>
      <a href={`https://t.me/share/url?url=${u()}&text=${t}`} target="_blank" rel="noopener">Telegram</a>
      <a href={`https://vk.com/share.php?url=${u()}&title=${t}`} target="_blank" rel="noopener">VK</a>
      <a href={`https://wa.me/?text=${t}%20${u()}`} target="_blank" rel="noopener">WhatsApp</a>
      <button type="button" aria-live="polite" onClick={() => {
        navigator.clipboard?.writeText(location.href).catch(() => {});
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}>{copied ? "Ссылка скопирована" : "Копировать ссылку"}</button>
    </div>
  );
}
