"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { SelectedOutputs, StudentProfile } from "@/types";
import { CheckSquare, FileCheck2, Mail, Linkedin, HelpCircle, ArrowLeft, ShieldCheck, Zap } from "lucide-react";
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
  const searchParams = useSearchParams();
  const initialPlan = searchParams.get("plan");

  const [selectedPlan, setSelectedPlan] = useState<"single" | "monthly" | "pro">("single");

  useEffect(() => {
    if (initialPlan === "monthly") setSelectedPlan("monthly");
    else if (initialPlan === "pro") setSelectedPlan("pro");
    else setSelectedPlan("single");
  }, [initialPlan]);

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

  const planDetails = {
    single: { amount: 70, label: "Single Customization", desc: "1x Custom Job Application Pack" },
    monthly: { amount: 99, label: "Student Monthly", desc: "10x Applications / Month" },
    pro: { amount: 199, label: "Placement Pro", desc: "Unlimited Applications / Month" },
  };

  const currentPlan = planDetails[selectedPlan];

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-pink-100">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <CheckSquare className="w-6 h-6 text-pink-500" />
          Screen 4 — Choose Output & Select Plan
        </h2>
        <p className="text-sm text-slate-500">
          Select what AI application materials you want generated, choose your plan, and unlock.
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
              className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 select-none ${
                checked
                  ? "bg-pink-50/70 border-pink-300 text-slate-900 shadow-sm"
                  : "bg-white border-pink-100 text-slate-600 hover:border-pink-200"
              }`}
            >
              <div
                className={`mt-0.5 w-5 h-5 rounded-lg flex items-center justify-center border text-xs font-bold transition-colors ${
                  checked
                    ? "bg-gradient-to-tr from-pink-500 to-purple-600 border-pink-400 text-white"
                    : "border-slate-300 bg-slate-50 text-transparent"
                }`}
              >
                ✓
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 font-semibold text-slate-900">
                  <Icon className="w-4 h-4 text-purple-600" />
                  <span>{item.label}</span>
                </div>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {countSelected === 0 && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs text-center font-medium">
          ⚠️ Please select at least one output option to proceed.
        </div>
      )}

      {/* Plan Selection Options */}
      <div className="space-y-3 pt-2">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
          <Zap className="w-4 h-4 text-pink-500" />
          Select Pricing Plan:
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { id: "single" as const, title: "Single Plan", price: "₹70", desc: "1 Custom Application" },
            { id: "monthly" as const, title: "Student Monthly", price: "₹99", desc: "10 Applications/mo" },
            { id: "pro" as const, title: "Placement Pro", price: "₹199", desc: "Unlimited Applications" },
          ].map((p) => (
            <div
              key={p.id}
              onClick={() => setSelectedPlan(p.id)}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                selectedPlan === p.id
                  ? "bg-pink-50 border-pink-400 ring-2 ring-pink-400/30 text-slate-900 shadow-sm"
                  : "bg-white border-pink-100 text-slate-600 hover:border-pink-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">{p.title}</span>
                <span className="text-sm font-black text-purple-600">{p.price}</span>
              </div>
              <span className="text-[11px] text-slate-500 mt-1">{p.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Razorpay Payment Card */}
      <div className="p-6 rounded-2xl bg-white border border-pink-100 space-y-4 shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              {currentPlan.label}
            </h3>
            <p className="text-xs text-slate-500">{currentPlan.desc}</p>
          </div>
          <span className="px-3.5 py-1 rounded-full bg-pink-100 text-pink-700 text-sm font-extrabold">
            ₹{currentPlan.amount}
          </span>
        </div>

        <RazorpayButton
          amountInRupees={currentPlan.amount}
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
        <div className="pt-2 border-t border-pink-100 text-center">
          <button
            type="button"
            onClick={() => {
              if (countSelected === 0) {
                alert("Please select at least one output option.");
                return;
              }
              onPaymentSuccess(`demo_eval_${Date.now()}`);
            }}
            className="w-full py-3 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>⚡ Faculty / Demo Mode: Skip Payment & Generate Instantly</span>
          </button>
        </div>
      </div>

      <div className="pt-2 flex justify-start">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 rounded-xl font-semibold text-slate-700 bg-pink-50 hover:bg-pink-100 transition-all flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      </div>
    </div>
  );
}
