import Link from "next/link";
import { Sparkles, Shield, CheckCircle2, Zap } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="space-y-4 md:col-span-2">
          <div className="flex items-center gap-2 font-bold text-xl text-white">
            <Sparkles className="w-5 h-5 text-brand-400" />
            <span>CareerApply.AI</span>
          </div>
          <p className="text-sm text-slate-400 max-w-md leading-relaxed">
            Empowering students and job seekers to land top campus placements and corporate roles with tailored CVs, cover letters, application emails, LinkedIn messages, and interview prep.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Gemini AI Powered</span>
            <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5 text-blue-400" /> Razorpay Verified</span>
            <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-amber-400" /> Instant PDF Downloads</span>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-slate-200 mb-3 uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link href="/create" className="hover:text-white transition-colors">Create Application</Link></li>
            <li><Link href="/dashboard" className="hover:text-white transition-colors">My Applications</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-slate-200 mb-3 uppercase tracking-wider">Monetization</h4>
          <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-xs space-y-1">
            <div className="font-semibold text-white">₹70 / Customization</div>
            <div className="text-slate-400">Single tailored application pack with instant PDF export.</div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>© {new Date().getFullYear()} CareerApply AI. Built for students & job seekers.</p>
        <p>Asset-Light AI SaaS Model • Powered by Google Gemini & Razorpay</p>
      </div>
    </footer>
  );
}
