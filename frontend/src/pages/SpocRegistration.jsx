import { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

export default function SpocRegistration() {
  const [form, setForm] = useState({
    name: "", age: "", email: "", phone: "", institution: "", password: "", pdf: null
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleFile = (e) => setForm({ ...form, pdf: e.target.files[0] });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null) data.append(key, value);
    });

    try {
      const res = await api.post("/api/auth/register-spoc", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(res.data.message);
      setForm({ name: "", age: "", email: "", phone: "", institution: "", password: "", pdf: null });
      // Clear file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = "";
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-4rem)] bg-slate-50 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full bg-white p-8 md:p-10 rounded-xl shadow-lg border border-slate-200"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-slate-900">
            SPOC Registration
          </h2>
          <p className="mt-2 text-slate-600">
            Register as a Single Point of Contact for your institution
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Input
              label="Full Name *"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <Input
              label="Age *"
              name="age"
              type="number"
              value={form.age}
              onChange={handleChange}
              required
            />

            <Input
              label="Email *"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <Input
              label="Phone Number *"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
            />

            <div className="md:col-span-2">
              <Input
                label="Institution Name *"
                name="institution"
                value={form.institution}
                onChange={handleChange}
                required
              />
            </div>

            <div className="md:col-span-2">
              <Input
                label="Password *"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Upload Identification Proof *
              </label>
              <p className="text-xs text-slate-500 mb-2">
                Upload any valid ID proof (Aadhaar, PAN, Passport, Driving License, etc.)
              </p>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-lg hover:border-blue-500 transition-colors">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-slate-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-slate-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        accept="application/pdf,image/*,.doc,.docx"
                        className="sr-only"
                        onChange={handleFile}
                        required
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-slate-500">PDF, JPG, PNG, DOC up to 10MB</p>
                </div>
              </div>
              {form.pdf && (
                <div className="mt-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">
                        {form.pdf.type.includes('pdf') ? '📄' :
                          form.pdf.type.includes('image') ? '🖼️' : '📎'}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-green-900">{form.pdf.name}</p>
                        <p className="text-xs text-green-600">
                          {(form.pdf.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          const url = URL.createObjectURL(form.pdf);
                          window.open(url, '_blank');
                        }}
                        className="px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        👁️ View
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setForm({ ...form, pdf: null });
                          const fileInput = document.querySelector('input[type="file"]');
                          if (fileInput) fileInput.value = "";
                        }}
                        className="px-3 py-1.5 bg-red-100 text-red-700 text-sm font-medium rounded-lg hover:bg-red-200 transition-colors"
                      >
                        ✕ Remove
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full mt-6"
            size="lg"
            isLoading={loading}
          >
            {loading ? "Registering..." : "Register as SPOC"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
