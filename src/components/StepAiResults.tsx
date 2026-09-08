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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" /> AI Materials Generated Successfully
          </div>
          <h2 className="text-2xl font-bold text-white">Screen 5 — AI Results</h2>
          <p className="text-sm text-slate-400">
            Tailored specifically for <span className="text-white font-medium">{job.roleTitle || "Target Role"}</span> at <span className="text-white font-medium">{job.companyName || "Target Company"}</span>.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onReset}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Start New Application
          </button>
          <Link
            href="/dashboard"
            className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md shadow-brand-600/30"
          >
            <LayoutDashboard className="w-3.5 h-3.5" /> My Saved Applications
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800 scrollbar-none">
        {results.cv && (
          <button
            onClick={() => setActiveTab("cv")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "cv"
                ? "bg-brand-600 text-white shadow-lg shadow-brand-600/30"
                : "bg-slate-900 text-slate-400 hover:text-white"
            }`}
          >
            <FileCheck2 className="w-4 h-4" /> Tailored CV
          </button>
        )}

        {results.coverLetter && (
          <button
            onClick={() => setActiveTab("coverLetter")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "coverLetter"
                ? "bg-brand-600 text-white shadow-lg shadow-brand-600/30"
                : "bg-slate-900 text-slate-400 hover:text-white"
            }`}
          >
            <FileCheck2 className="w-4 h-4" /> Cover Letter
          </button>
        )}

        {results.applicationEmail && (
          <button
            onClick={() => setActiveTab("email")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "email"
                ? "bg-brand-600 text-white shadow-lg shadow-brand-600/30"
                : "bg-slate-900 text-slate-400 hover:text-white"
            }`}
          >
            <Mail className="w-4 h-4" /> Application Email
          </button>
        )}

        {results.linkedinMessage && (
          <button
            onClick={() => setActiveTab("linkedin")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "linkedin"
                ? "bg-brand-600 text-white shadow-lg shadow-brand-600/30"
                : "bg-slate-900 text-slate-400 hover:text-white"
            }`}
          >
            <Linkedin className="w-4 h-4" /> LinkedIn Note
          </button>
        )}

        {results.interviewQuestions && (
          <button
            onClick={() => setActiveTab("qa")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "qa"
                ? "bg-brand-600 text-white shadow-lg shadow-brand-600/30"
                : "bg-slate-900 text-slate-400 hover:text-white"
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
            <div className="flex items-center justify-between bg-slate-900 p-4 rounded-xl border border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-white">Formatted Tailored CV</h3>
                <p className="text-xs text-slate-400">Ready to download as clean PDF or copy details.</p>
              </div>
              <button
                onClick={handleDownloadCv}
                disabled={downloading}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all disabled:opacity-50"
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
            <div className="flex items-center justify-between bg-slate-900 p-4 rounded-xl border border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-white">Customized Cover Letter</h3>
                <p className="text-xs text-slate-400">Download as PDF or copy text directly.</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(results.coverLetter || "", "coverLetter")}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  {copiedKey === "coverLetter" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  {copiedKey === "coverLetter" ? "Copied!" : "Copy Text"}
                </button>
                <button
                  onClick={handleDownloadCoverLetter}
                  disabled={downloading}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all disabled:opacity-50"
                >
                  <Download className="w-4 h-4" />
                  {downloading ? "Exporting PDF..." : "Download Cover Letter (PDF)"}
                </button>
              </div>
            </div>

            <div
              id="cover-letter-pdf-container"
              className="bg-white text-slate-900 p-8 md:p-10 rounded-xl shadow-2xl max-w-4xl mx-auto whitespace-pre-wrap leading-relaxed font-sans text-sm border border-slate-200"
            >
              {results.coverLetter}
            </div>
          </div>
        )}

        {/* EMAIL TAB */}
        {activeTab === "email" && results.applicationEmail && (
          <div className="space-y-4 max-w-4xl mx-auto">
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Subject Line</span>
                <button
                  onClick={() => handleCopy(results.applicationEmail?.subject || "", "emailSubject")}
                  className="text-xs text-brand-400 hover:underline flex items-center gap-1"
                >
                  {copiedKey === "emailSubject" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedKey === "emailSubject" ? "Copied" : "Copy Subject"}
                </button>
              </div>
              <div className="text-sm font-semibold text-white bg-slate-950 p-3 rounded-xl border border-slate-800">
                {results.applicationEmail.subject}
              </div>

              <div className="flex items-center justify-between pt-2 pb-3 border-b border-slate-800">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Body</span>
                <button
                  onClick={() => handleCopy(results.applicationEmail?.body || "", "emailBody")}
                  className="text-xs text-brand-400 hover:underline flex items-center gap-1"
                >
                  {copiedKey === "emailBody" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedKey === "emailBody" ? "Copied" : "Copy Email Body"}
                </button>
              </div>
              <div className="text-sm text-slate-200 bg-slate-950 p-5 rounded-xl border border-slate-800 whitespace-pre-wrap leading-relaxed font-sans">
                {results.applicationEmail.body}
              </div>
            </div>
          </div>
        )}

        {/* LINKEDIN TAB */}
        {activeTab === "linkedin" && results.linkedinMessage && (
          <div className="space-y-4 max-w-4xl mx-auto">
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Linkedin className="w-5 h-5 text-blue-400" />
                  <h3 className="text-sm font-bold text-white">Outreach / Connection Note</h3>
                </div>
                <button
                  onClick={() => handleCopy(results.linkedinMessage || "", "linkedin")}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-brand-300 text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  {copiedKey === "linkedin" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  {copiedKey === "linkedin" ? "Copied!" : "Copy LinkedIn Note"}
                </button>
              </div>
              <div className="text-sm text-slate-200 bg-slate-950 p-5 rounded-xl border border-slate-800 whitespace-pre-wrap leading-relaxed">
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
                <h3 className="text-lg font-bold text-white">Role-Specific Interview Preparation</h3>
                <p className="text-xs text-slate-400">
                  {results.interviewQuestions.length} tailored interview questions with word-for-word STAR sample answers.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {results.interviewQuestions.map((qa, idx) => (
                <div key={idx} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4 shadow-lg">
                  <div className="flex items-start justify-between gap-4">
                    <div className="text-sm font-bold text-white flex items-start gap-3">
                      <span className="px-2.5 py-1 rounded-lg bg-brand-500/20 text-brand-300 border border-brand-500/30 text-xs font-black shrink-0">
                        Q{idx + 1} of {results.interviewQuestions?.length}
                      </span>
                      <span className="text-base text-brand-200 leading-snug">{qa.question}</span>
                    </div>

                    <button
                      onClick={() => handleCopy(qa.suggestedAnswer, `answer_${idx}`)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1 shrink-0 transition-all"
                    >
                      {copiedKey === `answer_${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedKey === `answer_${idx}` ? "Copied" : "Copy Answer"}
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="font-semibold text-emerald-400 uppercase tracking-wider text-[11px]">
                      Word-for-Word Sample Answer (STAR Method):
                    </div>
                    <div className="text-xs text-slate-200 leading-relaxed font-sans whitespace-pre-wrap">
                      "{qa.suggestedAnswer}"
                    </div>
                  </div>

                  {qa.tip && (
                    <div className="text-xs text-amber-300/90 bg-amber-500/10 p-3 rounded-xl border border-amber-500/20 flex items-start gap-2">
                      <span className="shrink-0 text-base">💡</span>
                      <div>
                        <span className="font-bold text-amber-200">Recruiter Insight:</span> {qa.tip}
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
