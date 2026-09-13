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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-pink-100">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <User className="w-6 h-6 text-pink-500" />
            Screen 2 — Student Details
          </h2>
          <p className="text-sm text-slate-500">
            Tell us about your background. The AI uses this genuine data without inventing false qualifications.
          </p>
        </div>
        <button
          type="button"
          onClick={loadSampleProfile}
          className="self-start sm:self-auto px-3.5 py-2 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-pink-500" />
          Load Sample Profile (MBA Strategy & Analytics)
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={profile.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="e.g. Deeksha Pathak"
              className="w-full px-4 py-3 bg-white border border-pink-100 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition-all shadow-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={profile.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="e.g. deeksha@example.com"
              className="w-full px-4 py-3 bg-white border border-pink-100 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition-all shadow-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-purple-500" /> Education / College
            </label>
            <input
              type="text"
              value={profile.education}
              onChange={(e) => handleChange("education", e.target.value)}
              placeholder="e.g. Indian Institute of Management / Symbiosis"
              className="w-full px-4 py-3 bg-white border border-pink-100 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition-all shadow-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-purple-500" /> Degree & Specialization *
            </label>
            <input
              type="text"
              required
              value={profile.degree}
              onChange={(e) => handleChange("degree", e.target.value)}
              placeholder="e.g. MBA Strategy & Consulting / Business Analytics"
              className="w-full px-4 py-3 bg-white border border-pink-100 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition-all shadow-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Code2 className="w-4 h-4 text-purple-500" /> Key Skills (Comma separated)
          </label>
          <input
            type="text"
            value={profile.skills}
            onChange={(e) => handleChange("skills", e.target.value)}
            placeholder="e.g. Strategic Planning, Business Analysis, Advanced Excel, Financial Modeling, Communication"
            className="w-full px-4 py-3 bg-white border border-pink-100 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition-all shadow-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Briefcase className="w-4 h-4 text-purple-500" /> Work Experience & Internships
          </label>
          <textarea
            rows={3}
            value={profile.experience}
            onChange={(e) => handleChange("experience", e.target.value)}
            placeholder="Describe any past internships, part-time work, or corporate training..."
            className="w-full px-4 py-3 bg-white border border-pink-100 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition-all shadow-sm text-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <FolderKanban className="w-4 h-4 text-purple-500" /> Major Projects
            </label>
            <textarea
              rows={3}
              value={profile.projects}
              onChange={(e) => handleChange("projects", e.target.value)}
              placeholder="Academic or B-school projects..."
              className="w-full px-4 py-3 bg-white border border-pink-100 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition-all shadow-sm text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-purple-500" /> Achievements & Awards
            </label>
            <textarea
              rows={3}
              value={profile.achievements}
              onChange={(e) => handleChange("achievements", e.target.value)}
              placeholder="Case competition winner, Dean's List, certifications..."
              className="w-full px-4 py-3 bg-white border border-pink-100 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition-all shadow-sm text-sm"
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="px-8 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 hover:from-pink-600 hover:to-purple-700 shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
          >
            Next: Job Description →
          </button>
        </div>
      </form>
    </div>
  );
}
