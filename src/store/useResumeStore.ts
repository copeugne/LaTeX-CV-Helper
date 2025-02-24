import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Resume } from '../types/resume';

const defaultTemplate = `\\documentclass[11pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[margin=1in]{geometry}
\\usepackage{hyperref}

\\begin{document}

\\begin{center}
    {\\huge \\textbf{<%= contact.name %>}}\\\\[0.3cm]
    <%= contact.email %> | <%= contact.phone %> | <%= contact.location %>
    <% if (contact.website) { %> | \\href{<%= contact.website %>}{Portfolio}<% } %>
\\end{center}

\\section*{Education}
<% education.forEach(function(edu) { %>
\\textbf{<%= edu.institution %>} \\hfill <%= edu.startDate %> - <%= edu.endDate %>\\\\
\\textit{<%= edu.degree %> in <%= edu.field %>}
<% if (edu.gpa) { %> \\hfill GPA: <%= edu.gpa %><% } %>
<% }); %>

\\section*{Experience}
<% experience.forEach(function(exp) { %>
\\textbf{<%= exp.company %>} \\hfill <%= exp.startDate %> - <%= exp.endDate %>\\\\
\\textit{<%= exp.position %>} \\hfill <%= exp.location %>\\\\
<% exp.description.forEach(function(desc) { %>
\\begin{itemize}
    \\item <%= desc %>
\\end{itemize}
<% }); %>
<% }); %>

\\section*{Skills}
\\textbf{Technical:} <%= skills.technical.join(', ') %>
<% if (skills.languages) { %>
\\\\\\textbf{Languages:} <%= skills.languages.join(', ') %>
<% } %>
<% if (skills.tools) { %>
\\\\\\textbf{Tools:} <%= skills.tools.join(', ') %>
<% } %>

\\end{document}`;

interface ResumeState {
  resume: Resume;
  latexTemplate: string;
  isCompiling: boolean;
  compilationError: string | null;
  updateContact: (contact: Resume['contact']) => void;
  updateEducation: (education: Resume['education']) => void;
  updateExperience: (experience: Resume['experience']) => void;
  updateSkills: (skills: Resume['skills']) => void;
  updateLatexTemplate: (template: string) => void;
  setCompiling: (isCompiling: boolean) => void;
  setCompilationError: (error: string | null) => void;
}

const initialState: Resume = {
  contact: {
    name: '',
    email: '',
    phone: '',
    location: '',
  },
  education: [],
  experience: [],
  skills: {
    technical: [],
  },
};

export const useResumeStore = create<ResumeState>()(
  persist(
    (set) => ({
      resume: initialState,
      latexTemplate: defaultTemplate,
      isCompiling: false,
      compilationError: null,
      updateContact: (contact) =>
        set((state) => ({ resume: { ...state.resume, contact } })),
      updateEducation: (education) =>
        set((state) => ({ resume: { ...state.resume, education } })),
      updateExperience: (experience) =>
        set((state) => ({ resume: { ...state.resume, experience } })),
      updateSkills: (skills) =>
        set((state) => ({ resume: { ...state.resume, skills } })),
      updateLatexTemplate: (latexTemplate) => set({ latexTemplate }),
      setCompiling: (isCompiling) => set({ isCompiling }),
      setCompilationError: (compilationError) => set({ compilationError }),
    }),
    {
      name: 'resume-storage',
    }
  )
);