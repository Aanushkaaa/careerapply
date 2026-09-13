"use client";

import { useEffect, useState } from "react";
import { ApplicationRecord } from "@/types";
import { getApplicationRecords } from "@/lib/supabase";
import { StepAiResults } from "@/components/StepAiResults";
import {
  LayoutDashboard,
  Building2,
  Calendar,
  CheckCircle2,
  FileText,
  PlusCircle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const [records, setRecords] = useState<ApplicationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecord, setSelectedRecord] = useState<ApplicationRecord | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        // 1. Fetch from server/Supabase
        const apiRecords = await getApplicationRecords();

        // 2. Fetch directly from browser localStorage
        let localRecords: ApplicationRecord[] = [];
        if (typeof window !== "undefined") {
          try {
            const raw = localStorage.getItem("careerapply_applications");
            if (raw) localRecords = JSON.parse(raw);
          } catch (e) {
            console.error("Dashboard local storage read error:", e);
          }
        }

        // 3. Merge and deduplicate by id
        const combined = [...localRecords, ...apiRecords];
        const uniqueMap = new Map<string, ApplicationRecord>();
        combined.forEach((rec) => {
          if (rec && rec.id) uniqueMap.set(rec.id, rec);
        });

        const sorted = Array.from(uniqueMap.values()).sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setRecords(sorted);
      } catch (e) {
        console.error("Dashboard load error:", e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="space-y-8 py-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-pink-100">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <LayoutDashboard className="w-6 h-6 text-pink-500" />
            My Applications
          </h1>
          <p className="text-sm text-slate-500">
            View and manage all your past job-tailored AI application packs saved in your history.
          </p>
        </div>

        <Link
          href="/create"
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 hover:from-pink-600 hover:to-purple-700 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-pink-500/20 transition-all self-start sm:self-auto cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" /> Create New Application (₹70)
        </Link>
      </div>

      {/* Selected Record Detail View */}
      {selectedRecord ? (
        <div className="space-y-4">
          <button
            onClick={() => setSelectedRecord(null)}
            className="text-xs font-semibold text-pink-600 hover:underline flex items-center gap-1 cursor-pointer"
          >
            ← Back to All Applications List
          </button>
          <StepAiResults
            profile={selectedRecord.profile}
            job={selectedRecord.job}
            results={selectedRecord.result}
            onReset={() => setSelectedRecord(null)}
          />
        </div>
      ) : (
        /* Applications List */
        <div>
          {loading ? (
            <div className="p-12 text-center text-slate-500 text-sm">
              Loading your saved applications...
            </div>
          ) : records.length === 0 ? (
            <div className="p-12 rounded-3xl bg-white border border-pink-100 text-center space-y-4 max-w-lg mx-auto shadow-sm">
              <FileText className="w-12 h-12 text-pink-300 mx-auto" />
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900">No Applications Created Yet</h3>
                <p className="text-xs text-slate-500">
                  Create your first tailored CV, Cover Letter, and Application email pack in 2 minutes.
                </p>
              </div>
              <Link
                href="/create"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-xs font-bold transition-all shadow-md shadow-pink-500/20"
              >
                <span>Create Application</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {records.map((rec) => (
                <div
                  key={rec.id}
                  onClick={() => setSelectedRecord(rec)}
                  className="p-5 rounded-2xl bg-white border border-pink-100 hover:border-pink-300 cursor-pointer transition-all space-y-4 group shadow-sm hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-pink-600">
                        {rec.targetRole || "Business Analyst Intern"}
                      </span>
                      <h3 className="font-bold text-slate-900 text-base flex items-center gap-1.5 mt-0.5">
                        <Building2 className="w-4 h-4 text-purple-500" />
                        {rec.companyName || "Target Company"}
                      </h3>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Paid ₹70
                    </span>
                  </div>

                  <div className="text-xs text-slate-500 space-y-1">
                    <div>Applicant: <span className="text-slate-800 font-medium">{rec.studentName}</span></div>
                    <div className="flex items-center gap-1 text-[11px] text-slate-400">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {new Date(rec.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-pink-100 flex items-center justify-between text-xs font-semibold text-pink-600 group-hover:text-purple-600">
                    <span>View AI Generated Materials</span>
                    <span>→</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
