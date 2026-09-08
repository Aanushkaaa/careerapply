export interface StudentProfile {
  name: string;
  email: string;
  education: string;
  degree: string;
  skills: string;
  experience: string;
  projects: string;
  achievements: string;
}

export interface JobDescription {
  companyName?: string;
  roleTitle?: string;
  text: string;
}

export interface SelectedOutputs {
  tailoredCv: boolean;
  coverLetter: boolean;
  applicationEmail: boolean;
  linkedinMessage: boolean;
  interviewQuestions: boolean;
}

export interface GeneratedApplication {
  cv?: {
    summary: string;
    education: string[];
    skills: string[];
    relevantExperience: {
      title: string;
      highlights: string[];
    }[];
    keyProjects: {
      name: string;
      description: string;
    }[];
    achievements: string[];
  };
  coverLetter?: string;
  applicationEmail?: {
    subject: string;
    body: string;
  };
  linkedinMessage?: string;
  interviewQuestions?: {
    question: string;
    suggestedAnswer: string;
    tip: string;
  }[];
}

export interface ApplicationRecord {
  id: string;
  createdAt: string;
  studentName: string;
  targetRole: string;
  companyName: string;
  profile: StudentProfile;
  job: JobDescription;
  outputs: SelectedOutputs;
  result: GeneratedApplication;
  paid: boolean;
  paymentId?: string;
}
