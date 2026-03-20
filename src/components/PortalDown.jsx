import { useState, useEffect } from "react";

const floatingParticles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  size: Math.random() * 6 + 2,
  left: Math.random() * 100,
  delay: Math.random() * 8,
  duration: Math.random() * 10 + 10,
  opacity: Math.random() * 0.4 + 0.1,
}));

export default function PortalDown() {
  const [visible, setVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 100);
    const t2 = setTimeout(() => setTextVisible(true), 700);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div style={styles.root}>
      <style>{css}</style>

      {/* Floating particles */}
      {floatingParticles.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            opacity: p.opacity,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}

      {/* Grid overlay */}
      <div style={styles.grid} />

      {/* Center card */}
      <div
        className="card"
        style={{
          ...styles.card,
          opacity: visible ? 1 : 0,
          transform: visible
            ? "translateY(0) scale(1)"
            : "translateY(40px) scale(0.96)",
        }}
      >
        {/* Orb */}
        <div style={styles.orbWrapper}>
          <div style={styles.orbRing} className="spin-slow" />
          <div style={styles.orbRingInner} className="spin-reverse" />
          <div style={styles.orb} className="orb-pulse">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <path
                d="M18 4 L18 32 M4 18 L32 18 M7 7 L29 29 M29 7 L7 29"
                stroke="#e8c97e"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle
                cx="18"
                cy="18"
                r="6"
                fill="none"
                stroke="#e8c97e"
                strokeWidth="1.5"
              />
            </svg>
          </div>
        </div>

        {/* Status badge */}
        <div
          style={{
            ...styles.badge,
            opacity: textVisible ? 1 : 0,
            transform: textVisible ? "translateY(0)" : "translateY(10px)",
          }}
        >
          <span style={styles.dot} className="dot-blink" />
          <span style={styles.badgeText}>SCHEDULED MAINTENANCE</span>
        </div>

        {/* Main heading */}
        <h1
          style={{
            ...styles.heading,
            opacity: textVisible ? 1 : 0,
            transform: textVisible ? "translateY(0)" : "translateY(16px)",
            transitionDelay: "0.1s",
          }}
        >
          We're <em style={styles.accent}>rebuilding</em>
          <br />
          something great.
        </h1>

        {/* Divider */}
        <div
          style={{
            ...styles.divider,
            width: textVisible ? "80px" : "0px",
            transitionDelay: "0.2s",
          }}
        />

        {/* Message */}
        <p
          style={{
            ...styles.message,
            opacity: textVisible ? 1 : 0,
            transform: textVisible ? "translateY(0)" : "translateY(12px)",
            transitionDelay: "0.25s",
          }}
        >
          Our portal is currently undergoing essential upgrades to bring you a
          faster, smarter, and more powerful experience. We appreciate your
          patience — great things take a moment.
        </p>

        {/* Live soon */}
        <div
          style={{
            ...styles.liveBox,
            opacity: textVisible ? 1 : 0,
            transitionDelay: "0.35s",
          }}
        >
          <span style={styles.liveIcon}>✦</span>
          <span style={styles.liveText}>The portal will be live soon</span>
          <span style={styles.liveIcon}>✦</span>
        </div>

        {/* Footer */}
        <p
          style={{
            ...styles.footer,
            opacity: textVisible ? 0.4 : 0,
            transitionDelay: "0.45s",
          }}
        >
          For urgent matters, please contact{" "}
          <a href="it@aaasassam.in" style={styles.link}>
            it@aaasassam.in
          </a>
        </p>
      </div>

      {/* Bottom bar */}
      <div style={{ ...styles.bottomBar, opacity: textVisible ? 1 : 0 }}>
        <span style={styles.bottomText}> Status: Maintenance</span>
      </div>
    </div>
  );
}

