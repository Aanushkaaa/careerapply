"use client";

import { StudentProfile } from "@/types";
import { User, GraduationCap, Briefcase, Award, Sparkles, Code2, FolderKanban } from "lucide-react";

interface StepStudentDetailsProps {
  profile: StudentProfile;
  onChange: (updated: StudentProfile) => void;
  onNext: () => void;
}

export function StepStudentDetails({ profile, onChange, onNext }: StepStudentDetailsProps) {
  const handleChange = (field: keyof StudentProfile, value: string) => {
    onChange({ ...profile, [field]: value });
  };

  const loadSampleProfile = () => {
    onChange({
      name: "Deeksha Pathak",
      email: "deeksha.pathak@example.com",
      education: "Indian Institute of Management / Top B-School",
      degree: "MBA in Strategy & Business Analytics",
      skills: "Strategic Planning, Business Analysis, Financial Modeling, Advanced Excel, Market Research, Client Presentation, Communication",
      experience: "Management Consulting Trainee at Praxis Strategy Group — Conducted market opportunity sizing, competitor benchmarking, and client deck preparation.\nBusiness Development Intern — Built automated financial dashboards in Excel and conducted quantitative customer survey analysis.",
      projects: "Strategic Market Entry Plan for FinTech Startup\nBusiness Process Optimization Audit & Workflow Redesign",
      achievements: "Winner of National B-School Strategy Case Competition 2024\nDean's Academic Merit List Recipient (Top 5% Rank)",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile.name || !profile.degree) {
      alert("Please fill in at least your Name and Degree.");
      return;
    }
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <User className="w-6 h-6 text-brand-400" />
            Screen 2 — Student Details
          </h2>
          <p className="text-sm text-slate-400">
            Tell us about your background. The AI uses this genuine data without inventing false qualifications.
          </p>
        </div>
        <button
          type="button"
          onClick={loadSampleProfile}
          className="self-start sm:self-auto px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-brand-300 border border-brand-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Load Sample Profile (MBA Strategy & Analytics)
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={profile.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="e.g. Deeksha Pathak"
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={profile.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="e.g. deeksha@example.com"
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-brand-400" /> Education / College
            </label>
            <input
              type="text"
              value={profile.education}
              onChange={(e) => handleChange("education", e.target.value)}
              placeholder="e.g. Indian Institute of Management / Symbiosis"
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-brand-400" /> Degree & Specialization *
            </label>
            <input
              type="text"
              required
              value={profile.degree}
              onChange={(e) => handleChange("degree", e.target.value)}
              placeholder="e.g. MBA Strategy & Consulting / Business Analytics"
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Code2 className="w-4 h-4 text-brand-400" /> Key Skills (Comma separated)
          </label>
          <input
            type="text"
            value={profile.skills}
            onChange={(e) => handleChange("skills", e.target.value)}
            placeholder="e.g. Strategic Planning, Business Analysis, Advanced Excel, Financial Modeling, Communication"
            className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Briefcase className="w-4 h-4 text-brand-400" /> Work Experience & Internships
          </label>
          <textarea
            rows={3}
            value={profile.experience}
            onChange={(e) => handleChange("experience", e.target.value)}
            placeholder="Describe any past internships, part-time work, or corporate training..."
            className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors text-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <FolderKanban className="w-4 h-4 text-brand-400" /> Major Projects
            </label>
            <textarea
              rows={3}
              value={profile.projects}
              onChange={(e) => handleChange("projects", e.target.value)}
              placeholder="Academic or B-school projects..."
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-brand-400" /> Achievements & Awards
            </label>
            <textarea
              rows={3}
              value={profile.achievements}
              onChange={(e) => handleChange("achievements", e.target.value)}
              placeholder="Case competition winner, Dean's List, certifications..."
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors text-sm"
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="px-8 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 shadow-lg shadow-brand-600/30 transition-all hover:shadow-brand-500/40 hover:-translate-y-0.5"
          >
            Next: Job Description →
          </button>
        </div>
      </form>
    </div>
  );
}
