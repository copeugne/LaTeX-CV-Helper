import React from 'react';
import { useResumeStore } from '../store/useResumeStore';
import { Plus, Trash2 } from 'lucide-react';

export function ResumeForm() {
  const { resume, updateContact, updateEducation, updateExperience, updateSkills } =
    useResumeStore();

  const addEducation = () => {
    const newEducation = {
      id: crypto.randomUUID(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
    };
    updateEducation([...resume.education, newEducation]);
  };

  const addExperience = () => {
    const newExperience = {
      id: crypto.randomUUID(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      description: [''],
    };
    updateExperience([...resume.experience, newExperience]);
  };

  return (
    <div className="h-full overflow-y-auto p-4 space-y-6">
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Contact Information</h2>
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="input"
            value={resume.contact.name}
            onChange={(e) =>
              updateContact({ ...resume.contact, name: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="Email"
            className="input"
            value={resume.contact.email}
            onChange={(e) =>
              updateContact({ ...resume.contact, email: e.target.value })
            }
          />
          <input
            type="tel"
            placeholder="Phone"
            className="input"
            value={resume.contact.phone}
            onChange={(e) =>
              updateContact({ ...resume.contact, phone: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Location"
            className="input"
            value={resume.contact.location}
            onChange={(e) =>
              updateContact({ ...resume.contact, location: e.target.value })
            }
          />
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Education</h2>
          <button
            onClick={addEducation}
            className="flex items-center gap-2 px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
          >
            <Plus size={16} /> Add Education
          </button>
        </div>
        {resume.education.map((edu, index) => (
          <div key={edu.id} className="space-y-3 p-4 border rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Institution"
                className="input"
                value={edu.institution}
                onChange={(e) => {
                  const newEducation = [...resume.education];
                  newEducation[index].institution = e.target.value;
                  updateEducation(newEducation);
                }}
              />
              <input
                type="text"
                placeholder="Degree"
                className="input"
                value={edu.degree}
                onChange={(e) => {
                  const newEducation = [...resume.education];
                  newEducation[index].degree = e.target.value;
                  updateEducation(newEducation);
                }}
              />
              <input
                type="text"
                placeholder="Field of Study"
                className="input"
                value={edu.field}
                onChange={(e) => {
                  const newEducation = [...resume.education];
                  newEducation[index].field = e.target.value;
                  updateEducation(newEducation);
                }}
              />
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Start Date"
                  className="input flex-1"
                  value={edu.startDate}
                  onChange={(e) => {
                    const newEducation = [...resume.education];
                    newEducation[index].startDate = e.target.value;
                    updateEducation(newEducation);
                  }}
                />
                <input
                  type="text"
                  placeholder="End Date"
                  className="input flex-1"
                  value={edu.endDate}
                  onChange={(e) => {
                    const newEducation = [...resume.education];
                    newEducation[index].endDate = e.target.value;
                    updateEducation(newEducation);
                  }}
                />
              </div>
            </div>
            <button
              onClick={() => {
                const newEducation = resume.education.filter((_, i) => i !== index);
                updateEducation(newEducation);
              }}
              className="flex items-center gap-2 px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
            >
              <Trash2 size={16} /> Remove
            </button>
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Experience</h2>
          <button
            onClick={addExperience}
            className="flex items-center gap-2 px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
          >
            <Plus size={16} /> Add Experience
          </button>
        </div>
        {resume.experience.map((exp, index) => (
          <div key={exp.id} className="space-y-3 p-4 border rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Company"
                className="input"
                value={exp.company}
                onChange={(e) => {
                  const newExperience = [...resume.experience];
                  newExperience[index].company = e.target.value;
                  updateExperience(newExperience);
                }}
              />
              <input
                type="text"
                placeholder="Position"
                className="input"
                value={exp.position}
                onChange={(e) => {
                  const newExperience = [...resume.experience];
                  newExperience[index].position = e.target.value;
                  updateExperience(newExperience);
                }}
              />
              <input
                type="text"
                placeholder="Location"
                className="input"
                value={exp.location}
                onChange={(e) => {
                  const newExperience = [...resume.experience];
                  newExperience[index].location = e.target.value;
                  updateExperience(newExperience);
                }}
              />
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Start Date"
                  className="input flex-1"
                  value={exp.startDate}
                  onChange={(e) => {
                    const newExperience = [...resume.experience];
                    newExperience[index].startDate = e.target.value;
                    updateExperience(newExperience);
                  }}
                />
                <input
                  type="text"
                  placeholder="End Date"
                  className="input flex-1"
                  value={exp.endDate}
                  onChange={(e) => {
                    const newExperience = [...resume.experience];
                    newExperience[index].endDate = e.target.value;
                    updateExperience(newExperience);
                  }}
                />
              </div>
            </div>
            <div className="space-y-2">
              {exp.description.map((desc, descIndex) => (
                <div key={descIndex} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Description"
                    className="input flex-1"
                    value={desc}
                    onChange={(e) => {
                      const newExperience = [...resume.experience];
                      newExperience[index].description[descIndex] = e.target.value;
                      updateExperience(newExperience);
                    }}
                  />
                  <button
                    onClick={() => {
                      const newExperience = [...resume.experience];
                      newExperience[index].description = exp.description.filter(
                        (_, i) => i !== descIndex
                      );
                      updateExperience(newExperience);
                    }}
                    className="p-2 text-red-500 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  const newExperience = [...resume.experience];
                  newExperience[index].description.push('');
                  updateExperience(newExperience);
                }}
                className="flex items-center gap-2 px-3 py-1 rounded bg-gray-500 text-white hover:bg-gray-600"
              >
                <Plus size={16} /> Add Description
              </button>
            </div>
            <button
              onClick={() => {
                const newExperience = resume.experience.filter((_, i) => i !== index);
                updateExperience(newExperience);
              }}
              className="flex items-center gap-2 px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
            >
              <Trash2 size={16} /> Remove
            </button>
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Skills</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Technical Skills</label>
            <input
              type="text"
              placeholder="Comma-separated list of technical skills"
              className="input"
              value={resume.skills.technical.join(', ')}
              onChange={(e) =>
                updateSkills({
                  ...resume.skills,
                  technical: e.target.value.split(',').map((s) => s.trim()),
                })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Languages</label>
            <input
              type="text"
              placeholder="Comma-separated list of languages"
              className="input"
              value={resume.skills.languages?.join(', ') || ''}
              onChange={(e) =>
                updateSkills({
                  ...resume.skills,
                  languages: e.target.value.split(',').map((s) => s.trim()),
                })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Tools</label>
            <input
              type="text"
              placeholder="Comma-separated list of tools"
              className="input"
              value={resume.skills.tools?.join(', ') || ''}
              onChange={(e) =>
                updateSkills({
                  ...resume.skills,
                  tools: e.target.value.split(',').map((s) => s.trim()),
                })
              }
            />
          </div>
        </div>
      </section>
    </div>
  );
}