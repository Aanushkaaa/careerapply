"use client";

import Link from "next/link";
import { Sparkles, FileText, LayoutDashboard } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-pink-100/80 text-slate-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900 group">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-pink-500 to-purple-600 text-white shadow-md shadow-pink-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <span>CareerApply<span className="text-pink-600 font-extrabold">.AI</span></span>
        </Link>

        <nav className="flex items-center gap-4 sm:gap-6">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-pink-600 transition-colors"
          >
            <LayoutDashboard className="w-4 h-4 text-purple-500" />
            <span>My Applications</span>
          </Link>
          <Link
            href="/create"
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 hover:from-pink-600 hover:to-purple-700 rounded-xl shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-0.5"
          >
            <FileText className="w-4 h-4" />
            <span>Create Application</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
