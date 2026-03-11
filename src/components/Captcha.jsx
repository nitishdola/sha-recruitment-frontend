import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Captcha({ onChange }) {
  const [captchaImg, setCaptchaImg] = useState("");
  const [captchaKey, setCaptchaKey] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");

  const loadCaptcha = async () => {
    const res = await api.get("/captcha");

    setCaptchaImg(res.data.image);
    setCaptchaKey(res.data.key);
    setCaptchaInput("");

    onChange("", res.data.key);
  };

  useEffect(() => {
    loadCaptcha();
  }, []);

  const handleChange = (e) => {
    const val = e.target.value;
    setCaptchaInput(val);
    onChange(val, captchaKey);
  };

  return (
    <div className="space-y-2 bg-gray-50 p-4 rounded-xl border">
      <div className="flex items-center justify-between text-sm font-medium">
        <span>Verification</span>
        <button onClick={loadCaptcha} className="text-orange-600 text-sm">
          Refresh
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div
          className="bg-white border rounded-lg h-14 flex items-center justify-center px-3"
          dangerouslySetInnerHTML={{ __html: captchaImg }}
        />

        <button
          onClick={loadCaptcha}
          className="w-12 h-12 border rounded-lg flex items-center justify-center"
        >
          ↻
        </button>
      </div>

      <input
        type="text"
        placeholder="Enter captcha"
        value={captchaInput}
        onChange={handleChange}
        className="w-full border rounded-lg px-4 py-2"
      />
    </div>
  );
}
