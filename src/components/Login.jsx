import { useState, useEffect } from "react";
import api from "../api";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .login-page {
    min-height: 100vh;
    font-family: 'DM Sans', sans-serif;
    background: #f0f4f8;
    background-image:
      radial-gradient(circle at 20% 20%, rgba(30, 64, 175, 0.08) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(16, 185, 129, 0.06) 0%, transparent 50%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
  }

  .login-card {
    width: 100%;
    max-width: 440px;
    background: #fff;
    border-radius: 24px;
    box-shadow: 0 8px 48px rgba(30, 58, 95, 0.13), 0 2px 8px rgba(30, 58, 95, 0.06);
    overflow: hidden;
    animation: fadeUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(32px) scale(0.97); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  .login-header {
    background: linear-gradient(135deg, #1e3a5f 0%, #1e40af 60%, #1d4ed8 100%);
    padding: 2rem 2rem 1.75rem;
    position: relative;
    overflow: hidden;
  }

  .login-header::before {
    content: '';
    position: absolute;
    top: -40px; right: -40px;
    width: 160px; height: 160px;
    background: rgba(255,255,255,0.05);
    border-radius: 50%;
  }

  .login-header::after {
    content: '';
    position: absolute;
    bottom: -60px; left: -20px;
    width: 200px; height: 200px;
    background: rgba(255,255,255,0.03);
    border-radius: 50%;
  }

  .login-logo {
    width: 88px; height: 88px;
    border-radius: 50%;
    margin-bottom: 1.25rem;
    border: 3px solid rgba(255,255,255,0.35);
    box-shadow: 0 0 0 6px rgba(255,255,255,0.08), 0 8px 24px rgba(0,0,0,0.25);
    overflow: hidden;
    background: #fff;
  }

  .login-logo img {
    width: 100%; height: 100%;
    object-fit: cover;
    display: block;
  }

  .login-org {
    font-size: 0.7rem;
    font-weight: 600;
    color: rgba(255,255,255,0.6);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 6px;
  }

  .login-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: #fff;
    line-height: 1.25;
    margin-bottom: 6px;
  }

  .login-subtitle {
    font-size: 0.82rem;
    color: rgba(255,255,255,0.6);
  }

  .login-body {
    padding: 2rem;
  }

  .step-indicator {
    display: flex;
    align-items: center;
    gap: 0;
    margin-bottom: 1.75rem;
  }

  .step-dot {
    width: 28px; height: 28px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.75rem;
    font-weight: 700;
    transition: all 0.3s ease;
    flex-shrink: 0;
  }

  .step-dot.active {
    background: #1e40af;
    color: #fff;
    box-shadow: 0 0 0 4px rgba(30, 64, 175, 0.15);
  }

  .step-dot.done {
    background: #10b981;
    color: #fff;
  }

  .step-dot.idle {
    background: #e2e8f0;
    color: #94a3b8;
  }

  .step-line {
    flex: 1;
    height: 2px;
    background: #e2e8f0;
    margin: 0 6px;
    transition: background 0.4s ease;
  }

  .step-line.done { background: #10b981; }

  .step-label-row {
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
    margin-bottom: 1.5rem;
  }

  .step-label {
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #94a3b8;
  }

  .step-label.active { color: #1e40af; }
  .step-label.done { color: #10b981; }

  .field-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 1.25rem;
  }

  .field-label {
    font-size: 0.78rem;
    font-weight: 600;
    color: #475569;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .input-wrap {
    position: relative;
  }

  .input-prefix {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 0.9rem;
    font-weight: 600;
    color: #64748b;
    pointer-events: none;
    border-right: 1.5px solid #e2e8f0;
    padding-right: 10px;
    line-height: 1;
  }

  .field-input {
    width: 100%;
    border: 1.5px solid #e2e8f0;
    border-radius: 12px;
    padding: 13px 14px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.95rem;
    color: #1e293b;
    background: #fafbff;
    transition: all 0.2s ease;
    outline: none;
  }

  .field-input.with-prefix {
    padding-left: 58px;
  }

  .field-input:focus {
    border-color: #1e40af;
    background: #fff;
    box-shadow: 0 0 0 4px rgba(30, 64, 175, 0.08);
  }

  .field-input:disabled {
    background: #f1f5f9;
    color: #64748b;
    cursor: not-allowed;
  }

  .field-input.otp-input {
    text-align: center;
    letter-spacing: 0.5em;
    font-size: 1.5rem;
    font-weight: 700;
    color: #1e40af;
    padding: 14px;
  }

  .field-input::placeholder { color: #cbd5e1; }

  .captcha-wrap {
    display: flex;
    justify-content: center;
    margin-bottom: 1.25rem;
    transform: scale(0.98);
  }

  .btn {
    width: 100%;
    border: none;
    border-radius: 12px;
    padding: 14px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.95rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.25s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    letter-spacing: 0.01em;
  }

  .btn-primary {
    background: linear-gradient(135deg, #1e3a5f 0%, #1e40af 60%, #1d4ed8 100%);
    color: #fff;
    box-shadow: 0 4px 16px rgba(30, 64, 175, 0.3);
  }

  .btn-primary:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(30, 64, 175, 0.4);
  }

  .btn-primary:active { transform: translateY(0); }

  .btn-primary:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .btn-verify {
    background: linear-gradient(135deg, #065f46 0%, #10b981 100%);
    color: #fff;
    box-shadow: 0 4px 16px rgba(16, 185, 129, 0.3);
    margin-bottom: 1.25rem;
  }

  .btn-verify:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(16, 185, 129, 0.4);
  }

  .spinner {
    width: 18px; height: 18px;
    border: 2.5px solid rgba(255,255,255,0.35);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    flex-shrink: 0;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  .resend-row {
    text-align: center;
    font-size: 0.85rem;
    color: #64748b;
  }

  .resend-timer {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .timer-badge {
    background: #f1f5f9;
    border-radius: 99px;
    padding: 2px 10px;
    font-weight: 700;
    color: #1e40af;
    font-size: 0.85rem;
  }

  .resend-btn {
    background: none;
    border: none;
    color: #1e40af;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.85rem;
    font-weight: 700;
    cursor: pointer;
    text-decoration: underline;
    text-underline-offset: 3px;
    padding: 0;
    transition: color 0.2s;
  }

  .resend-btn:hover { color: #1e3a8a; }

  .change-number {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 1.25rem;
    font-size: 0.82rem;
    color: #64748b;
  }

  .change-number button {
    background: none;
    border: none;
    color: #1e40af;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.82rem;
    font-weight: 600;
    cursor: pointer;
    padding: 0;
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  .sent-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
    color: #065f46;
    border-radius: 99px;
    padding: 4px 12px;
    font-size: 0.78rem;
    font-weight: 600;
    margin-bottom: 1.25rem;
  }

  .footer-note {
    text-align: center;
    font-size: 0.72rem;
    color: #94a3b8;
    margin-top: 1.5rem;
    line-height: 1.6;
  }

  .divider {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 1.25rem 0;
  }

  .divider-line {
    flex: 1;
    height: 1px;
    background: #f1f5f9;
  }

  .divider-text {
    font-size: 0.72rem;
    color: #cbd5e1;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  /* Fullscreen Loader */
  .page-loader {
    position: fixed;
    inset: 0;
    z-index: 99999;
    background: linear-gradient(135deg, #1e3a5f 0%, #1e40af 60%, #1d4ed8 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    animation: loaderFadeIn 0.2s ease both;
  }

  @keyframes loaderFadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes loaderFadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }

  .page-loader.hiding {
    animation: loaderFadeOut 0.4s ease both;
  }

  .loader-logo {
    width: 72px; height: 72px;
    background: #fff;
    border-radius: 50%;
    border: 3px solid rgba(255,255,255,0.4);
    box-shadow: 0 0 0 8px rgba(255,255,255,0.08);
    overflow: hidden;
    display: flex;              /* ← add */
    align-items: center;        /* ← add */
    justify-content: center;    /* ← add */
    animation: logoPulse 1.8s ease-in-out infinite;
}

  @keyframes logoPulse {
    0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255,255,255,0.15); }
    50% { transform: scale(1.06); box-shadow: 0 0 0 14px rgba(255,255,255,0); }
  }

  .loader-ring-wrap {
    position: relative;
    width: 64px; height: 64px;
  }

  .loader-ring {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 3px solid transparent;
  }

  .loader-ring-outer {
    border-top-color: rgba(255,255,255,0.9);
    border-right-color: rgba(255,255,255,0.2);
    animation: spinCW 0.9s linear infinite;
  }

  .loader-ring-inner {
    inset: 10px;
    border-bottom-color: rgba(255,255,255,0.6);
    border-left-color: rgba(255,255,255,0.1);
    animation: spinCCW 0.7s linear infinite;
  }

  @keyframes spinCW { to { transform: rotate(360deg); } }
  @keyframes spinCCW { to { transform: rotate(-360deg); } }

  .loader-text {
    font-family: 'DM Sans', sans-serif;
    color: rgba(255,255,255,0.9);
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    animation: textPulse 1.8s ease-in-out infinite;
  }

  .loader-dots span {
    display: inline-block;
    animation: dotBounce 1.4s ease-in-out infinite;
    opacity: 0;
  }

  .loader-dots span:nth-child(1) { animation-delay: 0s; }
  .loader-dots span:nth-child(2) { animation-delay: 0.2s; }
  .loader-dots span:nth-child(3) { animation-delay: 0.4s; }

  @keyframes dotBounce {
    0%, 80%, 100% { opacity: 0; transform: translateY(0); }
    40% { opacity: 1; transform: translateY(-4px); }
  }

  @keyframes textPulse {
    0%, 100% { opacity: 0.7; }
    50% { opacity: 1; }
  }

  .loader-subtext {
    font-family: 'DM Sans', sans-serif;
    color: rgba(255,255,255,0.45);
    font-size: 0.78rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-top: -1.25rem;
  }

  /* Toast */
  .toast {
    position: fixed;
    bottom: 2rem; right: 2rem;
    background: linear-gradient(135deg, #065f46, #10b981);
    color: #fff;
    padding: 14px 24px;
    border-radius: 12px;
    font-family: 'DM Sans', sans-serif;
    font-weight: 600;
    font-size: 0.9rem;
    box-shadow: 0 8px 32px rgba(16, 185, 129, 0.35);
    z-index: 9999;
    display: flex;
    align-items: center;
    gap: 10px;
    animation: slideIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both;
  }

  @keyframes slideIn {
    from { opacity: 0; transform: translateX(80px); }
    to { opacity: 1; transform: translateX(0); }
  }
`;

//const RECAPTCHA_SITE_KEY = "6LfYv4UsAAAAANY7tU4YKJvQpisx-Qb6Z8l2KTW5";
const RECAPTCHA_SITE_KEY = "6LcRvYUsAAAAAOCIwqauyIwn4ikHV33yXvHigCLd";

export default function Login() {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(0);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [toast, setToast] = useState("");

  console.log(RECAPTCHA_SITE_KEY);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3500);
  };

  const sendOtp = async () => {
    if (mobile.length !== 10) {
      showToast("⚠ Enter a valid 10-digit mobile number");
      return;
    }
    if (!captchaToken) {
      showToast("⚠ Please complete the reCAPTCHA");
      return;
    }
    try {
      setSendingOtp(true);
      await api.post("/send-otp", { mobile, recaptcha_token: captchaToken });
      setOtpSent(true);
      setTimer(60);
    } catch (e) {
      showToast(e.response?.data?.message || "Failed to send OTP");
    } finally {
      setSendingOtp(false);
    }
  };

  useEffect(() => {
    if (timer === 0) return;
    const iv = setInterval(() => setTimer((p) => p - 1), 1000);
    return () => clearInterval(iv);
  }, [timer]);

  useEffect(() => {
    // Already logged in — check if they have a submitted application
    const token = localStorage.getItem("token");
    if (token) redirectAfterLogin(token);
  }, []);

  /**
   * After a successful login (or on page load with existing token),
   * check whether the user already has an application:
   *   → yes  : go to /view-application
   *   → no   : go to /user-dashboard (the form)
   */
  const redirectAfterLogin = async (token) => {
    try {
      await api.get("/application", {
        headers: { Authorization: "Bearer " + token },
      });
      // 200 → application exists
      navigate("/view-application");
    } catch (e) {
      if (e.response?.status === 404) {
        // No application yet → show the form
        navigate("/user-dashboard");
      }
      // Any other error: stay on login page, token may be invalid
    }
  };

  const verifyLogin = async (e) => {
    e.preventDefault();
    if (otp.length < 4) {
      showToast("⚠ Enter the complete OTP");
      return;
    }
    try {
      setVerifying(true);
      const res = await api.post("/verify-otp", { mobile, otp });
      const token = res.data.token;
      localStorage.setItem("token", token);
      // Check application status then redirect
      await redirectAfterLogin(token);
    } catch (e) {
      setVerifying(false);
      showToast(e.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <>
      <style>{styles}</style>

      {/* FULLSCREEN LOADER */}
      {verifying && (
        <div className="page-loader">
          <div className="loader-logo">
            <img
              src="/aaas.png"
              alt="Logo"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
          <div className="loader-ring-wrap">
            <div className="loader-ring loader-ring-outer" />
            <div className="loader-ring loader-ring-inner" />
          </div>
          <div className="loader-text">
            Verifying identity
            <span className="loader-dots">
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </span>
          </div>
          <div className="loader-subtext">Please wait</div>
        </div>
      )}

      <div className="login-page">
        <div className="login-card">
          {/* HEADER */}
          <div className="login-header">
            <div className="login-logo">
              <img src="/aaas.png" alt="Atal Amrit Abhiyan Society" />
            </div>
            <div className="login-org"> Recruitment</div>
            <div className="login-title">Atal Amrit Abhiyan Society</div>
            <div className="login-subtitle">Post - Solution Architect</div>
          </div>

          {/* BODY */}
          <div className="login-body">
            {/* Step Indicator */}
            <div>
              <div className="step-indicator">
                <div className={`step-dot ${otpSent ? "done" : "active"}`}>
                  {otpSent ? "✓" : "1"}
                </div>
                <div className={`step-line ${otpSent ? "done" : ""}`} />
                <div className={`step-dot ${otpSent ? "active" : "idle"}`}>
                  2
                </div>
              </div>
              <div className="step-label-row">
                <span className={`step-label ${otpSent ? "done" : "active"}`}>
                  Mobile
                </span>
                <span className={`step-label ${otpSent ? "active" : ""}`}>
                  Verify OTP
                </span>
              </div>
            </div>

            <form onSubmit={verifyLogin}>
              {/* MOBILE */}
              <div className="field-group">
                <label className="field-label">
                  Mobile Number <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <div className="input-wrap">
                  <span className="input-prefix">+91</span>
                  <input
                    type="tel"
                    maxLength="10"
                    disabled={otpSent}
                    value={mobile}
                    onChange={(e) =>
                      setMobile(e.target.value.replace(/\D/g, ""))
                    }
                    className="field-input with-prefix"
                    placeholder="10-digit number"
                  />
                </div>
              </div>

              {/* CAPTCHA */}
              {!otpSent && (
                <div className="captcha-wrap">
                  <ReCAPTCHA
                    sitekey={RECAPTCHA_SITE_KEY}
                    onChange={(token) => setCaptchaToken(token)}
                  />
                </div>
              )}

              {/* SEND OTP */}
              {!otpSent && (
                <button
                  type="button"
                  onClick={sendOtp}
                  disabled={sendingOtp}
                  className="btn btn-primary"
                >
                  {sendingOtp && <div className="spinner" />}
                  {sendingOtp ? (
                    "Sending OTP…"
                  ) : (
                    <>
                      Send OTP
                      <svg
                        width="16"
                        height="16"
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
              )}

              {/* OTP SECTION */}
              {otpSent && (
                <>
                  <div className="sent-badge">
                    <span>✓</span> OTP sent to +91 {mobile}
                  </div>

                  <div className="change-number">
                    <span>Wrong number?</span>
                    <button
                      type="button"
                      onClick={() => {
                        setOtpSent(false);
                        setCaptchaToken(null);
                        setOtp("");
                      }}
                    >
                      Change number
                    </button>
                  </div>

                  <div className="field-group">
                    <label className="field-label">
                      Enter OTP <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <input
                      type="text"
                      maxLength="6"
                      value={otp}
                      onChange={(e) =>
                        setOtp(e.target.value.replace(/\D/g, ""))
                      }
                      placeholder="• • • •"
                      className="field-input otp-input"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-verify"
                    disabled={verifying}
                  >
                    {verifying ? (
                      <>
                        <div className="spinner" />
                        Verifying…
                      </>
                    ) : (
                      <>
                        <svg
                          width="17"
                          height="17"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                        Verify & Login
                      </>
                    )}
                  </button>

                  <div className="resend-row">
                    {timer > 0 ? (
                      <span className="resend-timer">
                        Resend OTP in{" "}
                        <span className="timer-badge">{timer}s</span>
                      </span>
                    ) : (
                      <button
                        type="button"
                        className="resend-btn"
                        onClick={() => {
                          setOtpSent(false);
                          setCaptchaToken(null);
                        }}
                      >
                        Didn't receive it? Resend OTP
                      </button>
                    )}
                  </div>
                </>
              )}
            </form>

            <p className="footer-note">
              By continuing, you agree to the terms of the
              <br />
              Atal Amrit Abhiyan Health Insurance Scheme.
            </p>
          </div>
        </div>
      </div>

      {toast && (
        <div className="toast">
          <span style={{ fontSize: "1.05rem" }}>
            {toast.startsWith("⚠") ? "⚠" : "✓"}
          </span>
          {toast.replace(/^[⚠✓]\s*/, "")}
        </div>
      )}
    </>
  );
}
