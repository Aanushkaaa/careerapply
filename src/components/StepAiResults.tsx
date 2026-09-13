"use client";

import { useState } from "react";
import { StudentProfile, JobDescription, GeneratedApplication } from "@/types";
import {
  FileCheck2,
  Download,
  Copy,
  Check,
  Mail,
  Linkedin,
  HelpCircle,
  Sparkles,
  RefreshCw,
  LayoutDashboard,
} from "lucide-react";
import { CvTemplate } from "./CvTemplate";
import { exportElementToPdf } from "@/lib/pdf";
import Link from "next/link";

interface StepAiResultsProps {
  profile: StudentProfile;
  job: JobDescription;
  results: GeneratedApplication;
  onReset: () => void;
}

export function StepAiResults({ profile, job, results, onReset }: StepAiResultsProps) {
  const [activeTab, setActiveTab] = useState<"cv" | "coverLetter" | "email" | "linkedin" | "qa">("cv");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleDownloadCv = async () => {
    setDownloading(true);
    await exportElementToPdf("cv-pdf-container", `${profile.name.replace(/\s+/g, "_")}_Tailored_CV.pdf`);
    setDownloading(false);
  };

  const handleDownloadCoverLetter = async () => {
    setDownloading(true);
    await exportElementToPdf("cover-letter-pdf-container", `${profile.name.replace(/\s+/g, "_")}_Cover_Letter.pdf`);
    setDownloading(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-pink-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" /> AI Materials Generated Successfully
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Screen 5 — AI Results</h2>
          <p className="text-sm text-slate-500">
            Tailored specifically for <span className="text-pink-600 font-semibold">{job.roleTitle || "Target Role"}</span> at <span className="text-purple-600 font-semibold">{job.companyName || "Target Company"}</span>.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onReset}
            className="px-4 py-2 rounded-xl bg-pink-50 hover:bg-pink-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 text-pink-500" /> Start New Application
          </button>
          <Link
            href="/dashboard"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md shadow-pink-500/20"
          >
            <LayoutDashboard className="w-3.5 h-3.5" /> My Saved Applications
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-pink-100 scrollbar-none">
        {results.cv && (
          <button
            onClick={() => setActiveTab("cv")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === "cv"
                ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md shadow-pink-500/20"
                : "bg-white text-slate-600 hover:text-slate-900 border border-pink-100"
            }`}
          >
            <FileCheck2 className="w-4 h-4" /> Tailored CV
          </button>
        )}

        {results.coverLetter && (
          <button
            onClick={() => setActiveTab("coverLetter")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === "coverLetter"
                ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md shadow-pink-500/20"
                : "bg-white text-slate-600 hover:text-slate-900 border border-pink-100"
            }`}
          >
            <FileCheck2 className="w-4 h-4" /> Cover Letter
          </button>
        )}

        {results.applicationEmail && (
          <button
            onClick={() => setActiveTab("email")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === "email"
                ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md shadow-pink-500/20"
                : "bg-white text-slate-600 hover:text-slate-900 border border-pink-100"
            }`}
          >
            <Mail className="w-4 h-4" /> Application Email
          </button>
        )}

        {results.linkedinMessage && (
          <button
            onClick={() => setActiveTab("linkedin")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === "linkedin"
                ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md shadow-pink-500/20"
                : "bg-white text-slate-600 hover:text-slate-900 border border-pink-100"
            }`}
          >
            <Linkedin className="w-4 h-4" /> LinkedIn Note
          </button>
        )}

        {results.interviewQuestions && (
          <button
            onClick={() => setActiveTab("qa")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === "qa"
                ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md shadow-pink-500/20"
                : "bg-white text-slate-600 hover:text-slate-900 border border-pink-100"
            }`}
          >
            <HelpCircle className="w-4 h-4" /> Interview Prep ({results.interviewQuestions.length} Qs)
          </button>
        )}
      </div>

      {/* Tab Content */}
      <div className="pt-2">
        {/* CV TAB */}
        {activeTab === "cv" && results.cv && (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-pink-100 shadow-sm">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Formatted Tailored CV</h3>
                <p className="text-xs text-slate-500">Ready to download as clean PDF or copy details.</p>
              </div>
              <button
                onClick={handleDownloadCv}
                disabled={downloading}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-emerald-600/20 transition-all disabled:opacity-50 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                {downloading ? "Exporting PDF..." : "Download CV (PDF)"}
              </button>
            </div>

            <CvTemplate
              profile={profile}
              cvData={results.cv}
              companyName={job.companyName}
              roleTitle={job.roleTitle}
            />
          </div>
        )}

        {/* COVER LETTER TAB */}
        {activeTab === "coverLetter" && results.coverLetter && (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-pink-100 shadow-sm">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Customized Cover Letter</h3>
                <p className="text-xs text-slate-500">Download as PDF or copy text directly.</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(results.coverLetter || "", "coverLetter")}
                  className="px-4 py-2.5 rounded-xl bg-pink-50 hover:bg-pink-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  {copiedKey === "coverLetter" ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  {copiedKey === "coverLetter" ? "Copied!" : "Copy Text"}
                </button>
                <button
                  onClick={handleDownloadCoverLetter}
                  disabled={downloading}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-emerald-600/20 transition-all disabled:opacity-50 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  {downloading ? "Exporting PDF..." : "Download Cover Letter (PDF)"}
                </button>
              </div>
            </div>

            <div
              id="cover-letter-pdf-container"
              className="bg-white text-slate-900 p-8 md:p-10 rounded-2xl shadow-md max-w-4xl mx-auto whitespace-pre-wrap leading-relaxed font-sans text-sm border border-pink-100"
            >
              {results.coverLetter}
            </div>
          </div>
        )}

        {/* EMAIL TAB */}
        {activeTab === "email" && results.applicationEmail && (
          <div className="space-y-4 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-2xl border border-pink-100 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-pink-100">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Subject Line</span>
                <button
                  onClick={() => handleCopy(results.applicationEmail?.subject || "", "emailSubject")}
                  className="text-xs text-pink-600 hover:underline flex items-center gap-1 cursor-pointer font-medium"
                >
                  {copiedKey === "emailSubject" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedKey === "emailSubject" ? "Copied" : "Copy Subject"}
                </button>
              </div>
              <div className="text-sm font-semibold text-slate-900 bg-pink-50/50 p-3.5 rounded-xl border border-pink-100">
                {results.applicationEmail.subject}
              </div>

              <div className="flex items-center justify-between pt-2 pb-3 border-b border-pink-100">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Email Body</span>
                <button
                  onClick={() => handleCopy(results.applicationEmail?.body || "", "emailBody")}
                  className="text-xs text-pink-600 hover:underline flex items-center gap-1 cursor-pointer font-medium"
                >
                  {copiedKey === "emailBody" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedKey === "emailBody" ? "Copied" : "Copy Email Body"}
                </button>
              </div>
              <div className="text-sm text-slate-800 bg-pink-50/30 p-5 rounded-xl border border-pink-100 whitespace-pre-wrap leading-relaxed font-sans">
                {results.applicationEmail.body}
              </div>
            </div>
          </div>
        )}

        {/* LINKEDIN TAB */}
        {activeTab === "linkedin" && results.linkedinMessage && (
          <div className="space-y-4 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-2xl border border-pink-100 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Linkedin className="w-5 h-5 text-purple-600" />
                  <h3 className="text-sm font-bold text-slate-900">Outreach / Connection Note</h3>
                </div>
                <button
                  onClick={() => handleCopy(results.linkedinMessage || "", "linkedin")}
                  className="px-4 py-2 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-700 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  {copiedKey === "linkedin" ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  {copiedKey === "linkedin" ? "Copied!" : "Copy LinkedIn Note"}
                </button>
              </div>
              <div className="text-sm text-slate-800 bg-pink-50/30 p-5 rounded-xl border border-pink-100 whitespace-pre-wrap leading-relaxed">
                {results.linkedinMessage}
              </div>
            </div>
          </div>
        )}

        {/* INTERVIEW QUESTIONS TAB */}
        {activeTab === "qa" && results.interviewQuestions && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Role-Specific Interview Preparation</h3>
                <p className="text-xs text-slate-500">
                  {results.interviewQuestions.length} tailored interview questions with word-for-word STAR sample answers.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {results.interviewQuestions.map((qa, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-pink-100 space-y-4 shadow-sm">
                  <div className="flex items-start justify-between gap-4">
                    <div className="text-sm font-bold text-slate-900 flex items-start gap-3">
                      <span className="px-2.5 py-1 rounded-lg bg-pink-100 text-pink-700 border border-pink-200 text-xs font-black shrink-0">
                        Q{idx + 1} of {results.interviewQuestions?.length}
                      </span>
                      <span className="text-base text-slate-900 leading-snug">{qa.question}</span>
                    </div>

                    <button
                      onClick={() => handleCopy(qa.suggestedAnswer, `answer_${idx}`)}
                      className="px-3 py-1.5 rounded-lg bg-pink-50 hover:bg-pink-100 text-pink-700 text-xs font-semibold flex items-center gap-1 shrink-0 transition-all cursor-pointer"
                    >
                      {copiedKey === `answer_${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedKey === `answer_${idx}` ? "Copied" : "Copy Answer"}
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-pink-50/40 border border-pink-100 space-y-2">
                    <div className="font-semibold text-purple-700 uppercase tracking-wider text-[11px]">
                      Word-for-Word Sample Answer (STAR Method):
                    </div>
                    <div className="text-xs text-slate-800 leading-relaxed font-sans whitespace-pre-wrap">
                      "{qa.suggestedAnswer}"
                    </div>
                  </div>

                  {qa.tip && (
                    <div className="text-xs text-purple-800 bg-purple-50 p-3.5 rounded-xl border border-purple-100 flex items-start gap-2">
                      <span className="shrink-0 text-base">💡</span>
                      <div>
                        <span className="font-bold text-purple-900">Recruiter Insight:</span> {qa.tip}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
