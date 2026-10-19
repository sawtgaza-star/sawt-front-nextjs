"use client";
import { useEffect, useId, useRef } from "react";
import { initSawtAnim } from "./sawt-anim-effects";
import { ARCS, BARS, DOTS, IMG, TEXT } from "./sawt-anim-data";
import "@/styles/sawt-anim.css";

/* The home "من نحن" illustration (from sawt-hero-replica.html): the "صوت"
   microphone over the map of Palestine with a living sound wave, glow sweeps
   and story bubbles; the production circle, the licence badge and the
   olive branch enter around it. The circle and branch keep floating and
   swaying; the badge stays still once in.

   The drawing is here; the bar rhythm, light motes and the
   play-only-on-screen logic are in sawt-anim-effects.ts. The section renders
   it twice (mobile and desktop layouts), so every SVG id carries this
   instance's id. */

const LICENSE_NO = "60533";

export default function SawtAboutAnim({ lang = "ar" }: { lang?: string }) {
  const ref = useRef<HTMLElement>(null);
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const id = (name: string) => `sh-${name}-${uid}`;
  const url = (name: string) => `url(#${id(name)})`;
  const t = lang === "en" ? TEXT.en : TEXT.ar;

  useEffect(() => {
    if (!ref.current) return;
    return initSawtAnim(ref.current);
  }, []);

  return (
    <figure className="sawt-about-anim" ref={ref} role="img" aria-label={t.label}>
      <svg viewBox="0 50 945 675" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id={id("clip-main")}><circle cx="571" cy="351" r="271.5" /></clipPath>
          <clipPath id={id("clip-small")}><circle cx="315" cy="487" r="148.5" /></clipPath>
          <clipPath id={id("clip-grille")}><rect x="527" y="180" width="80" height="96" rx="40" /></clipPath>
          <filter id={id("blur-shadow")} x="-20%" y="-200%" width="140%" height="500%"><feGaussianBlur stdDeviation="14" /></filter>
          <filter id={id("bar-glow")} x="-200%" y="-20%" width="500%" height="140%">
            <feGaussianBlur stdDeviation="1.6" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id={id("badge-shadow")} x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#2A3120" floodOpacity=".22" />
          </filter>
          <radialGradient id={id("badge-fill")} cx="45%" cy="35%" r="70%">
            <stop offset="0" stopColor="#F6ECE2" /><stop offset="1" stopColor="#EEDFCF" />
          </radialGradient>
          <radialGradient id={id("warm-g")} cx="50%" cy="45%" r="55%">
            <stop offset="0" stopColor="#FF9A3C" stopOpacity="1" /><stop offset="1" stopColor="#FF9A3C" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={id("shine-g")} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="0" /><stop offset=".5" stopColor="#fff" stopOpacity=".55" /><stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={id("sweep-g")} gradientUnits="userSpaceOnUse" x1="0" y1="118" x2="0" y2="298">
            <stop offset="0" stopColor="#000" /><stop offset=".5" stopColor="#fff" /><stop offset="1" stopColor="#000" />
            <animateTransform attributeName="gradientTransform" type="translate" values="0 -200; 0 520" dur="4.8s" repeatCount="indefinite" />
          </linearGradient>
          <mask id={id("sweep-mask")} maskUnits="userSpaceOnUse" x="480" y="118" width="225" height="482">
            <rect x="480" y="118" width="225" height="482" fill={url("sweep-g")} />
          </mask>
        </defs>

        {/* ground shadow */}
        <ellipse cx="505" cy="688" rx="395" ry="20" fill="#8C978B" opacity=".35" filter={url("blur-shadow")} />

        {/* orange arcs and their end dots */}
        <g fill="none" stroke="#D66A2A" strokeWidth="1.6" strokeLinecap="round" opacity=".9">
          {ARCS.map(([d, len, delay], i) => (
            <path
              key={d}
              id={i === 0 ? id("arc-top") : undefined}
              className="sh-arc"
              d={d}
              style={{ "--len": len, animationDelay: `${delay}s` } as React.CSSProperties}
            />
          ))}
        </g>
        <g fill="#D8641A">
          {DOTS.map(([cx, cy, delay]) => (
            <circle key={`${cx}-${cy}`} className="sh-dot" cx={cx} cy={cy} r="4.6" style={{ animationDelay: `${delay}s` }} />
          ))}
        </g>
        {/* a spark running along the top arc */}
        <circle r="3" fill="#F08A45" opacity="0">
          <animateMotion dur="7s" begin="2.5s" repeatCount="indefinite" keyPoints="0;1;1" keyTimes="0;.55;1" calcMode="spline" keySplines=".45 0 .25 1;0 0 1 1">
            <mpath href={`#${id("arc-top")}`} />
          </animateMotion>
          <animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;.05;.5;.55;1" dur="7s" begin="2.5s" repeatCount="indefinite" />
        </circle>

        {/* main circle */}
        <g className="sh-in-main">
          <image href={IMG.main} x="299" y="79" width="545" height="545" />
          <g clipPath={url("clip-main")}>
            {/* glow along the map's border */}
            <image className="sh-glow-breathe" href={IMG.glow} x="480" y="118" width="225" height="482" />
            <image className="sh-glow-sweep" href={IMG.glow} x="480" y="118" width="225" height="482" mask={url("sweep-mask")} />
            {/* sound wave */}
            <g filter={url("bar-glow")}>
              <rect x="333" y="359.5" width="153" height="2.5" fill="#646938" opacity=".9" />
              <rect x="664" y="359.5" width="178" height="2.5" fill="#646938" opacity=".9" />
              {BARS.map(([x, y, width, height, rx, fill]) => (
                <rect key={x} className="sh-bar" x={x} y={y} width={width} height={height} rx={rx} fill={fill} />
              ))}
            </g>
            {/* light motes (built by the effect) */}
            <g className="sh-motes" fill="#E9F0B4" />
            {/* shine across the mic's grille */}
            <g clipPath={url("clip-grille")}>
              <rect className="sh-shine" x="540" y="170" width="44" height="120" fill={url("shine-g")} transform="skewX(-14)" style={{ mixBlendMode: "screen" }} />
            </g>
          </g>
          {/* story bubbles */}
          <image className="sh-bubble" href={IMG.bubble1} x="374" y="186" width="72" height="72" />
          <image className="sh-bubble d2" href={IMG.bubble2} x="416" y="234" width="76" height="72" />
          <image className="sh-bubble d3" href={IMG.bubble3} x="694" y="244" width="70" height="68" />
        </g>

        {/* production circle */}
        <g className="sh-in-small">
          <g className="sh-float-small">
            <image href={IMG.production} x="165" y="337" width="301" height="301" />
            <g clipPath={url("clip-small")}>
              <circle className="sh-warm" cx="315" cy="480" r="150" fill={url("warm-g")} />
            </g>
            <g fill="none" stroke="#F3A35A" strokeWidth="1.4">
              <circle className="sh-ping" cx="327.5" cy="390" r="20" />
              <circle className="sh-ping d2" cx="390" cy="407.5" r="17" />
            </g>
          </g>
        </g>

        {/* licence badge */}
        <g className="sh-in-badge">
          <g>
            <g filter={url("badge-shadow")}>
              <circle cx="234" cy="347" r="91" fill={url("badge-fill")} />
            </g>
            <circle cx="234" cy="347" r="90.2" fill="none" stroke="#A39C88" strokeWidth="1.6" />
            <circle cx="234" cy="347" r="87.6" fill="none" stroke="#FFFFFF" strokeOpacity=".8" strokeWidth="1.6" />
            <g fill="#4F5B3A" transform="translate(233.5 297) scale(1.15)">
              <path d="M0 13V-12" stroke="#4F5B3A" strokeWidth="1.6" strokeLinecap="round" />
              <path d="M0-4C-3-9-1-15 0-18C1-15 3-9 0-4Z" />
              <path d="M-1 3C-6 0-12-1-15 0C-12 4-6 5-1 3Z" />
              <path d="M1 3C6 0 12-1 15 0C12 4 6 5 1 3Z" />
              <path d="M-1-4C-5-8-10-10-13-10C-11-6-6-4-1-4Z" />
              <path d="M1-4C5-8 10-10 13-10C11-6 6-4 1-4Z" />
            </g>
            <g className="sh-badge-text" fontWeight="700" textAnchor="middle">
              <text x="234" y="340" fontSize="19" fill="#4E583D">{t.licensed}</text>
              <text x="234" y="365" fontSize="18" fill="#4E583D">{t.licenseNo}</text>
              <text x="234" y="403" fontSize="32" fontWeight="800" fill="#DD7A2E">{LICENSE_NO}</text>
            </g>
          </g>
        </g>

        {/* olive branch */}
        <g className="sh-in-branch">
          <g className="sh-sway">
            <image href={IMG.branch} x="617" y="326" width="277" height="365" />
          </g>
        </g>
      </svg>
    </figure>
  );
}