const styles = {
  root: {
    minHeight: "100vh",
    background: "#0c0e14",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    position: "relative",
    overflow: "hidden",
    padding: "24px",
  },
  grid: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "linear-gradient(rgba(232,201,126,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(232,201,126,0.04) 1px, transparent 1px)",
    backgroundSize: "60px 60px",
    pointerEvents: "none",
  },
  card: {
    position: "relative",
    zIndex: 10,
    maxWidth: 560,
    width: "100%",
    background:
      "linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
    border: "1px solid rgba(232,201,126,0.18)",
    borderRadius: 4,
    padding: "60px 52px 52px",
    textAlign: "center",
    backdropFilter: "blur(20px)",
    boxShadow: "0 0 80px rgba(232,201,126,0.05), 0 40px 80px rgba(0,0,0,0.5)",
    transition:
      "opacity 0.8s cubic-bezier(.16,1,.3,1), transform 0.8s cubic-bezier(.16,1,.3,1)",
  },
  orbWrapper: {
    position: "relative",
    width: 96,
    height: 96,
    margin: "0 auto 36px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  orbRing: {
    position: "absolute",
    inset: 0,
    border: "1px solid rgba(232,201,126,0.25)",
    borderRadius: "50%",
    borderTopColor: "rgba(232,201,126,0.8)",
  },
  orbRingInner: {
    position: "absolute",
    inset: 8,
    border: "1px solid rgba(232,201,126,0.12)",
    borderRadius: "50%",
    borderBottomColor: "rgba(232,201,126,0.5)",
  },
  orb: {
    width: 64,
    height: 64,
    borderRadius: "50%",
    background:
      "radial-gradient(circle at 35% 35%, rgba(232,201,126,0.2), rgba(232,201,126,0.04))",
    border: "1px solid rgba(232,201,126,0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: "rgba(232,201,126,0.08)",
    border: "1px solid rgba(232,201,126,0.2)",
    borderRadius: 2,
    padding: "6px 14px",
    marginBottom: 28,
    transition: "opacity 0.6s ease, transform 0.6s ease",
  },
  dot: {
    display: "inline-block",
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: "#e8c97e",
  },
  badgeText: {
    fontFamily: "'Space Mono', monospace",
    fontSize: 10,
    letterSpacing: "0.2em",
    color: "#e8c97e",
    fontWeight: 400,
  },
  heading: {
    fontSize: "clamp(2rem, 5vw, 3rem)",
    fontWeight: 300,
    lineHeight: 1.2,
    color: "#f0ece0",
    margin: "0 0 24px",
    letterSpacing: "-0.01em",
    transition: "opacity 0.7s ease, transform 0.7s ease",
  },
  accent: {
    fontStyle: "italic",
    color: "#e8c97e",
    fontWeight: 400,
  },
  divider: {
    height: 1,
    background:
      "linear-gradient(90deg, transparent, rgba(232,201,126,0.5), transparent)",
    margin: "0 auto 28px",
    transition: "width 0.8s cubic-bezier(.16,1,.3,1) 0.2s",
  },
  message: {
    fontSize: "1.05rem",
    lineHeight: 1.75,
    color: "rgba(240,236,224,0.55)",
    margin: "0 0 36px",
    fontWeight: 300,
    transition: "opacity 0.7s ease, transform 0.7s ease",
  },
  liveBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    padding: "16px 24px",
    background: "rgba(232,201,126,0.06)",
    border: "1px solid rgba(232,201,126,0.2)",
    borderRadius: 2,
    marginBottom: 32,
    transition: "opacity 0.7s ease",
  },
  liveIcon: {
    color: "#e8c97e",
    fontSize: 10,
    opacity: 0.7,
  },
  liveText: {
    fontFamily: "'Space Mono', monospace",
    fontSize: 13,
    letterSpacing: "0.12em",
    color: "#e8c97e",
    fontWeight: 400,
  },
  footer: {
    fontSize: "0.82rem",
    color: "rgba(240,236,224,0.4)",
    transition: "opacity 0.7s ease",
    fontFamily: "'Space Mono', monospace",
    letterSpacing: "0.02em",
  },
  link: {
    color: "rgba(232,201,126,0.7)",
    textDecoration: "none",
  },
  bottomBar: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    padding: "12px 24px",
    borderTop: "1px solid rgba(232,201,126,0.08)",
    textAlign: "center",
    transition: "opacity 1s ease 0.5s",
  },
  bottomText: {
    fontFamily: "'Space Mono', monospace",
    fontSize: 10,
    letterSpacing: "0.15em",
    color: "rgba(232,201,126,0.3)",
  },
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Space+Mono:wght@400&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .particle {
    position: fixed;
    border-radius: 50%;
    background: #e8c97e;
    bottom: -10px;
    animation: floatUp linear infinite;
    pointer-events: none;
    z-index: 1;
  }
  @keyframes floatUp {
    0%   { transform: translateY(0) translateX(0); opacity: 0; }
    10%  { opacity: 1; }
    90%  { opacity: 1; }
    100% { transform: translateY(-110vh) translateX(30px); opacity: 0; }
  }

  .spin-slow {
    animation: spinCW 8s linear infinite;
  }
  .spin-reverse {
    animation: spinCCW 5s linear infinite;
  }
  @keyframes spinCW  { to { transform: rotate(360deg); } }
  @keyframes spinCCW { to { transform: rotate(-360deg); } }

  .orb-pulse {
    animation: orbPulse 3s ease-in-out infinite;
  }
  @keyframes orbPulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(232,201,126,0); }
    50% { box-shadow: 0 0 20px 4px rgba(232,201,126,0.15); }
  }

  .dot-blink {
    animation: blink 2s ease-in-out infinite;
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.2; }
  }

  a:hover { opacity: 1 !important; color: #e8c97e !important; }
`;
