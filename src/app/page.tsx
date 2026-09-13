import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  FileCheck2,
  Mail,
  Linkedin,
  HelpCircle,
  Zap,
  CheckCircle2,
} from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-16 py-6">
      {/* Hero Section */}
      <section className="text-center space-y-6 max-w-4xl mx-auto pt-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/80 border border-pink-200 text-pink-700 text-xs font-bold shadow-sm">
          <Sparkles className="w-4 h-4 text-pink-500" />
          <span>AI Placement Copilot for Students</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
          Get job-ready in <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600">minutes</span>.
        </h1>

        <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
          Transform your genuine degree, skills, and projects into job-tailored CVs, cover letters, recruiter emails, LinkedIn notes, and interview prep.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/create"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-white text-base bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 hover:from-pink-600 hover:to-purple-700 shadow-xl shadow-pink-500/25 transition-all hover:scale-105 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Create My Application</span>
            <ArrowRight className="w-5 h-5" />
          </Link>

          <a
            href="#pricing"
            className="w-full sm:w-auto px-6 py-4 rounded-2xl font-semibold text-slate-700 text-base bg-white hover:bg-pink-50/50 border border-pink-200 transition-all text-center shadow-sm"
          >
            View Pricing (₹70 Customization)
          </a>
        </div>

        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 font-medium">
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> No fabricated details</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-purple-500" /> Razorpay Secured</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-pink-500" /> Instant PDF Download</span>
        </div>
      </section>

      {/* 5 Outputs Preview */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Everything you need for 1 job application</h2>
          <p className="text-slate-500 text-sm">Generated simultaneously in seconds using Google Gemini AI.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            {
              title: "Tailored CV",
              desc: "Reformatted experience & projects matching key JD keywords.",
              icon: FileCheck2,
            },
            {
              title: "Cover Letter",
              desc: "3-paragraph tailored narrative built for company context.",
              icon: FileCheck2,
            },
            {
              title: "Application Email",
              desc: "Ready-to-send recruiter email body & subject line.",
              icon: Mail,
            },
            {
              title: "LinkedIn Message",
              desc: "High-converting 300-char outreach message to alumni.",
              icon: Linkedin,
            },
            {
              title: "Interview Q&A",
              desc: "Top 8 interview questions with word-for-word STAR answers.",
              icon: HelpCircle,
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-pink-100 hover:border-pink-300 shadow-sm hover:shadow-md transition-all space-y-3 group"
              >
                <div className="p-2.5 rounded-xl bg-pink-50 text-pink-600 w-fit group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* How it works simple flow */}
      <section className="p-8 rounded-3xl bg-white/90 backdrop-blur-md border border-pink-100 space-y-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 text-center">How CareerApply AI Works</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {[
            { step: "1", title: "Enter Profile", desc: "Fill your education, degree, skills & genuine experience once." },
            { step: "2", title: "Paste Job Description", desc: "Paste the company name, role, and job description text." },
            { step: "3", title: "Pay ₹70", desc: "Complete seamless Razorpay checkout for single customization." },
            { step: "4", title: "Download Materials", desc: "Get instantly generated CV, Cover Letter, Emails & Q&A." },
          ].map((s, idx) => (
            <div key={idx} className="space-y-2 text-center relative z-10">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 text-white font-black flex items-center justify-center mx-auto text-sm shadow-md shadow-pink-500/20">
                {s.step}
              </div>
              <h3 className="font-bold text-slate-900 text-sm">{s.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="space-y-8 pt-4">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5" /> Fair & Transparent Student Pricing
          </div>
          <h2 className="text-3xl font-bold text-slate-900">Simple Monetization Model</h2>
          <p className="text-slate-500 text-sm">Pay per application customization or choose a monthly plan.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Option 1: ₹70 Single Application */}
          <div className="p-6 rounded-2xl bg-white border-2 border-pink-400 relative flex flex-col justify-between space-y-6 shadow-lg shadow-pink-500/5">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white text-[10px] font-extrabold uppercase tracking-widest">
              Most Popular
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900">Single Customization</h3>
                <p className="text-xs text-slate-500">Perfect for your dream company placement drive.</p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-slate-900">₹70</span>
                <span className="text-xs text-slate-500">/ application</span>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-600 pt-2">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> 1 Complete Tailored CV (PDF)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> 1 Tailored Cover Letter (PDF)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Application Email Body & Subject</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> LinkedIn Outreach Note</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> 8 Role-specific Word-for-Word STAR Q&As</li>
              </ul>
            </div>

            <Link
              href="/create"
              className="w-full py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-center transition-all block shadow-md shadow-pink-500/20"
            >
              Get Started for ₹70
            </Link>
          </div>

          {/* Option 2: ₹99 Student Monthly */}
          <div className="p-6 rounded-2xl bg-white border border-pink-100 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-md transition-all">
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900">Student Monthly</h3>
                <p className="text-xs text-slate-500">For ongoing campus placement season.</p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-slate-900">₹99</span>
                <span className="text-xs text-slate-500">/ month</span>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-600 pt-2">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> 10 Complete Custom Applications</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Saved Application Dashboard</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> All 5 AI Output formats</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Priority Gemini Flash Processing</li>
              </ul>
            </div>

            <Link
              href="/create"
              className="w-full py-3 rounded-xl font-semibold text-xs text-slate-700 bg-pink-50 hover:bg-pink-100 text-center transition-all block"
            >
              Select Monthly
            </Link>
          </div>

          {/* Option 3: ₹199 Placement Pro */}
          <div className="p-6 rounded-2xl bg-white border border-pink-100 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-md transition-all">
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900">Placement Pro</h3>
                <p className="text-xs text-slate-500">For intensive job hunt & multiple drives.</p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-slate-900">₹199</span>
                <span className="text-xs text-slate-500">/ month</span>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-600 pt-2">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Unlimited Applications (Fair Use)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Multiple CV Template Variations</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Advanced Mock Interview Guidance</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Direct Export & Storage</li>
              </ul>
            </div>

            <Link
              href="/create"
              className="w-full py-3 rounded-xl font-semibold text-xs text-slate-700 bg-pink-50 hover:bg-pink-100 text-center transition-all block"
            >
              Select Placement Pro
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
