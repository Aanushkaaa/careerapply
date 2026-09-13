"use client";

import { JobDescription } from "@/types";
import { FileText, Building2, Briefcase, Sparkles, ArrowLeft } from "lucide-react";

interface StepJobDescriptionProps {
  job: JobDescription;
  onChange: (updated: JobDescription) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepJobDescription({ job, onChange, onNext, onBack }: StepJobDescriptionProps) {
  const handleChange = (field: keyof JobDescription, value: string) => {
    onChange({ ...job, [field]: value });
  };

  const loadSampleJob = () => {
    onChange({
      companyName: "Deloitte / EY / KPMG",
      roleTitle: "Business Analyst Intern",
      text: `Role: Business Analyst Intern
Location: Gurgaon / Mumbai / Bengaluru
Required Qualifications:
- Bachelor's or Master's degree in Business, Strategy, Analytics, Management or related fields.
- Key skills required: Advanced Excel, data analysis, structured research, presentation drafting, communication, market benchmarking.
- Ability to analyze business requirements, review client documentation, and synthesize findings into high-impact management summaries.
- Strong problem-solving mindset with attention to detail and ability to work in fast-paced consulting environments.`,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!job.text || job.text.trim().length < 20) {
      alert("Please paste a job description (at least 20 characters).");
      return;
    }
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-pink-100">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-6 h-6 text-pink-500" />
            Screen 3 — Job Description
          </h2>
          <p className="text-sm text-slate-500">
            Paste the target job description. The AI will cross-analyze requirements with your student profile.
          </p>
        </div>
        <button
          type="button"
          onClick={loadSampleJob}
          className="self-start sm:self-auto px-3.5 py-2 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-pink-500" />
          Load Sample JD (Business Analyst Intern)
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-purple-500" /> Company Name (Optional)
            </label>
            <input
              type="text"
              value={job.companyName || ""}
              onChange={(e) => handleChange("companyName", e.target.value)}
              placeholder="e.g. Deloitte, McKinsey, Google, Tata"
              className="w-full px-4 py-3 bg-white border border-pink-100 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition-all shadow-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-purple-500" /> Role Title (Optional)
            </label>
            <input
              type="text"
              value={job.roleTitle || ""}
              onChange={(e) => handleChange("roleTitle", e.target.value)}
              placeholder="e.g. Business Analyst Intern / Strategy Associate"
              className="w-full px-4 py-3 bg-white border border-pink-100 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition-all shadow-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            Paste Job Description *
          </label>
          <textarea
            required
            rows={8}
            value={job.text}
            onChange={(e) => handleChange("text", e.target.value)}
            placeholder="Paste the full job posting, responsibilities, requirements, and desired skills here..."
            className="w-full px-4 py-3 bg-white border border-pink-100 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition-all text-sm font-sans leading-relaxed shadow-sm"
          />
        </div>

        <div className="pt-4 flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-3 rounded-xl font-semibold text-slate-700 bg-pink-50 hover:bg-pink-100 transition-all flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          <button
            type="submit"
            className="px-8 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 hover:from-pink-600 hover:to-purple-700 shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
          >
            Next: Select Outputs →
          </button>
        </div>
      </form>
    </div>
  );
}
