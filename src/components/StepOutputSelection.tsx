"use client";

import { SelectedOutputs, StudentProfile } from "@/types";
import { CheckSquare, FileCheck2, Mail, Linkedin, HelpCircle, ArrowLeft, ShieldCheck } from "lucide-react";
import { RazorpayButton } from "./RazorpayButton";

interface StepOutputSelectionProps {
  outputs: SelectedOutputs;
  profile: StudentProfile;
  onChange: (updated: SelectedOutputs) => void;
  onPaymentSuccess: (paymentId: string) => void;
  onBack: () => void;
}

export function StepOutputSelection({
  outputs,
  profile,
  onChange,
  onPaymentSuccess,
  onBack,
}: StepOutputSelectionProps) {
  const toggleOutput = (key: keyof SelectedOutputs) => {
    onChange({ ...outputs, [key]: !outputs[key] });
  };

  const outputList = [
    {
      key: "tailoredCv" as const,
      label: "Tailored CV",
      desc: "Reformatted bullet points emphasizing relevant skills & experiences without fabricating details.",
      icon: FileCheck2,
    },
    {
      key: "coverLetter" as const,
      label: "Cover Letter",
      desc: "Custom 3-paragraph compelling letter tailored to the company's culture and role needs.",
      icon: CheckSquare,
    },
    {
      key: "applicationEmail" as const,
      label: "Application Email",
      desc: "Ready-to-send recruiter email subject line and body with 1-click copy.",
      icon: Mail,
    },
    {
      key: "linkedinMessage" as const,
      label: "LinkedIn Connection Message",
      desc: "High-converting 300-character outreach message to hiring managers or alumni.",
      icon: Linkedin,
    },
    {
      key: "interviewQuestions" as const,
      label: "Interview Questions & STAR Answers",
      desc: "Top 8 role-specific interview questions with tailored word-for-word STAR model answers.",
      icon: HelpCircle,
    },
  ];

  const countSelected = Object.values(outputs).filter(Boolean).length;

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-800">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <CheckSquare className="w-6 h-6 text-brand-400" />
          Screen 4 — Choose Output & Unlock
        </h2>
        <p className="text-sm text-slate-400">
          Select what AI application materials you want generated, then complete the ₹70 payment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {outputList.map((item) => {
          const Icon = item.icon;
          const checked = outputs[item.key];
          return (
            <div
              key={item.key}
              onClick={() => toggleOutput(item.key)}
              className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3.5 select-none ${
                checked
                  ? "bg-brand-950/40 border-brand-500 text-white shadow-lg shadow-brand-500/10"
                  : "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700"
              }`}
            >
              <div
                className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center border text-xs font-bold transition-colors ${
                  checked
                    ? "bg-brand-500 border-brand-400 text-white"
                    : "border-slate-600 bg-slate-800 text-transparent"
                }`}
              >
                ✓
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 font-semibold text-slate-200">
                  <Icon className="w-4 h-4 text-brand-400" />
                  <span>{item.label}</span>
                </div>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {countSelected === 0 && (
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 text-xs text-center font-medium">
          ⚠️ Please select at least one output option to proceed.
        </div>
      )}

      {/* Razorpay Payment Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              Unlock Customized Application Pack
            </h3>
            <p className="text-xs text-slate-400">
              One-time charge of ₹70 for complete AI application generation & instant PDF downloads.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
            ₹70 Flat
          </span>
        </div>

        <RazorpayButton
          amountInRupees={70}
          studentName={profile.name}
          studentEmail={profile.email}
          onSuccess={(paymentId) => {
            if (countSelected === 0) {
              alert("Please select at least one output option.");
              return;
            }
            onPaymentSuccess(paymentId);
          }}
        />

        {/* Demo Mode for Faculty / Evaluation */}
        <div className="pt-2 border-t border-slate-800 text-center">
          <button
            type="button"
            onClick={() => {
              if (countSelected === 0) {
                alert("Please select at least one output option.");
                return;
              }
              onPaymentSuccess(`demo_eval_${Date.now()}`);
            }}
            className="w-full py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-brand-300 border border-brand-500/30 text-xs font-semibold flex items-center justify-center gap-2 transition-all hover:border-brand-400 cursor-pointer"
          >
            <span>⚡ Faculty / Demo Mode: Skip Payment & Generate Instantly</span>
          </button>
        </div>
      </div>

      <div className="pt-2 flex justify-start">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 rounded-xl font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 transition-all flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      </div>
    </div>
  );
}
