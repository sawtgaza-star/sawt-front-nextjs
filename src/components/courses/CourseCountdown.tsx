"use client";
import { useEffect, useState } from "react";

type Parts = { days: number; hours: number; minutes: number; seconds: number };

function partsUntil(deadline: string): Parts {
  const diff = Math.max(0, new Date(deadline).getTime() - Date.now());
  const total = Math.floor(diff / 1000);
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

/* Live countdown to the registration deadline. Starts ticking on mount (the
   server renders 00s, avoiding a hydration mismatch). Box order in the DOM is
   seconds→days so seconds sit rightmost in RTL, as in the mock. */
export default function CourseCountdown({ deadline }: { deadline: string }) {
  const [t, setT] = useState<Parts | null>(null);

  useEffect(() => {
    setT(partsUntil(deadline));
    const id = setInterval(() => setT(partsUntil(deadline)), 1000);
    return () => clearInterval(id);
  }, [deadline]);

  const boxes = [
    { value: t?.seconds, unit: "ثانية", unitKey: "crs_unit_seconds" },
    { value: t?.minutes, unit: "دقيقة", unitKey: "crs_unit_minutes" },
    { value: t?.hours, unit: "ساعة", unitKey: "crs_unit_hours" },
    { value: t?.days, unit: "يوم", unitKey: "crs_unit_days" },
  ];

  return (
    <div className="crs-countdown" role="timer">
      {boxes.map((b, i) => (
        <div className="crs-countdown-cell" key={b.unitKey}>
          {i > 0 && (
            <span className="crs-countdown-sep" aria-hidden="true">
              :
            </span>
          )}
          <div className="crs-countdown-box">
            <b>{b.value === undefined ? "00" : pad(b.value)}</b>
            <span data-i18n={b.unitKey}>{b.unit}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
