import { useState } from "react";
import api from "../api";

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

  .header {
    background: linear-gradient(135deg, #1e3a5f 0%, #1e40af 60%, #1d4ed8 100%);
    box-shadow: 0 4px 24px rgba(30, 58, 95, 0.3);
    position: sticky; top: 0; z-index: 100;
  }

  .header-inner {
    max-width: 1100px; margin: 0 auto; padding: 0 2rem; height: 80px;
    display: flex; align-items: center; justify-content: space-between;
  }

  .header-brand { display: flex; align-items: center; gap: 14px; }

  .header-icon {
    width: 44px; height: 44px; background: rgba(255,255,255,0.15);
    border-radius: 12px; display: flex; align-items: center; justify-content: center;
    backdrop-filter: blur(4px);
  }

  .header-title {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #fff; font-weight: 700; letter-spacing: 0.01em;
    line-height: 1.3;
  }

  .header-role {
    display: inline-block;
    background: linear-gradient(135deg, #fbbf24, #f59e0b);
    color: #1e3a5f;
    font-size: 0.75rem;
    font-weight: 700;
    padding: 4px 12px;
    border-radius: 30px;
    margin-left: 12px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    box-shadow: 0 2px 8px rgba(245, 158, 11, 0.4);
    border: 1px solid rgba(255,255,255,0.3);
    vertical-align: middle;
  }

  .header-subtitle {
    font-size: 0.72rem; color: rgba(255,255,255,0.6);
    letter-spacing: 0.08em; text-transform: uppercase; margin-top: 2px;
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

  .form-container {
    max-width: 1100px; margin: 2.5rem auto 4rem; padding: 0 1.5rem;
    animation: fadeUp 0.5s ease both;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .post-banner {
    background: linear-gradient(135deg, #ffffff 0%, #f8faff 100%);
    border-radius: 10px 1px 10px 10px;
    padding: 1rem 2rem 0.5rem 2rem;
    margin-bottom: 0;
    border-bottom: 2px solid #e2e8f0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 -2px 12px rgba(30,58,95,0.04);
  }

  .post-banner-left {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .post-icon {
    width: 36px;
    height: 36px;
    background: linear-gradient(135deg, #1e40af, #1e3a5f);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.1rem;
    box-shadow: 0 4px 10px rgba(30, 64, 175, 0.2);
  }

  .post-label {
    font-size: 0.7rem;
    font-weight: 600;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 2px;
  }

  .post-name-large {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: #1e3a5f;
    line-height: 1.2;
    background: linear-gradient(135deg, #1e3a5f, #1e40af);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .post-badge {
    background: linear-gradient(135deg, #fbbf24, #f59e0b);
    color: #1e3a5f;
    font-size: 0.8rem;
    font-weight: 700;
    padding: 6px 16px;
    border-radius: 30px;
    letter-spacing: 0.06em;
    box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
    border: 1px solid rgba(255,255,255,0.4);
    white-space: nowrap;
  }

  .progress-bar-wrap {
    background: #fff; border-radius: 10px; padding: 1.25rem 2rem;
    margin-bottom: 1.5rem; box-shadow: 0 2px 12px rgba(30,58,95,0.08);
    display: flex; align-items: center; gap: 1rem;
  }

  .progress-label {
    font-size: 0.8rem; font-weight: 600; color: #64748b;
    white-space: nowrap; text-transform: uppercase; letter-spacing: 0.06em;
  }

  .progress-track { flex: 1; height: 6px; background: #e2e8f0; border-radius: 99px; overflow: hidden; }

  .progress-fill {
    height: 100%; background: linear-gradient(90deg, #1e40af, #06b6d4);
    border-radius: 99px; transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .progress-pct { font-size: 0.85rem; font-weight: 700; color: #1e40af; min-width: 38px; text-align: right; }

  /* ── Error Panel ──────────────────────────────────────────────────────────── */

  .error-panel {
    background: #fff;
    border: 1.5px solid #fca5a5;
    border-radius: 16px;
    margin-bottom: 1.25rem;
    overflow: hidden;
    box-shadow: 0 4px 24px rgba(239, 68, 68, 0.1);
    animation: errorSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both;
  }

  @keyframes errorSlideIn {
    from { opacity: 0; transform: translateY(16px) scale(0.98); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  .error-panel-header {
    background: linear-gradient(135deg, #fef2f2 0%, #fff5f5 100%);
    border-bottom: 1px solid #fecaca;
    padding: 1rem 1.5rem;
    display: flex; align-items: center; gap: 12px;
  }

  .error-panel-icon {
    width: 36px; height: 36px; background: #fee2e2; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; font-size: 1rem;
  }

  .error-panel-title {
    font-family: 'Playfair Display', serif;
    font-size: 1rem; font-weight: 600; color: #991b1b; margin: 0; flex: 1;
  }

  .error-panel-count {
    background: #ef4444; color: #fff;
    font-size: 0.72rem; font-weight: 700;
    padding: 3px 10px; border-radius: 99px; letter-spacing: 0.04em;
    white-space: nowrap;
  }

  .error-panel-body { padding: 1.25rem 1.5rem 1.5rem; }

  .error-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }

  .error-item {
    display: flex; align-items: flex-start; gap: 10px;
    font-size: 0.875rem; color: #7f1d1d; line-height: 1.55;
    padding: 8px 12px; background: #fef2f2; border-radius: 8px;
    border-left: 3px solid #f87171;
  }

  .error-bullet {
    width: 20px; height: 20px; background: #fee2e2; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.65rem; color: #ef4444; font-weight: 900;
    flex-shrink: 0; margin-top: 1px;
  }

  .error-dismiss {
    margin-top: 1rem;
    background: none; border: 1.5px solid #fca5a5; color: #ef4444;
    padding: 7px 18px; border-radius: 8px;
    font-family: 'DM Sans', sans-serif; font-size: 0.8rem; font-weight: 600;
    cursor: pointer; transition: all 0.2s ease;
    display: inline-flex; align-items: center; gap: 6px;
  }

  .error-dismiss:hover { background: #ef4444; color: #fff; border-color: #ef4444; }

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

  .card-title { font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; font-size: 1.1rem; font-weight: 600; color: #1e3a5f; margin: 0; }

  .card-body { padding: 1.75rem 2rem; }

  .field-grid { display: grid; gap: 1.25rem; }
  .col-2 { grid-template-columns: 1fr 1fr; }
  .col-3 { grid-template-columns: 1fr 1fr 1fr; }

  @media (max-width: 640px) { .col-2, .col-3 { grid-template-columns: 1fr; } }

  .field-group { display: flex; flex-direction: column; gap: 6px; }

  .field-label { font-size: 0.78rem; font-weight: 600; color: #475569; letter-spacing: 0.04em; text-transform: uppercase; }
  .field-required { color: #ef4444; margin-left: 2px; }

  .field-input {
    border: 1.5px solid #e2e8f0; border-radius: 10px; padding: 11px 14px;
    font-family: 'DM Sans', sans-serif; font-size: 0.92rem; color: #1e293b;
    background: #fafbff; transition: all 0.2s ease; outline: none; width: 100%;
  }

  .field-input:focus { border-color: #1e40af; background: #fff; box-shadow: 0 0 0 4px rgba(30, 64, 175, 0.08); }
  .field-input::placeholder { color: #94a3b8; }
  select.field-input { cursor: pointer; }
  textarea.field-input { resize: vertical; min-height: 80px; }

  .data-table { width: 100%; border-collapse: collapse; font-size: 0.875rem; }

  .data-table th {
    background: linear-gradient(135deg, #1e3a5f, #1e40af); color: #fff;
    padding: 11px 12px; text-align: left; font-weight: 600;
    font-size: 0.75rem; letter-spacing: 0.05em; text-transform: uppercase;
  }

  .data-table th:first-child { border-radius: 10px 0 0 0; }
  .data-table th:last-child  { border-radius: 0 10px 0 0; }
  .data-table td { padding: 0; border-bottom: 1px solid #f1f5f9; }
  .data-table tr:nth-child(even) td { background: #f8faff; }
  .data-table tr:last-child td { border-bottom: none; }

  .qual-cell {
    padding: 10px 12px; font-weight: 600; color: #334155;
    white-space: nowrap; background: #f8faff !important; border-right: 2px solid #e2e8f0;
  }

  .table-input {
    width: 100%; border: none; padding: 10px 12px;
    font-family: 'DM Sans', sans-serif; font-size: 0.875rem;
    background: transparent; color: #1e293b; outline: none; transition: background 0.2s;
  }

  .table-input:focus { background: #eff6ff; box-shadow: inset 0 0 0 2px #1e40af; }

  .upload-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1rem; }

  .upload-item {
    border: 2px dashed #cbd5e1; border-radius: 12px; padding: 1rem 1.25rem;
    transition: all 0.25s ease; cursor: pointer; background: #fafbff; position: relative;
  }

  .upload-item:hover {
    border-color: #1e40af; background: #eff6ff;
    transform: translateY(-2px); box-shadow: 0 4px 16px rgba(30, 64, 175, 0.1);
  }

  .upload-item.has-file { border-color: #10b981; border-style: solid; background: #f0fdf4; }
  .upload-label-text { font-size: 0.8rem; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px; display: block; }
  .upload-desc { font-size: 0.78rem; color: #94a3b8; margin-bottom: 10px; display: block; }
  .upload-trigger { display: flex; align-items: center; gap: 8px; font-size: 0.82rem; color: #1e40af; font-weight: 600; }

  .upload-icon {
    width: 28px; height: 28px; background: #dbeafe; border-radius: 8px;
    display: flex; align-items: center; justify-content: center; font-size: 0.9rem; flex-shrink: 0;
  }

  .upload-item.has-file .upload-icon { background: #d1fae5; }
  .upload-filename { font-size: 0.75rem; color: #10b981; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 150px; }
  .hidden-file { position: absolute; inset: 0; opacity: 0; cursor: pointer; width: 100%; height: 100%; }

  .add-row-btn {
    margin-top: 1rem; display: inline-flex; align-items: center; gap: 8px;
    background: #eff6ff; border: 1.5px solid #bfdbfe; color: #1e40af;
    padding: 9px 18px; border-radius: 9px; font-family: 'DM Sans', sans-serif;
    font-size: 0.875rem; font-weight: 600; cursor: pointer; transition: all 0.2s ease;
  }

  .add-row-btn:hover {
    background: #1e40af; color: #fff; border-color: #1e40af;
    transform: translateY(-1px); box-shadow: 0 4px 12px rgba(30, 64, 175, 0.25);
  }

  .submit-wrap { display: flex; justify-content: flex-end; padding: 0.5rem 0; }

  .submit-btn {
    background: linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%);
    color: #fff; border: none; padding: 14px 40px; border-radius: 12px;
    font-family: 'DM Sans', sans-serif; font-size: 1rem; font-weight: 600;
    cursor: pointer; transition: all 0.25s ease; display: flex; align-items: center;
    gap: 10px; box-shadow: 0 4px 16px rgba(30, 64, 175, 0.3); letter-spacing: 0.01em;
  }

  .submit-btn:hover:not(:disabled) {
    transform: translateY(-2px); box-shadow: 0 8px 28px rgba(30, 64, 175, 0.4);
    background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
  }

  .submit-btn:active { transform: translateY(0); }
  .submit-btn:disabled { opacity: 0.75; cursor: not-allowed; }

  .submit-loader {
    position: fixed; inset: 0; z-index: 99999;
    background: linear-gradient(135deg, #1e3a5f 0%, #1e40af 60%, #1d4ed8 100%);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 2rem; animation: loaderFadeIn 0.25s ease both;
  }

  @keyframes loaderFadeIn { from { opacity: 0; } to { opacity: 1; } }

  .submit-loader-icon {
    width: 80px; height: 80px; background: rgba(255,255,255,0.12);
    border-radius: 22px; border: 1px solid rgba(255,255,255,0.2);
    display: flex; align-items: center; justify-content: center;
    backdrop-filter: blur(4px); animation: iconPulse 1.8s ease-in-out infinite;
  }

  @keyframes iconPulse {
    0%, 100% { transform: scale(1);    box-shadow: 0 0 0 0   rgba(255,255,255,0.15); }
    50%       { transform: scale(1.07); box-shadow: 0 0 0 16px rgba(255,255,255,0);   }
  }

  .submit-loader-rings { position: relative; width: 72px; height: 72px; }

  .submit-loader-ring { position: absolute; inset: 0; border-radius: 50%; border: 3px solid transparent; }

  .ring-outer { border-top-color: rgba(255,255,255,0.9); border-right-color: rgba(255,255,255,0.2); animation: spinCW 0.85s linear infinite; }
  .ring-inner { inset: 11px; border-bottom-color: rgba(255,255,255,0.6); border-left-color: rgba(255,255,255,0.1); animation: spinCCW 0.65s linear infinite; }

  @keyframes spinCW  { to { transform: rotate(360deg);  } }
  @keyframes spinCCW { to { transform: rotate(-360deg); } }

  .submit-loader-text { font-family: 'DM Sans', sans-serif; font-size: 1.05rem; font-weight: 600; color: rgba(255,255,255,0.92); letter-spacing: 0.02em; }

  .submit-loader-dots span { display: inline-block; animation: dotBounce 1.4s ease-in-out infinite; opacity: 0; }
  .submit-loader-dots span:nth-child(1) { animation-delay: 0s;   }
  .submit-loader-dots span:nth-child(2) { animation-delay: 0.2s; }
  .submit-loader-dots span:nth-child(3) { animation-delay: 0.4s; }

  @keyframes dotBounce {
    0%, 80%, 100% { opacity: 0; transform: translateY(0);   }
    40%           { opacity: 1; transform: translateY(-5px); }
  }

  .submit-loader-sub {
    font-family: 'DM Sans', sans-serif; font-size: 0.75rem; color: rgba(255,255,255,0.4);
    letter-spacing: 0.1em; text-transform: uppercase; margin-top: -1.25rem;
  }

  .toast {
    position: fixed; bottom: 2rem; right: 2rem;
    background: linear-gradient(135deg, #065f46, #10b981);
    color: #fff; padding: 14px 24px; border-radius: 12px;
    font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 0.9rem;
    box-shadow: 0 8px 32px rgba(16, 185, 129, 0.35); z-index: 9999;
    display: flex; align-items: center; gap: 10px;
    animation: slideIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both;
  }

  @keyframes slideIn {
    from { opacity: 0; transform: translateX(80px); }
    to   { opacity: 1; transform: translateX(0); }
  }
`;

// ── Error parser ──────────────────────────────────────────────────────────────
// Handles Laravel validation shape: { errors: { field: ["msg",...] } }
// and plain: { message: "..." }
function parseErrors(err) {
  const data = err?.response?.data;
  if (!data) return ["Something went wrong. Please try again."];
  if (data.errors && typeof data.errors === "object") {
    return Object.values(data.errors).flat();
  }
  if (data.message) return [data.message];
  return ["Submission failed. Please try again."];
}

// ── Sub-components ────────────────────────────────────────────────────────────

function FieldGroup({ label, required, children }) {
  return (
    <div className="field-group">
      <label className="field-label">
        {label}
        {required && <span className="field-required">*</span>}
      </label>
      {children}
    </div>
  );
}

function UploadItem({ name, label, description, files, onChange }) {
  const hasFile = !!files[name];
  return (
    <div className={`upload-item ${hasFile ? "has-file" : ""}`}>
      <span className="upload-label-text">{label}</span>
      <span className="upload-desc">{description}</span>
      <div className="upload-trigger">
        <div className="upload-icon">{hasFile ? "✓" : "↑"}</div>
        {hasFile ? (
          <span className="upload-filename">{files[name]?.name}</span>
        ) : (
          <span>Choose file</span>
        )}
      </div>
      <input
        type="file"
        name={name}
        className="hidden-file"
        onChange={onChange}
        accept=".pdf,.jpg,.jpeg,.png"
      />
    </div>
  );
}

function ErrorPanel({ errors, onDismiss }) {
  if (!errors || errors.length === 0) return null;
  return (
    <div className="error-panel">
      <div className="error-panel-header">
        <div className="error-panel-icon">⚠</div>
        <h3 className="error-panel-title">Please fix the following errors</h3>
        <span className="error-panel-count">
          {errors.length} {errors.length === 1 ? "error" : "errors"}
        </span>
      </div>
      <div className="error-panel-body">
        <ul className="error-list">
          {errors.map((msg, i) => (
            <li key={i} className="error-item">
              <span className="error-bullet">✕</span>
              <span>{msg}</span>
            </li>
          ))}
        </ul>
        <button className="error-dismiss" onClick={onDismiss}>
          ✕ &nbsp;Dismiss
        </button>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function UserDashboard() {
  const [form, setForm] = useState({
    applied_for: "",
    name: "",
    email: "",
    mobile: "",
    dob: "",
    present_address: "",
    present_district: "",
    present_pin: "",
    permanent_address: "",
    permanent_district: "",
    permanent_pin: "",
    health_insurance_experience: "",
    health_experience_years: "",
  });

  const [education, setEducation] = useState([
    {
      qualification: "HSLC (10th)",
      stream: "",
      board: "",
      percentage: "",
      division: "",
    },
    {
      qualification: "HS (10+2)",
      stream: "",
      board: "",
      percentage: "",
      division: "",
    },
    {
      qualification: "Graduation",
      stream: "",
      board: "",
      percentage: "",
      division: "",
    },
    {
      qualification: "Others",
      stream: "",
      board: "",
      percentage: "",
      division: "",
    },
  ]);

  const [experience, setExperience] = useState([
    { organization: "", designation: "", from: "", to: "", years: "" },
  ]);

  const [files, setFiles] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState([]);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const updateEducation = (index, field, value) => {
    const updated = [...education];
    updated[index][field] = value;
    setEducation(updated);
  };

  const updateExperience = (index, field, value) => {
    const updated = [...experience];
    updated[index][field] = value;
    setExperience(updated);
  };

  const addExperienceRow = () =>
    setExperience([
      ...experience,
      { organization: "", designation: "", from: "", to: "", years: "" },
    ]);

  const handleFile = (e) =>
    setFiles({ ...files, [e.target.name]: e.target.files[0] });

  const filledFields = Object.values(form).filter((v) => v !== "").length;
  const fileCount = Object.keys(files).length;
  const progress = Math.round(
    ((filledFields + fileCount) / (Object.keys(form).length + 8)) * 100,
  );

  const submitForm = async (e) => {
    e.preventDefault();
    setErrors([]);

    try {
      setSubmitting(true);

      const data = new FormData();
      Object.keys(form).forEach((key) => data.append(key, form[key]));
      data.append("education", JSON.stringify(education));
      data.append("experience", JSON.stringify(experience));
      Object.keys(files).forEach((key) => data.append(key, files[key]));

      await api.post("/submit-application", data, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });

      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000);
    } catch (err) {
      const parsed = parseErrors(err);
      setErrors(parsed);
      // Scroll to error panel
      setTimeout(() => {
        document
          .getElementById("error-anchor")
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 80);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="app-wrapper">
        <header className="header">
          <div className="header-inner">
            <div className="header-brand">
              <div className="header-icon">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                >
                  <path d="M9 12h6M9 16h6M9 8h6M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
                </svg>
              </div>
              <div>
                <div className="header-title">
                  Online Application Form
                  <p className="text-sm text-gray-200">
                    For any issues, please mail to it@aaasassam.in
                  </p>
                  {/* <span className="header-role">Solution Architect</span> */}
                </div>
                {/* <div className="header-subtitle">
                  Apply for Solution Architect Online
                </div> */}
              </div>
            </div>
            <button onClick={logout} className="logout-btn">
              Sign Out
            </button>
          </div>
        </header>

        <div className="form-container">
          <div className="post-banner">
            <div className="post-banner-left">
              <div className="post-icon">🎯</div>
              <div>
                <div className="post-label">Applying for</div>
                <div className="post-name-large">
                  Solution Architect, Medical Officer & District Medical Officer
                </div>
              </div>
            </div>
          </div>

          <div className="progress-bar-wrap mt-0.5">
            <span className="progress-label">Form Completion</span>
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="progress-pct">{progress}%</span>
          </div>

          <form onSubmit={submitForm}>
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
                  <FieldGroup label="Post Applied For" required>
                    <select
                      name="applied_for"
                      onChange={handleChange}
                      className="field-input"
                      value={form.handleChange}
                      required
                    >
                      <option value="">— Select Post —</option>
                      <option value="solution_architect">
                        Solution Architect
                      </option>
                      <option value="medical_officer">Medical Officer</option>
                      <option value="district_medical_officer">
                        District Medical Officer
                      </option>
                    </select>
                  </FieldGroup>
                </div>
                <div style={{ marginTop: "1.25rem" }} />

                <div
                  className="field-grid"
                  style={{ gridTemplateColumns: "1fr" }}
                >
                  <FieldGroup label="Full Name" required>
                    <input
                      name="name"
                      placeholder="Enter your full name"
                      onChange={handleChange}
                      className="field-input"
                    />
                  </FieldGroup>
                </div>
                <div style={{ marginTop: "1.25rem" }} />
                <div className="field-grid col-2">
                  <FieldGroup label="Email Address" required>
                    <input
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      onChange={handleChange}
                      className="field-input"
                    />
                  </FieldGroup>
                  <FieldGroup label="Contact Number" required>
                    <input
                      name="mobile"
                      placeholder="+91 98765 43210"
                      onChange={handleChange}
                      className="field-input"
                    />
                  </FieldGroup>
                </div>
                <div style={{ marginTop: "1.25rem" }} />
                <div className="field-grid col-3">
                  <FieldGroup label="Date of Birth" required>
                    <input
                      type="date"
                      name="dob"
                      onChange={handleChange}
                      className="field-input"
                    />
                  </FieldGroup>
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
                <div className="field-grid">
                  <FieldGroup label="Street Address">
                    <textarea
                      name="present_address"
                      placeholder="House No., Street, Locality…"
                      onChange={handleChange}
                      className="field-input"
                    />
                  </FieldGroup>
                </div>
                <div style={{ marginTop: "1.25rem" }} />
                <div className="field-grid col-2">
                  <FieldGroup label="District">
                    <input
                      name="present_district"
                      placeholder="District"
                      onChange={handleChange}
                      className="field-input"
                    />
                  </FieldGroup>
                  <FieldGroup label="PIN Code">
                    <input
                      name="present_pin"
                      placeholder="6-digit PIN"
                      onChange={handleChange}
                      className="field-input"
                    />
                  </FieldGroup>
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
                <div className="field-grid">
                  <FieldGroup label="Street Address">
                    <textarea
                      name="permanent_address"
                      placeholder="House No., Street, Locality…"
                      onChange={handleChange}
                      className="field-input"
                    />
                  </FieldGroup>
                </div>
                <div style={{ marginTop: "1.25rem" }} />
                <div className="field-grid col-2">
                  <FieldGroup label="District">
                    <input
                      name="permanent_district"
                      placeholder="District"
                      onChange={handleChange}
                      className="field-input"
                    />
                  </FieldGroup>
                  <FieldGroup label="PIN Code">
                    <input
                      name="permanent_pin"
                      placeholder="6-digit PIN"
                      onChange={handleChange}
                      className="field-input"
                    />
                  </FieldGroup>
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
                    {education.map((row, index) => (
                      <tr key={index}>
                        <td>
                          <span className="qual-cell">{row.qualification}</span>
                        </td>
                        <td>
                          <input
                            className="table-input"
                            placeholder=""
                            onChange={(e) =>
                              updateEducation(index, "stream", e.target.value)
                            }
                          />
                        </td>
                        <td>
                          <input
                            className="table-input"
                            placeholder=""
                            onChange={(e) =>
                              updateEducation(index, "board", e.target.value)
                            }
                          />
                        </td>
                        <td>
                          <input
                            className="table-input"
                            placeholder=""
                            onChange={(e) =>
                              updateEducation(
                                index,
                                "percentage",
                                e.target.value,
                              )
                            }
                          />
                        </td>
                        <td>
                          <select
                            className="table-input"
                            onChange={(e) =>
                              updateEducation(index, "division", e.target.value)
                            }
                          >
                            <option value="">—</option>
                            <option>1st</option>
                            <option>2nd</option>
                            <option>3rd</option>
                            <option>Pass</option>
                          </select>
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
                    {experience.map((row, index) => (
                      <tr key={index}>
                        <td>
                          <input
                            className="table-input"
                            placeholder="Organisation name"
                            onChange={(e) =>
                              updateExperience(
                                index,
                                "organization",
                                e.target.value,
                              )
                            }
                          />
                        </td>
                        <td>
                          <input
                            className="table-input"
                            placeholder="Your role"
                            onChange={(e) =>
                              updateExperience(
                                index,
                                "designation",
                                e.target.value,
                              )
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="date"
                            className="table-input"
                            onChange={(e) =>
                              updateExperience(index, "from", e.target.value)
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="date"
                            className="table-input"
                            onChange={(e) =>
                              updateExperience(index, "to", e.target.value)
                            }
                          />
                        </td>
                        <td>
                          <input
                            className="table-input"
                            placeholder="e.g. 2.5"
                            onChange={(e) =>
                              updateExperience(index, "years", e.target.value)
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button
                  type="button"
                  onClick={addExperienceRow}
                  className="add-row-btn"
                >
                  <span style={{ fontSize: "1.1rem", lineHeight: 1 }}>+</span>{" "}
                  Add Row
                </button>
              </div>
            </div>

            {/* HEALTH INSURANCE EXPERIENCE */}
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
                  <FieldGroup
                    label="Experience in Health Insurance Scheme"
                    required
                  >
                    <select
                      name="health_insurance_experience"
                      onChange={handleChange}
                      className="field-input"
                    >
                      <option value="">— Select —</option>
                      <option value="yes">Yes, I have experience</option>
                      <option value="no">No, I don't</option>
                    </select>
                  </FieldGroup>
                  <FieldGroup label="Years of Experience">
                    <input
                      name="health_experience_years"
                      placeholder="e.g. 3"
                      onChange={handleChange}
                      className="field-input"
                    />
                  </FieldGroup>
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
                <h2 className="card-title">Document Uploads</h2>
              </div>
              <div className="card-body">
                <p
                  style={{
                    fontSize: "0.82rem",
                    color: "#64748b",
                    marginBottom: "1.25rem",
                    marginTop: 0,
                  }}
                >
                  Upload all documents in PDF, JPG or PNG format. Maximum file
                  size: 2MB each.
                </p>
                <div className="upload-grid">
                  <UploadItem
                    name="photo"
                    label="Passport Photo"
                    description="Recent passport-size photograph"
                    files={files}
                    onChange={handleFile}
                  />
                  <UploadItem
                    name="id_proof"
                    label="ID Proof"
                    description="Aadhaar / PAN / Voter ID"
                    files={files}
                    onChange={handleFile}
                  />
                  <UploadItem
                    name="address_proof"
                    label="Address Proof"
                    description="Utility bill / Bank statement"
                    files={files}
                    onChange={handleFile}
                  />
                  <UploadItem
                    name="hslc_admit"
                    label="HSLC Admit Card"
                    description="10th class admit card"
                    files={files}
                    onChange={handleFile}
                  />
                  <UploadItem
                    name="marksheet"
                    label="Marksheet"
                    description="All academic marksheets"
                    files={files}
                    onChange={handleFile}
                  />
                  <UploadItem
                    name="offer_letter"
                    label="Offer Letter"
                    description="Latest employment offer letter"
                    files={files}
                    onChange={handleFile}
                  />
                  <UploadItem
                    name="experience_certificate"
                    label="Experience Certificate"
                    description="From previous employer(s)"
                    files={files}
                    onChange={handleFile}
                  />
                  <UploadItem
                    name="resume"
                    label="Resume / CV"
                    description="Updated curriculum vitae (pdf only)"
                    files={files}
                    onChange={handleFile}
                  />
                </div>
              </div>
            </div>

            {/* ERROR PANEL — anchored for smooth scroll */}
            <div id="error-anchor">
              <ErrorPanel errors={errors} onDismiss={() => setErrors([])} />
            </div>

            {/* SUBMIT */}
            <div className="submit-wrap">
              <button
                type="submit"
                className="submit-btn"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <div
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        border: "2.5px solid rgba(255,255,255,0.35)",
                        borderTopColor: "#fff",
                        animation: "spinCW 0.7s linear infinite",
                        flexShrink: 0,
                      }}
                    />
                    Submitting…
                  </>
                ) : (
                  <>
                    Submit Application
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* FULLSCREEN SUBMIT LOADER */}
        {submitting && (
          <div className="submit-loader">
            <div className="submit-loader-icon">
              <svg
                width="38"
                height="38"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
              >
                <path d="M9 12h6M9 16h6M9 8h6M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
              </svg>
            </div>
            <div className="submit-loader-rings">
              <div className="submit-loader-ring ring-outer" />
              <div className="submit-loader-ring ring-inner" />
            </div>
            <div className="submit-loader-text">
              Submitting application
              <span className="submit-loader-dots">
                <span>.</span>
                <span>.</span>
                <span>.</span>
              </span>
            </div>
            <div className="submit-loader-sub">
              Please do not close this page
            </div>
          </div>
        )}

        {/* SUCCESS TOAST */}
        {showToast && (
          <div className="toast">
            <span style={{ fontSize: "1.1rem" }}>✓</span>
            Application submitted successfully!
          </div>
        )}
      </div>
    </>
  );
}
