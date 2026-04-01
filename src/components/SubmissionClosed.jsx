// SubmissionClosed.jsx
export default function SubmissionClosed() {
  return (
    <div className="relative min-h-screen bg-[#0f0e0c] flex items-center justify-center overflow-hidden font-mono">
      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.03) 40px),
            repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.03) 40px)
          `,
        }}
      />

      {/* Glow orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full animate-pulse pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(180,60,30,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Card */}
      <div className="relative z-10 max-w-2xl w-full px-6 text-center flex flex-col items-center">
        {/* Stamp icon */}
        <div
          className="flex items-center justify-center w-22 h-22 rounded-full mb-9"
          style={{
            width: 88,
            height: 88,
            border: "2.5px solid rgba(180,60,30,0.7)",
          }}
        >
          <span
            className="text-[40px] leading-none font-black"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#b43c1e",
            }}
          >
            ✕
          </span>
        </div>

        {/* Eyebrow */}
        <p
          className="text-[11px] tracking-[0.25em] uppercase mb-4"
          style={{ color: "rgba(180,60,30,0.8)" }}
        >
          Portal Status
        </p>

        {/* Headline */}
        <h1
          className="text-5xl md:text-6xl font-black leading-tight tracking-tight mb-6"
          style={{ fontFamily: "'Playfair Display', serif", color: "#f2ede4" }}
        >
          Online Application
          <br />
          Submission{" "}
          <em className="italic" style={{ color: "#b43c1e" }}>
            Closed
          </em>
        </h1>

        {/* Status badge */}
        <div
          className="inline-flex items-center gap-2 rounded px-4 py-2 mb-8"
          style={{
            border: "1px solid rgba(180,60,30,0.3)",
            background: "rgba(180,60,30,0.06)",
          }}
        >
          <span
            className="w-[7px] h-[7px] rounded-full animate-pulse"
            style={{ background: "#b43c1e" }}
          />
          <span
            className="text-[10.5px] tracking-[0.18em] uppercase"
            style={{ color: "rgba(180,60,30,0.85)" }}
          >
            Submissions not accepted
          </span>
        </div>

        {/* Divider */}
        <div
          className="w-12 h-[1.5px] mb-7 mx-auto"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(180,60,30,0.6), transparent)",
          }}
        />

        {/* Body */}
        <p
          className="text-[13.5px] leading-relaxed max-w-md mx-auto mb-10"
          style={{ color: "rgba(242,237,228,0.45)" }}
        >
          The online application window has officially closed. No further
          submissions are being accepted at this time. Please check back for
          future announcements or contact the relevant office for assistance.
        </p>

        {/* Meta row */}
        <div className="flex items-center justify-center gap-8">
          {[
            { label: "Status", value: "Closed" },
            { label: "New applications", value: "Not accepted" },
            { label: "Inquiries", value: "it@aaasassam.in" },
          ].map((item, i, arr) => (
            <div key={item.label} className="flex items-center gap-8">
              <div className="flex flex-col items-center gap-1.5">
                <span
                  className="text-[10px] tracking-[0.2em] uppercase"
                  style={{ color: "rgba(242,237,228,0.25)" }}
                >
                  {item.label}
                </span>
                <span
                  className="text-[12.5px]"
                  style={{ color: "rgba(242,237,228,0.55)" }}
                >
                  {item.value}
                </span>
              </div>
              {i < arr.length - 1 && (
                <div
                  className="w-px h-9"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
