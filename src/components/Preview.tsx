import React from 'react';
import { useResumeStore } from '../store/useResumeStore';

export function Preview() {
  const { resume, isCompiling } = useResumeStore();

  return (
    <div className="h-full bg-gray-100 p-4">
      <div className="bg-white h-full rounded shadow-lg p-8 overflow-auto">
        {isCompiling && (
          <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
            <div className="text-blue-500">Compiling...</div>
          </div>
        )}
        <div id="latex-preview" className="latex-preview">
          {/* LaTeX preview will be rendered here */}
          <h1 className="text-2xl font-bold text-center">{resume.contact.name}</h1>
          <div className="text-center text-gray-600 mt-2">
            {resume.contact.email} | {resume.contact.phone} | {resume.contact.location}
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold border-b pb-2">Education</h2>
            {resume.education.map((edu) => (
              <div key={edu.id} className="mt-4">
                <div className="flex justify-between">
                  <strong>{edu.institution}</strong>
                  <span>
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
                <div className="italic">
                  {edu.degree} in {edu.field}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold border-b pb-2">Experience</h2>
            {resume.experience.map((exp) => (
              <div key={exp.id} className="mt-4">
                <div className="flex justify-between">
                  <strong>{exp.company}</strong>
                  <span>
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <div className="flex justify-between italic">
                  <span>{exp.position}</span>
                  <span>{exp.location}</span>
                </div>
                <ul className="list-disc ml-4 mt-2">
                  {exp.description.map((desc, i) => (
                    <li key={i}>{desc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold border-b pb-2">Skills</h2>
            <div className="mt-4">
              <p>
                <strong>Technical:</strong> {resume.skills.technical.join(', ')}
              </p>
              {resume.skills.languages && (
                <p className="mt-2">
                  <strong>Languages:</strong> {resume.skills.languages.join(', ')}
                </p>
              )}
              {resume.skills.tools && (
                <p className="mt-2">
                  <strong>Tools:</strong> {resume.skills.tools.join(', ')}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}