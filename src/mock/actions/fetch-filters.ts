'use server';

export const fetchMockSpecializations = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return [
    { id: 1, name: 'Artificial Intelligence' },
    { id: 2, name: 'Cybersecurity' },
    { id: 3, name: 'Data Science' },
    { id: 4, name: 'Software Engineering' },
    { id: 5, name: 'Machine Learning' },
    { id: 6, name: 'Blockchain Technology' },
    { id: 7, name: 'Human-Computer Interaction' },
    { id: 8, name: 'Cloud Computing' },
    { id: 9, name: 'Quantum Computing' },
    { id: 10, name: 'Bioinformatics' },
  ].map((item) => item.name);
};

export const fetchMockColleges = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return [
    { id: 1, name: 'College of Engineering' },
    { id: 2, name: 'College of Arts and Sciences' },
    { id: 3, name: 'College of Business Administration' },
    { id: 4, name: 'College of Education' },
    { id: 5, name: 'College of Information Technology' },
    { id: 6, name: 'College of Nursing' },
    { id: 7, name: 'College of Agriculture' },
    { id: 8, name: 'College of Law' },
    { id: 9, name: 'College of Architecture' },
    { id: 10, name: 'College of Social Sciences' },
  ].map((item) => item.name);
};

export const fetchMockDepartments = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return [
    { id: 1, name: 'Mechanical Engineering' },
    { id: 1, name: 'Electrical Engineering' },
    { id: 2, name: 'Biology' },
    { id: 2, name: 'Chemistry' },
    { id: 3, name: 'Management' },
    { id: 3, name: 'Accounting' },
    { id: 4, name: 'Elementary Education' },
    { id: 4, name: 'Secondary Education' },
    { id: 5, name: 'Computer Science' },
    { id: 5, name: 'Information Systems' },
  ].map((item) => item.name);
};

export const fetchMockPublicationYears = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return [
    { id: 1, name: '2019' },
    { id: 2, name: '2020' },
    { id: 3, name: '2021' },
    { id: 4, name: '2022' },
    { id: 5, name: '2023' },
  ].map((item) => item.name);
};

export const fetchMockAuthors = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return [
    { id: 1, name: 'Lopez, J.' },
    { id: 2, name: 'Garcia, M.' },
    { id: 3, name: 'Reyes, A.' },
    { id: 4, name: 'Santos, C.' },
    { id: 5, name: 'Cruz, B.' },
    { id: 6, name: 'Perez, K.' },
    { id: 7, name: 'Mendoza, R.' },
    { id: 8, name: 'Gomez, S.' },
    { id: 9, name: 'Ramos, T.' },
    { id: 10, name: 'Delos Santos, L.' },
  ].map((item) => item.name);
};

export const fetchMockAdvisers = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return [
    { id: 1, name: 'Dr. Valdez, M.' },
    { id: 2, name: 'Dr. Lim, J.' },
    { id: 3, name: 'Prof. Torres, L.' },
    { id: 4, name: 'Prof. De Guzman, E.' },
    { id: 5, name: 'Dr. Hernandez, A.' },
    { id: 6, name: 'Prof. Dela Cruz, N.' },
    { id: 7, name: 'Dr. Bautista, C.' },
    { id: 8, name: 'Prof. Rivera, S.' },
    { id: 9, name: 'Dr. Navarro, F.' },
    { id: 10, name: 'Prof. Castillo, V.' },
  ].map((item) => item.name);
};

export const fetchMockPanelists = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return [
    { id: 1, name: 'Dr. Santiago, R.' },
    { id: 2, name: 'Prof. Aquino, P.' },
    { id: 3, name: 'Dr. Villanueva, J.' },
    { id: 4, name: 'Prof. Martinez, G.' },
    { id: 5, name: 'Dr. Flores, S.' },
    { id: 6, name: 'Prof. Ramos, D.' },
    { id: 7, name: 'Dr. Delgado, L.' },
    { id: 8, name: 'Prof. Suarez, H.' },
    { id: 9, name: 'Dr. Cabrera, E.' },
    { id: 10, name: 'Prof. Garcia, O.' },
  ].map((item) => item.name);
};

export async function fetchMockFilterIds() {
  return [
    'college',
    'department',
    'year',
    'specialization',
    'author',
    'adviser',
    'panelist',
  ];
}
