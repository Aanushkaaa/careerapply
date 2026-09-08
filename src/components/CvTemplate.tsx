"use client";

import { StudentProfile, GeneratedApplication } from "@/types";

interface CvTemplateProps {
  profile: StudentProfile;
  cvData: NonNullable<GeneratedApplication["cv"]>;
  companyName?: string;
  roleTitle?: string;
}

export function CvTemplate({ profile, cvData, companyName, roleTitle }: CvTemplateProps) {
  return (
    <div
      id="cv-pdf-container"
      className="bg-white text-slate-900 p-8 md:p-10 rounded-xl shadow-2xl max-w-4xl mx-auto space-y-6 font-sans text-sm border border-slate-200"
    >
      {/* Header */}
      <div className="border-b-2 border-slate-800 pb-4 text-center space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 uppercase">
          {profile.name || "Student Name"}
        </h1>
        <div className="flex items-center justify-center gap-3 text-xs text-slate-600">
          <span>{profile.email}</span>
          <span>•</span>
          <span>Target Role: {roleTitle || "Business Analyst Intern"}</span>
          {companyName && (
            <>
              <span>•</span>
              <span>{companyName}</span>
            </>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {cvData.summary && (
        <div className="space-y-1">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-300 pb-1">
            Executive Summary
          </h2>
          <p className="text-xs leading-relaxed text-slate-700 pt-1">{cvData.summary}</p>
        </div>
      )}

      {/* Education */}
      {cvData.education && cvData.education.length > 0 && (
        <div className="space-y-1">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-300 pb-1">
            Education & Academic Credentials
          </h2>
          <ul className="list-disc list-inside text-xs text-slate-700 space-y-1 pt-1">
            {cvData.education.map((item, idx) => (
              <li key={idx} className="font-semibold text-slate-800">
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Skills */}
      {cvData.skills && cvData.skills.length > 0 && (
        <div className="space-y-1">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-300 pb-1">
            Core Competencies & Technical Skills
          </h2>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {cvData.skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded bg-slate-100 text-slate-800 text-[11px] font-medium border border-slate-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {cvData.relevantExperience && cvData.relevantExperience.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-300 pb-1">
            Relevant Experience & Internships
          </h2>
          <div className="space-y-3 pt-1">
            {cvData.relevantExperience.map((exp, idx) => (
              <div key={idx} className="space-y-1">
                <div className="font-semibold text-slate-900 text-xs">{exp.title}</div>
                <ul className="space-y-1 text-xs text-slate-700 pl-2">
                  {exp.highlights.map((bullet, bIdx) => (
                    <li key={bIdx} className="leading-relaxed">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {cvData.keyProjects && cvData.keyProjects.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-300 pb-1">
            Key Academic & Practical Projects
          </h2>
          <div className="grid grid-cols-1 gap-2 pt-1">
            {cvData.keyProjects.map((p, idx) => (
              <div key={idx} className="p-2.5 rounded bg-slate-50 border border-slate-200">
                <div className="font-semibold text-slate-900 text-xs">{p.name}</div>
                <div className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">{p.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Achievements */}
      {cvData.achievements && cvData.achievements.length > 0 && (
        <div className="space-y-1">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-300 pb-1">
            Honors & Achievements
          </h2>
          <ul className="list-disc list-inside text-xs text-slate-700 space-y-0.5 pt-1">
            {cvData.achievements.map((ach, idx) => (
              <li key={idx}>{ach}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
