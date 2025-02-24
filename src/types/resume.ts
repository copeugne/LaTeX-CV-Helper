export interface Contact {
  name: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  highlights?: string[];
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
}

export interface Skills {
  technical: string[];
  languages?: string[];
  tools?: string[];
}

export interface Resume {
  contact: Contact;
  education: Education[];
  experience: Experience[];
  skills: Skills;
}