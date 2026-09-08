"use client";

import Link from "next/link";
import { Sparkles, FileText, LayoutDashboard } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-white group">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 text-white shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <span>CareerApply<span className="text-brand-400">.AI</span></span>
        </Link>

        <nav className="flex items-center gap-4 sm:gap-6">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>My Applications</span>
          </Link>
          <Link
            href="/create"
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 rounded-lg shadow-md shadow-brand-600/30 transition-all hover:shadow-lg hover:shadow-brand-500/40 hover:-translate-y-0.5"
          >
            <FileText className="w-4 h-4" />
            <span>Create Application</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
