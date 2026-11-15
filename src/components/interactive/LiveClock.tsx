"use client";

import { useEffect, useState } from "react";

/** Fecha y hora en vivo de una zona horaria (p. ej. Los Cabos). */
export function LiveClock({ timeZone, className }: { timeZone: string; className?: string }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);

  const date = now
    ? new Intl.DateTimeFormat("es-MX", { timeZone, day: "numeric", month: "long" }).format(now)
    : " ";
  const time = now
    ? new Intl.DateTimeFormat("es-MX", { timeZone, hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }).format(now)
    : " ";

  return (
    <p className={className} aria-label={now ? `${date}, ${time}` : undefined}>
      <span className="block capitalize">{date}</span>
      <span className="block tabular-nums">{time}</span>
    </p>
  );
}
