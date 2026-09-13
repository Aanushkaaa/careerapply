"use client";

import { useState } from "react";
import {
  StudentProfile,
  JobDescription,
  SelectedOutputs,
  GeneratedApplication,
  ApplicationRecord,
} from "@/types";
import { StepStudentDetails } from "@/components/StepStudentDetails";
import { StepJobDescription } from "@/components/StepJobDescription";
import { StepOutputSelection } from "@/components/StepOutputSelection";
import { StepAiResults } from "@/components/StepAiResults";
import { Loader2, CheckCircle2 } from "lucide-react";

export default function CreatePage() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  const [profile, setProfile] = useState<StudentProfile>({
    name: "",
    email: "",
    education: "",
    degree: "",
    skills: "",
    experience: "",
    projects: "",
    achievements: "",
  });

  const [job, setJob] = useState<JobDescription>({
    companyName: "",
    roleTitle: "",
    text: "",
  });

  const [outputs, setOutputs] = useState<SelectedOutputs>({
    tailoredCv: true,
    coverLetter: true,
    applicationEmail: true,
    linkedinMessage: true,
    interviewQuestions: true,
  });

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<GeneratedApplication | null>(null);

  const handlePaymentSuccessAndGenerate = async (paymentId: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile, job, outputs }),
      });

      const data = await res.json();
      if (!data.success || !data.data) {
        throw new Error(data.error || "Generation failed");
      }

      const generatedData: GeneratedApplication = data.data;
      setResults(generatedData);

      // Save application record to Supabase & localStorage
      const record: ApplicationRecord = {
        id: `app_${Date.now()}`,
        createdAt: new Date().toISOString(),
        studentName: profile.name,
        targetRole: job.roleTitle || "Target Role",
        companyName: job.companyName || "Target Company",
        profile,
        job,
        outputs,
        result: generatedData,
        paid: true,
        paymentId,
      };

      // Save application record directly to browser localStorage
      try {
        const STORAGE_KEY = "careerapply_applications";
        const existing = localStorage.getItem(STORAGE_KEY);
        const list: ApplicationRecord[] = existing ? JSON.parse(existing) : [];
        list.unshift(record);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      } catch (e) {
        console.error("Client localStorage save error:", e);
      }

      // Sync application record to backend API
      await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
      }).catch((e) => console.error("Save application API error:", e));

      setStep(4);
    } catch (error) {
      console.error("AI Generation error:", error);
      alert("Something went wrong while generating materials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetAll = () => {
    setStep(1);
    setResults(null);
  };

  return (
    <div className="max-w-4xl mx-auto py-4 space-y-8">
      {/* Progress Bar */}
      <div className="bg-white p-4 rounded-2xl border border-pink-100 shadow-sm">
        <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-2">
          <span className={step >= 1 ? "text-pink-600 font-extrabold" : ""}>1. Details</span>
          <span className={step >= 2 ? "text-pink-600 font-extrabold" : ""}>2. Job Description</span>
          <span className={step >= 3 ? "text-pink-600 font-extrabold" : ""}>3. Choose Output & Pay</span>
          <span className={step >= 4 ? "text-pink-600 font-extrabold" : ""}>4. AI Results</span>
        </div>

        <div className="w-full h-2 bg-pink-50 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="p-12 rounded-3xl bg-white border border-pink-100 text-center space-y-4 shadow-xl">
          <Loader2 className="w-12 h-12 text-pink-500 animate-spin mx-auto" />
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-slate-900">Gemini AI is analyzing your profile...</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              Synthesizing genuine experiences, aligning keywords, and crafting customized materials.
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs text-emerald-600 pt-2 font-medium">
            <CheckCircle2 className="w-4 h-4" /> Razorpay Payment Verified
          </div>
        </div>
      )}

      {/* Step Components */}
      {!loading && (
        <>
          {step === 1 && (
            <StepStudentDetails
              profile={profile}
              onChange={setProfile}
              onNext={() => setStep(2)}
            />
          )}

          {step === 2 && (
            <StepJobDescription
              job={job}
              onChange={setJob}
              onNext={() => setStep(3)}
              onBack={() => setStep(1)}
            />
          )}

          {step === 3 && (
            <StepOutputSelection
              outputs={outputs}
              profile={profile}
              onChange={setOutputs}
              onPaymentSuccess={handlePaymentSuccessAndGenerate}
              onBack={() => setStep(2)}
            />
          )}

          {step === 4 && results && (
            <StepAiResults
              profile={profile}
              job={job}
              results={results}
              onReset={resetAll}
            />
          )}
        </>
      )}
    </div>
  );
}
