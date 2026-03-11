import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api, { API_URL } from "../api/axios";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; }
  body { margin: 0; font-family: 'DM Sans', sans-serif; }

  .app-wrapper {
    min-height: 100vh;
    background: #f0f4f8;
    background-image:
      radial-gradient(circle at 20% 20%, rgba(30, 64, 175, 0.06) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(16, 185, 129, 0.05) 0%, transparent 50%);
  }

  /* ── Header ─────────────────────────────────────────────────────────────── */
  .header {
    background: linear-gradient(135deg, #1e3a5f 0%, #1e40af 60%, #1d4ed8 100%);
    box-shadow: 0 4px 24px rgba(30, 58, 95, 0.3);
    position: sticky; top: 0; z-index: 100;
  }

  .header-inner {
    max-width: 1100px; margin: 0 auto; padding: 0 2rem; height: 72px;
    display: flex; align-items: center; justify-content: space-between;
  }

  .header-brand { display: flex; align-items: center; gap: 14px; }

  .header-icon {
    width: 40px; height: 40px; background: rgba(255,255,255,0.15);
    border-radius: 10px; display: flex; align-items: center; justify-content: center;
    backdrop-filter: blur(4px);
  }

  .header-title {
    font-family: 'Playfair Display', serif; font-size: 1.25rem;
    color: #fff; font-weight: 600; letter-spacing: 0.01em;
  }

  .header-subtitle {
    font-size: 0.72rem; color: rgba(255,255,255,0.6);
    letter-spacing: 0.08em; text-transform: uppercase; margin-top: 1px;
  }

  .logout-btn {
    background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.25);
    color: #fff; padding: 8px 20px; border-radius: 8px;
    font-family: 'DM Sans', sans-serif; font-size: 0.875rem; font-weight: 500;
    cursor: pointer; transition: all 0.2s ease; backdrop-filter: blur(4px);
  }

  .logout-btn:hover {
    background: rgba(239, 68, 68, 0.85); border-color: rgba(239, 68, 68, 0.9);
    transform: translateY(-1px); box-shadow: 0 4px 12px rgba(239, 68, 68, 0.35);
  }

  /* ── Page container ──────────────────────────────────────────────────────── */
  .view-container {
    max-width: 1100px; margin: 2.5rem auto 4rem; padding: 0 1.5rem;
    animation: fadeUp 0.5s ease both;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── Status banner ───────────────────────────────────────────────────────── */
  .status-banner {
    border-radius: 16px; padding: 1.25rem 2rem; margin-bottom: 1.5rem;
    display: flex; align-items: center; gap: 16px;
    box-shadow: 0 2px 12px rgba(30,58,95,0.08);
  }

  .status-banner.submitted   { background: #eff6ff; border: 1.5px solid #bfdbfe; }
  .status-banner.under_review{ background: #fefce8; border: 1.5px solid #fde047; }
  .status-banner.accepted    { background: #f0fdf4; border: 1.5px solid #86efac; }
  .status-banner.rejected    { background: #fef2f2; border: 1.5px solid #fca5a5; }

  .status-icon {
    width: 44px; height: 44px; border-radius: 12px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center; font-size: 1.3rem;
  }

  .status-banner.submitted    .status-icon { background: #dbeafe; }
  .status-banner.under_review .status-icon { background: #fef9c3; }
  .status-banner.accepted     .status-icon { background: #dcfce7; }
  .status-banner.rejected     .status-icon { background: #fee2e2; }

  .status-text { flex: 1; }

  .status-title {
    font-family: 'Playfair Display', serif; font-size: 1rem; font-weight: 600;
    margin: 0 0 2px;
  }

  .status-banner.submitted    .status-title { color: #1e3a8a; }
  .status-banner.under_review .status-title { color: #854d0e; }
  .status-banner.accepted     .status-title { color: #166534; }
  .status-banner.rejected     .status-title { color: #991b1b; }

  .status-sub { font-size: 0.8rem; color: #64748b; margin: 0; }

  .status-badge {
    font-size: 0.72rem; font-weight: 700; padding: 4px 14px;
    border-radius: 99px; letter-spacing: 0.06em; text-transform: uppercase;
  }

  .status-banner.submitted    .status-badge { background: #1e40af; color: #fff; }
  .status-banner.under_review .status-badge { background: #ca8a04; color: #fff; }
  .status-banner.accepted     .status-badge { background: #16a34a; color: #fff; }
  .status-banner.rejected     .status-badge { background: #dc2626; color: #fff; }

  /* ── Cards ───────────────────────────────────────────────────────────────── */
  .card {
    background: #fff; border-radius: 20px;
    box-shadow: 0 2px 16px rgba(30,58,95,0.07), 0 1px 4px rgba(30,58,95,0.05);
    margin-bottom: 1.5rem; overflow: hidden; transition: box-shadow 0.3s ease;
  }

  .card:hover { box-shadow: 0 8px 32px rgba(30,58,95,0.12), 0 2px 8px rgba(30,58,95,0.06); }

  .card-header {
    padding: 1.25rem 2rem; border-bottom: 1px solid #f1f5f9;
    display: flex; align-items: center; gap: 12px;
    background: linear-gradient(135deg, #f8faff 0%, #f0f7ff 100%);
  }

  .card-icon-wrap {
    width: 38px; height: 38px; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.1rem; flex-shrink: 0;
  }

  .card-title {
    font-family: 'Playfair Display', serif; font-size: 1.1rem;
    font-weight: 600; color: #1e3a5f; margin: 0;
  }

  .card-body { padding: 1.75rem 2rem; }

  /* ── Field rows ──────────────────────────────────────────────────────────── */
  .field-grid { display: grid; gap: 1.25rem; }
  .col-2 { grid-template-columns: 1fr 1fr; }
  .col-3 { grid-template-columns: 1fr 1fr 1fr; }

  @media (max-width: 640px) { .col-2, .col-3 { grid-template-columns: 1fr; } }

  .field-view { display: flex; flex-direction: column; gap: 5px; }

  .field-label {
    font-size: 0.72rem; font-weight: 700; color: #94a3b8;
    letter-spacing: 0.07em; text-transform: uppercase;
  }

  .field-value {
    font-size: 0.95rem; font-weight: 500; color: #1e293b;
    padding: 10px 14px; background: #f8faff;
    border: 1.5px solid #f1f5f9; border-radius: 10px;
    min-height: 42px; display: flex; align-items: center;
    word-break: break-word;
  }

  .field-value.empty { color: #cbd5e1; font-style: italic; font-weight: 400; }

  textarea.field-value {
    align-items: flex-start; min-height: 72px; line-height: 1.6;
  }

  /* ── Table ───────────────────────────────────────────────────────────────── */
  .data-table { width: 100%; border-collapse: collapse; font-size: 0.875rem; }

  .data-table th {
    background: linear-gradient(135deg, #1e3a5f, #1e40af); color: #fff;
    padding: 11px 14px; text-align: left; font-weight: 600;
    font-size: 0.75rem; letter-spacing: 0.05em; text-transform: uppercase;
  }

  .data-table th:first-child { border-radius: 10px 0 0 0; }
  .data-table th:last-child  { border-radius: 0 10px 0 0; }

  .data-table td {
    padding: 11px 14px; border-bottom: 1px solid #f1f5f9;
    color: #334155; font-size: 0.875rem;
  }

  .data-table tr:nth-child(even) td { background: #f8faff; }
  .data-table tr:last-child td { border-bottom: none; }

  .qual-badge {
    display: inline-flex; align-items: center;
    background: #ede9fe; color: #5b21b6;
    padding: 3px 10px; border-radius: 6px;
    font-size: 0.78rem; font-weight: 700;
  }

  .division-badge {
    display: inline-flex; align-items: center;
    background: #dcfce7; color: #166534;
    padding: 3px 10px; border-radius: 6px;
    font-size: 0.78rem; font-weight: 700;
  }

  .empty-cell { color: #cbd5e1; font-style: italic; }

  /* ── Document grid ───────────────────────────────────────────────────────── */
  .doc-grid {
    display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 1rem;
  }

  .doc-item {
    border-radius: 12px; padding: 1rem 1.25rem;
    display: flex; align-items: center; gap: 12px;
    transition: all 0.2s ease;
    text-decoration: none;
  }

  .doc-item.uploaded {
    background: #f0fdf4; border: 1.5px solid #86efac; cursor: pointer;
  }

  .doc-item.uploaded:hover {
    background: #dcfce7; border-color: #4ade80;
    transform: translateY(-2px); box-shadow: 0 4px 16px rgba(16, 185, 129, 0.15);
  }

  .doc-item.missing {
    background: #fafbff; border: 1.5px dashed #e2e8f0; cursor: default;
  }

  .doc-icon {
    width: 40px; height: 40px; border-radius: 10px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center; font-size: 1.1rem;
  }

  .doc-item.uploaded .doc-icon { background: #dcfce7; }
  .doc-item.missing  .doc-icon { background: #f1f5f9; }

  .doc-info { flex: 1; min-width: 0; }

  .doc-label {
    font-size: 0.78rem; font-weight: 700; color: #475569;
    text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 3px;
  }

  .doc-item.missing .doc-label { color: #94a3b8; }

  .doc-filename {
    font-size: 0.75rem; color: #10b981; font-weight: 500;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: block;
  }

  .doc-missing-text { font-size: 0.75rem; color: #cbd5e1; font-style: italic; }

  .doc-open-icon { color: #10b981; flex-shrink: 0; font-size: 0.85rem; }

  /* ── Skeleton loader ─────────────────────────────────────────────────────── */
  .skeleton-wrap { display: flex; flex-direction: column; gap: 1.5rem; }

  .skeleton-card {
    background: #fff; border-radius: 20px; overflow: hidden;
    box-shadow: 0 2px 16px rgba(30,58,95,0.07);
  }

  .skeleton-header { height: 68px; background: linear-gradient(135deg, #f8faff, #f0f7ff); }

  .skeleton-body { padding: 1.75rem 2rem; display: flex; flex-direction: column; gap: 12px; }

  .skeleton-line {
    height: 14px; border-radius: 8px; background: #e2e8f0;
    animation: shimmer 1.5s ease-in-out infinite;
  }

  @keyframes shimmer {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.4; }
  }

  /* ── Error state ─────────────────────────────────────────────────────────── */
  .error-state {
    text-align: center; padding: 4rem 2rem;
    background: #fff; border-radius: 20px;
    box-shadow: 0 2px 16px rgba(30,58,95,0.07);
  }

  .error-state-icon { font-size: 3rem; margin-bottom: 1rem; }
  .error-state-title { font-family: 'Playfair Display', serif; font-size: 1.25rem; color: #1e3a5f; margin-bottom: 0.5rem; }
  .error-state-sub   { font-size: 0.875rem; color: #64748b; }
`;

// ── Helpers ───────────────────────────────────────────────────────────────────

const STATUS_META = {
  submitted: {
    icon: "📋",
    label: "Submitted",
    title: "Application Submitted",
    sub: "Your application has been received and is awaiting review.",
  },
  under_review: {
    icon: "🔍",
    label: "Under Review",
    title: "Currently Under Review",
    sub: "Our team is reviewing your application. We'll update you soon.",
  },
  accepted: {
    icon: "✅",
    label: "Accepted",
    title: "Application Accepted",
    sub: "Congratulations! Your application has been accepted.",
  },
  rejected: {
    icon: "❌",
    label: "Rejected",
    title: "Application Not Shortlisted",
    sub: "Thank you for applying. Unfortunately you were not shortlisted this time.",
  },
};

const DOC_TYPES = [
  { key: "photo", label: "Passport Photo" },
  { key: "id_proof", label: "ID Proof" },
  { key: "address_proof", label: "Address Proof" },
  { key: "hslc_admit", label: "HSLC Admit Card" },
  { key: "marksheet", label: "Marksheet" },
  { key: "offer_letter", label: "Offer Letter" },
  { key: "experience_certificate", label: "Experience Certificate" },
  { key: "resume", label: "Resume / CV" },
];

function val(v) {
  return v ?? "";
}

function FieldView({ label, value, textarea }) {
  const empty = !value || value === "";
  return (
    <div className="field-view">
      <span className="field-label">{label}</span>
      {textarea ? (
        <div
          className={`field-value ${empty ? "empty" : ""}`}
          style={{ alignItems: "flex-start", minHeight: 72, lineHeight: 1.6 }}
        >
          {empty ? "—" : value}
        </div>
      ) : (
        <div className={`field-value ${empty ? "empty" : ""}`}>
          {empty ? "—" : value}
        </div>
      )}
    </div>
  );
}

function SkeletonLoader() {
  return (
    <div className="skeleton-wrap">
      {[1, 2, 3].map((i) => (
        <div className="skeleton-card" key={i}>
          <div className="skeleton-header" />
          <div className="skeleton-body">
            <div className="skeleton-line" style={{ width: "60%" }} />
            <div className="skeleton-line" style={{ width: "80%" }} />
            <div className="skeleton-line" style={{ width: "45%" }} />
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function ViewApplication() {
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const res = await api.get("/application", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        });
        setApplication(res.data.application);
      } catch (err) {
        if (err.response?.status === 404) {
          // No application yet — redirect to form
          navigate("/user-dashboard");
        } else {
          setError("Failed to load your application. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const openDocument = (docKey) => {
    fetch(`${API_URL}/application/document/${docKey}/stream`, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
      .then((res) => res.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");
        setTimeout(() => URL.revokeObjectURL(url), 10000);
      })
      .catch(() => alert("Could not open document."));
  };

  const statusMeta = STATUS_META[application?.status] ?? STATUS_META.submitted;

  // Build a map of document_type → document object for quick lookup
  const docMap = {};
  (application?.documents ?? []).forEach((d) => {
    docMap[d.document_type] = d;
  });

  return (
    <>
      <style>{styles}</style>
      <div className="app-wrapper">
        {/* HEADER */}
        <header className="header">
          <div className="header-inner">
            <div className="header-brand">
              <div className="header-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                >
                  <path d="M9 12h6M9 16h6M9 8h6M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
                </svg>
              </div>
              <div>
                <div className="header-title">Application Summary</div>
                <div className="header-subtitle">
                  Atal Amrit Abhuyan Society Recruitment
                </div>
              </div>
            </div>
            <button onClick={logout} className="logout-btn">
              Sign Out
            </button>
          </div>
        </header>

        <div className="view-container">
          {loading && <SkeletonLoader />}

          {!loading && error && (
            <div className="error-state">
              <div className="error-state-icon">⚠️</div>
              <div className="error-state-title">Something went wrong</div>
              <div className="error-state-sub">{error}</div>
            </div>
          )}

          {!loading && !error && application && (
            <>
              {/* STATUS BANNER */}
              <div className={`status-banner ${application.status}`}>
                <div className="status-icon">{statusMeta.icon}</div>
                <div className="status-text">
                  <p className="status-title">{statusMeta.title}</p>
                  <p className="status-sub">{statusMeta.sub}</p>
                </div>
                <span className="status-badge">{statusMeta.label}</span>
              </div>

              {/* PERSONAL DETAILS */}
              <div className="card">
                <div className="card-header">
                  <div
                    className="card-icon-wrap"
                    style={{ background: "#dbeafe" }}
                  >
                    👤
                  </div>
                  <h2 className="card-title">Personal Details</h2>
                </div>
                <div className="card-body">
                  <div
                    className="field-grid"
                    style={{ gridTemplateColumns: "1fr" }}
                  >
                    <FieldView
                      label="Full Name"
                      value={val(application.name)}
                    />
                  </div>
                  <div style={{ marginTop: "1.25rem" }} />
                  <div className="field-grid col-2">
                    <FieldView
                      label="Email Address"
                      value={val(application.email)}
                    />
                    <FieldView
                      label="Contact Number"
                      value={val(application.mobile)}
                    />
                  </div>
                  <div style={{ marginTop: "1.25rem" }} />
                  <div className="field-grid col-3">
                    <FieldView
                      label="Date of Birth"
                      value={
                        application.dob
                          ? new Date(application.dob).toLocaleDateString(
                              "en-IN",
                              {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                              },
                            )
                          : ""
                      }
                    />
                  </div>
                </div>
              </div>

              {/* PRESENT ADDRESS */}
              <div className="card">
                <div className="card-header">
                  <div
                    className="card-icon-wrap"
                    style={{ background: "#dcfce7" }}
                  >
                    📍
                  </div>
                  <h2 className="card-title">Present Address</h2>
                </div>
                <div className="card-body">
                  <FieldView
                    label="Street Address"
                    value={val(application.present_address)}
                    textarea
                  />
                  <div style={{ marginTop: "1.25rem" }} />
                  <div className="field-grid col-2">
                    <FieldView
                      label="District"
                      value={val(application.present_district)}
                    />
                    <FieldView
                      label="PIN Code"
                      value={val(application.present_pin)}
                    />
                  </div>
                </div>
              </div>

              {/* PERMANENT ADDRESS */}
              <div className="card">
                <div className="card-header">
                  <div
                    className="card-icon-wrap"
                    style={{ background: "#fef9c3" }}
                  >
                    🏠
                  </div>
                  <h2 className="card-title">Permanent Address</h2>
                </div>
                <div className="card-body">
                  <FieldView
                    label="Street Address"
                    value={val(application.permanent_address)}
                    textarea
                  />
                  <div style={{ marginTop: "1.25rem" }} />
                  <div className="field-grid col-2">
                    <FieldView
                      label="District"
                      value={val(application.permanent_district)}
                    />
                    <FieldView
                      label="PIN Code"
                      value={val(application.permanent_pin)}
                    />
                  </div>
                </div>
              </div>

              {/* EDUCATION */}
              <div className="card">
                <div className="card-header">
                  <div
                    className="card-icon-wrap"
                    style={{ background: "#ede9fe" }}
                  >
                    🎓
                  </div>
                  <h2 className="card-title">Education Qualifications</h2>
                </div>
                <div className="card-body" style={{ overflowX: "auto" }}>
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Qualification</th>
                        <th>Stream / Subject</th>
                        <th>University / Board</th>
                        <th>Percentage (%)</th>
                        <th>Division</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(application.educations ?? []).map((row, i) => (
                        <tr key={i}>
                          <td>
                            <span className="qual-badge">
                              {row.qualification}
                            </span>
                          </td>
                          <td>
                            {row.stream || (
                              <span className="empty-cell">—</span>
                            )}
                          </td>
                          <td>
                            {row.board || <span className="empty-cell">—</span>}
                          </td>
                          <td>
                            {row.percentage != null ? (
                              `${row.percentage}%`
                            ) : (
                              <span className="empty-cell">—</span>
                            )}
                          </td>
                          <td>
                            {row.division ? (
                              <span className="division-badge">
                                {row.division}
                              </span>
                            ) : (
                              <span className="empty-cell">—</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* EXPERIENCE */}
              <div className="card">
                <div className="card-header">
                  <div
                    className="card-icon-wrap"
                    style={{ background: "#ffedd5" }}
                  >
                    💼
                  </div>
                  <h2 className="card-title">Professional Experience</h2>
                </div>
                <div className="card-body" style={{ overflowX: "auto" }}>
                  {(application.experiences ?? []).length === 0 ? (
                    <p
                      style={{
                        color: "#94a3b8",
                        fontSize: "0.875rem",
                        margin: 0,
                      }}
                    >
                      No experience records submitted.
                    </p>
                  ) : (
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Organisation</th>
                          <th>Designation</th>
                          <th>From</th>
                          <th>To</th>
                          <th>Years</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(application.experiences ?? []).map((row, i) => (
                          <tr key={i}>
                            <td style={{ fontWeight: 600 }}>
                              {row.organization}
                            </td>
                            <td>{row.designation}</td>
                            <td>
                              {row.from_date
                                ? new Date(row.from_date).toLocaleDateString(
                                    "en-IN",
                                    {
                                      day: "2-digit",
                                      month: "short",
                                      year: "numeric",
                                    },
                                  )
                                : "—"}
                            </td>
                            <td>
                              {row.to_date ? (
                                new Date(row.to_date).toLocaleDateString(
                                  "en-IN",
                                  {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  },
                                )
                              ) : (
                                <span
                                  style={{ color: "#10b981", fontWeight: 600 }}
                                >
                                  Present
                                </span>
                              )}
                            </td>
                            <td>
                              {row.years != null
                                ? `${row.years} yr${row.years !== 1 ? "s" : ""}`
                                : "—"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>

              {/* HEALTH INSURANCE */}
              <div className="card">
                <div className="card-header">
                  <div
                    className="card-icon-wrap"
                    style={{ background: "#fce7f3" }}
                  >
                    🏥
                  </div>
                  <h2 className="card-title">Health Insurance Experience</h2>
                </div>
                <div className="card-body">
                  <div className="field-grid col-2">
                    <FieldView
                      label="Experience in Health Insurance Scheme"
                      value={
                        application.health_insurance_experience === "yes"
                          ? "Yes, I have experience"
                          : application.health_insurance_experience === "no"
                            ? "No"
                            : ""
                      }
                    />
                    <FieldView
                      label="Years of Experience"
                      value={
                        application.health_experience_years != null
                          ? `${application.health_experience_years} years`
                          : ""
                      }
                    />
                  </div>
                </div>
              </div>

              {/* DOCUMENTS */}
              <div className="card">
                <div className="card-header">
                  <div
                    className="card-icon-wrap"
                    style={{ background: "#e0f2fe" }}
                  >
                    📎
                  </div>
                  <h2 className="card-title">Uploaded Documents</h2>
                </div>
                <div className="card-body">
                  <div className="doc-grid">
                    {DOC_TYPES.map(({ key, label }) => {
                      const doc = docMap[key];
                      return doc ? (
                        <div
                          key={key}
                          className="doc-item uploaded"
                          onClick={() => openDocument(key)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) =>
                            e.key === "Enter" && openDocument(key)
                          }
                        >
                          <div className="doc-icon">📄</div>
                          <div className="doc-info">
                            <span className="doc-label">{label}</span>
                            <span className="doc-filename">
                              {doc.original_name}
                            </span>
                          </div>
                          <span className="doc-open-icon">↗</span>
                        </div>
                      ) : (
                        <div key={key} className="doc-item missing">
                          <div className="doc-icon" style={{ opacity: 0.4 }}>
                            📄
                          </div>
                          <div className="doc-info">
                            <span className="doc-label">{label}</span>
                            <span className="doc-missing-text">
                              Not uploaded
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
