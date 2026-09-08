import { createClient } from "@supabase/supabase-js";
import { ApplicationRecord } from "@/types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase =
  supabaseUrl && supabaseUrl.includes("supabase.co") && !supabaseUrl.includes("demo-project")
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

const STORAGE_KEY = "careerapply_applications";

// In-memory fallback store for server-side runtime
const serverMemoryStore: ApplicationRecord[] = [];

export async function saveApplicationRecord(record: ApplicationRecord): Promise<void> {
  // Always save to server in-memory store
  const existingIdx = serverMemoryStore.findIndex((item) => item.id === record.id);
  if (existingIdx >= 0) {
    serverMemoryStore[existingIdx] = record;
  } else {
    serverMemoryStore.unshift(record);
  }

  // 1. Save to local storage if running in browser
  if (typeof window !== "undefined") {
    try {
      const existing = localStorage.getItem(STORAGE_KEY);
      const list: ApplicationRecord[] = existing ? JSON.parse(existing) : [];
      const idx = list.findIndex((i) => i.id === record.id);
      if (idx >= 0) {
        list[idx] = record;
      } else {
        list.unshift(record);
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.error("Local storage save error:", e);
    }
  }

  // 2. Save to Supabase if configured
  if (supabase) {
    try {
      await supabase.from("applications").insert([
        {
          id: record.id,
          created_at: record.createdAt,
          student_name: record.studentName,
          target_role: record.targetRole,
          company_name: record.companyName,
          profile: record.profile,
          job: record.job,
          outputs: record.outputs,
          result: record.result,
          paid: record.paid,
          payment_id: record.paymentId,
        },
      ]);
    } catch (e) {
      console.error("Supabase insert error:", e);
    }
  }
}

export async function getApplicationRecords(): Promise<ApplicationRecord[]> {
  // 1. Try Supabase first if available
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        return data.map((item) => ({
          id: item.id,
          createdAt: item.created_at,
          studentName: item.student_name,
          targetRole: item.target_role,
          companyName: item.company_name,
          profile: item.profile,
          job: item.job,
          outputs: item.outputs,
          result: item.result,
          paid: item.paid,
          paymentId: item.payment_id,
        }));
      }
    } catch (e) {
      console.error("Supabase fetch error, using fallback:", e);
    }
  }

  // 2. Local storage fallback if in browser
  if (typeof window !== "undefined") {
    try {
      const existing = localStorage.getItem(STORAGE_KEY);
      const localList: ApplicationRecord[] = existing ? JSON.parse(existing) : [];
      // Combine with serverMemoryStore and deduplicate by id
      const combined = [...localList, ...serverMemoryStore];
      const uniqueMap = new Map<string, ApplicationRecord>();
      combined.forEach((item) => uniqueMap.set(item.id, item));
      return Array.from(uniqueMap.values()).sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } catch (e) {
      console.error("Local storage fetch error:", e);
    }
  }

  return [...serverMemoryStore];
}
