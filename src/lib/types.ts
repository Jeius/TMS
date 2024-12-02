export type Thesis = {
  title: string | null;
  abstract: string | null;
  year: number | null;
  authors: string[];
  adviser: string | null;
  panelists: string[];
  specializations: string[];
  department: string | null;
  college: string | null;
};

export type AuthActionResponse = {
  success?: string;
  error?: string;
  details?: string;
};

export type Size = {
  width: number;
  height: number;
};

export type Message = { success?: string } | { error?: string };
