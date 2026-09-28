export function TgIcon({ color = "currentColor", size = 20 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 4 3 11l6 2.5L11 20l3-4.5 5 3.5z" />
      <path d="m9 13.5 8-6.5" />
    </svg>
  );
}
export function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6" aria-hidden="true">
      <path d="M5 5l14 14M19 5 5 19" />
    </svg>
  );
}
