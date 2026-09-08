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
- Bachelor's or Master's degree in Business, Law, Strategy, Management or related fields.
- Key skills required: Advanced Excel, data analysis, structured research, presentation drafting, communication, legal/compliance awareness.
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-brand-400" />
            Screen 3 — Job Description
          </h2>
          <p className="text-sm text-slate-400">
            Paste the target job description. The AI will cross-analyze requirements with your student profile.
          </p>
        </div>
        <button
          type="button"
          onClick={loadSampleJob}
          className="self-start sm:self-auto px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-brand-300 border border-brand-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Load Sample JD (Business Analyst Intern)
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-brand-400" /> Company Name (Optional)
            </label>
            <input
              type="text"
              value={job.companyName || ""}
              onChange={(e) => handleChange("companyName", e.target.value)}
              placeholder="e.g. Deloitte, McKinsey, Google, Tata"
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-brand-400" /> Role Title (Optional)
            </label>
            <input
              type="text"
              value={job.roleTitle || ""}
              onChange={(e) => handleChange("roleTitle", e.target.value)}
              placeholder="e.g. Business Analyst Intern / Legal Associate"
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Paste Job Description *
          </label>
          <textarea
            required
            rows={8}
            value={job.text}
            onChange={(e) => handleChange("text", e.target.value)}
            placeholder="Paste the full job posting, responsibilities, requirements, and desired skills here..."
            className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors text-sm font-mono leading-relaxed"
          />
        </div>

        <div className="pt-4 flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-3 rounded-xl font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 transition-all flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          <button
            type="submit"
            className="px-8 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 shadow-lg shadow-brand-600/30 transition-all hover:shadow-brand-500/40 hover:-translate-y-0.5"
          >
            Next: Select Outputs →
          </button>
        </div>
      </form>
    </div>
  );
}
