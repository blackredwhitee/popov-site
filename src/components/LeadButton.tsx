"use client";
import { openLead } from "@/lib/lead";

export default function LeadButton({ children, className = "btn btn-gold" }: { children: React.ReactNode; className?: string }) {
  return <button type="button" className={className} onClick={openLead}>{children}</button>;
}
