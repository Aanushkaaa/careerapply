import Link from "next/link";
import { Sparkles, Shield, CheckCircle2, Zap } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white/80 backdrop-blur-md text-slate-600 border-t border-pink-100 py-12 px-4 sm:px-6 lg:px-8 mt-12 shadow-sm">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="space-y-4 md:col-span-2">
          <div className="flex items-center gap-2 font-bold text-xl text-slate-900">
            <Sparkles className="w-5 h-5 text-pink-500" />
            <span>CareerApply.AI</span>
          </div>
          <p className="text-sm text-slate-500 max-w-md leading-relaxed">
            Empowering students and job seekers to land top campus placements and corporate roles with tailored CVs, cover letters, application emails, LinkedIn messages, and interview prep.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Gemini AI Powered</span>
            <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5 text-purple-500" /> Razorpay Verified</span>
            <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-amber-500" /> Instant PDF Downloads</span>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-slate-800 mb-3 uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-pink-600 transition-colors">Home</Link></li>
            <li><Link href="/create" className="hover:text-pink-600 transition-colors">Create Application</Link></li>
            <li><Link href="/dashboard" className="hover:text-pink-600 transition-colors">My Applications</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-slate-800 mb-3 uppercase tracking-wider">Monetization</h4>
          <div className="p-3 bg-pink-50/50 rounded-2xl border border-pink-100 text-xs space-y-1">
            <div className="font-semibold text-purple-900">₹70 / Customization</div>
            <div className="text-slate-500">Single tailored application pack with instant PDF export.</div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-pink-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
        <p>© {new Date().getFullYear()} CareerApply AI. Built for students & job seekers.</p>
        <p>Asset-Light AI SaaS Model • Powered by Google Gemini & Razorpay</p>
      </div>
    </footer>
  );
}
