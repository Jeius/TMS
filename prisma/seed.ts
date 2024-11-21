import { faker } from '@faker-js/faker';
import {
  Adviser_role,
  Department,
  Prefix,
  PrismaClient,
  Role,
  SpecializationTag,
  Suffix,
  ThesisStatus,
} from '@prisma/client';
import {
  COLLEGES,
  PREFIXES,
  ROLES,
  SPECIALIZTIONTAGS,
  SUFFIXES,
} from './seeders/data';

const prisma = new PrismaClient();

// const supabaseUrl = process.env.SUPABASE_URL;
// const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

// if (!supabaseUrl || !supabaseAnonKey) {
//   throw new Error(
//     'Supabase URL or Anon Key is missing in the environment variables.'
//   );
// }
// // Helper Types
// type UserMetaData = { email: string; firstName: string; lastName: string };

// const supabase = createClient(supabaseUrl, supabaseAnonKey);
// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// async function createSupabaseUser() {
//   const email = faker.internet.email();
//   const firstName = faker.person.firstName();
//   const lastName = faker.person.lastName();

//   const {
//     data: { user },
//     error,
//   } = await supabase.auth.signInAnonymously({
//     options: { data: { email, firstName, lastName } as UserMetaData },
//   });

//   if (error) {
//     console.error('Error creating user:', error.message);
//     return null;
//   }

//   return user;
// }

async function seedCollegesAndDepartments() {
  for (const college of COLLEGES) {
    const createdCollege = await prisma.college.create({
      data: { name: college.name },
    });

    if (college.departments) {
      for (const department of college.departments) {
        await prisma.department.create({
          data: {
            name: department.name,
            college_id: createdCollege.id,
          },
        });
      }
    }
  }
  console.log('Seed College and Departments complete.');
  return await prisma.department.findMany();
}

async function seedTheses(
  departments: Department[],
  specializationTags: SpecializationTag[]
) {
  const numberOfThesis = 50;

  // Define the thesis statuses
  const statuses = [
    ThesisStatus.PROPOSAL_SUBMITTED,
    ThesisStatus.UNDER_REVIEW,
    ThesisStatus.FINAL_MANUSCRIPT,
    ThesisStatus.APPROVED,
    ThesisStatus.REJECTED,
  ];

  // Calculate how many theses are assigned to each status
  const statusesWithFiveEach = statuses.slice(0, statuses.length - 1); // All statuses except APPROVED
  const thesesPerStatus = 5;

  for (let i = 1; i <= numberOfThesis; i++) {
    let status: ThesisStatus;
    if (i <= statusesWithFiveEach.length * thesesPerStatus) {
      // Distribute first 5 theses to each of the first four statuses
      const statusIndex = Math.floor((i - 1) / thesesPerStatus);
      status = statusesWithFiveEach[statusIndex];
    } else {
      // Assign the remaining theses to APPROVED
      status = ThesisStatus.APPROVED;
    }

    const yearApproved = status === ThesisStatus.APPROVED ? 2023 : null;

    const thesis = await prisma.thesis.create({
      data: {
        title: `Thesis Title ${i}`,
        abstract: `This is an abstract for Thesis ${i}. It provides an overview of the study.`,
        status: status,
        year_approved: yearApproved,
        department: { connect: { id: departments[i % departments.length].id } },
      },
    });

    // Link ThesisSpecialization tags to each thesis
    await prisma.thesisSpecialization.createMany({
      data: [
        {
          thesis_id: thesis.id,
          tag_id: specializationTags[i % specializationTags.length].id, //Random tag
        },
        {
          thesis_id: thesis.id,
          tag_id: specializationTags[(i + 1) % specializationTags.length].id, //Random tag
        },
      ],
    });
  }
}

async function createUser() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@g.msuiit.edu.ph`;

  const user = await prisma.user.create({
    data: { email: email, is_anonymous: true },
  });

  await prisma.profile.create({
    data: {
      id: user.id,
      first_name: firstName,
      last_name: lastName,
      created_at: user.created_at,
    },
  });

  return user;
}

async function seedNonStudents(
  roles: Role[],
  prefixes: Prefix[],
  suffixes: Suffix[]
) {
  const numberOfUsersToSeed = 50;
  const departments = await prisma.department.findMany();
  const filteredRoles = roles.filter((role) => role.name !== 'Student');

  if (!departments.length || !filteredRoles.length) {
    throw new Error('Departments or Roles not found.');
  }

  for (let i = 0; i < numberOfUsersToSeed; i++) {
    const user = await createUser();
    if (!user) {
      console.log(
        `Skipping user creation at index ${i} as no user was created.`
      );
      continue;
    }

    const assignedDept = departments[i % departments.length];
    const role = filteredRoles[i % filteredRoles.length];
    const prefixId = prefixes[i % prefixes.length].id;
    const suffixId = suffixes[i % suffixes.length].id;

    await prisma.profile.update({
      where: { id: user.id },
      data: {
        role_id: role.id,
        department_id: assignedDept.id,
        prefix_id: prefixId,
        suffix_id: suffixId,
      },
    });
    console.log(`Created user with ID: ${user.id} and profile.`);
  }
}

async function seedStudents(roles: Role[]) {
  const numberOfUsersToSeed = 50;
  const departments = await prisma.department.findMany();
  const role = roles.find((role) => role.name === 'Student');

  if (!departments.length || !role) {
    throw new Error('Departments or Student role not found.');
  }

  const numberOfDepartments = departments.length;

  for (let i = 0; i < numberOfUsersToSeed; i++) {
    const user = await createUser();
    const assignedDepartment = departments[i % numberOfDepartments]; // Round-robin logic

    if (user) {
      await prisma.profile.update({
        where: { id: user.id },
        data: {
          department_id: assignedDepartment.id,
          role_id: role.id,
        },
      });
      console.log(
        `Created user with ID: ${user.id} and assigned to department: ${assignedDepartment.name}.`
      );
    }
  }
}

async function seedAuthors() {
  try {
    // Fetch theses and students
    const theses = await prisma.thesis.findMany({
      select: { id: true, department_id: true },
    });

    const students = await prisma.profile.findMany({
      select: { id: true, department_id: true },
      where: { department_id: { not: null }, role: { name: 'Student' } },
    });

    // Create a map to quickly find students by department_id
    const studentsByDepartment = students.reduce(
      (acc, student) => {
        if (!acc[student.department_id!]) {
          acc[student.department_id!] = [];
        }
        acc[student.department_id!].push(student.id);
        return acc;
      },
      {} as Record<string, string[]>
    );

    // Prepare data for author creation
    const authorData = theses
      .map((thesis) => {
        const departmentStudents =
          studentsByDepartment[thesis.department_id!] || [];
        if (departmentStudents.length === 0) return null; // Skip if no students in department

        // Pick up to 3 random students from the department
        const selectedStudents = [];
        while (selectedStudents.length < 3 && departmentStudents.length > 0) {
          const randomIndex = Math.floor(
            Math.random() * departmentStudents.length
          );
          const selectedStudentId = departmentStudents.splice(
            randomIndex,
            1
          )[0]; // Remove the student from the pool
          selectedStudents.push(selectedStudentId);
        }

        // Return multiple authors for the thesis
        return selectedStudents.map((studentId) => ({
          thesis_id: thesis.id,
          author_id: studentId,
        }));
      })
      .filter((thesis) => thesis !== null) // Remove null results
      .flat(); // Flatten the array to ensure all authors are included

    // Bulk insert authors
    if (authorData.length > 0) {
      await prisma.author.createMany({
        data: authorData,
        skipDuplicates: true, // Skip duplicates to avoid insertion errors
      });
      console.log(`${authorData.length} authors assigned successfully.`);
    } else {
      console.log('No matching students found for any theses.');
    }
  } catch (error) {
    console.error('Error during seeding authors:', error);
  }
}

async function seedAdvisers() {
  // Fetch all theses and advisers
  const theses = await prisma.thesis.findMany({
    select: { id: true, department_id: true },
  });

  const advisers = await prisma.profile.findMany({
    select: { id: true, department_id: true },
    where: { department_id: { not: null }, role: { name: { not: 'Student' } } },
  });

  // Group advisers by department
  const advisersByDepartment = advisers.reduce(
    (acc, adviser) => {
      if (adviser.department_id) {
        if (!acc[adviser.department_id]) {
          acc[adviser.department_id] = [];
        }
        acc[adviser.department_id].push(adviser.id);
      }
      return acc;
    },
    {} as Record<string, string[]>
  );

  // Generate adviser assignments for theses
  const adviserData = theses.flatMap((thesis) => {
    const departmentAdvisers =
      advisersByDepartment[thesis.department_id!] || [];
    if (departmentAdvisers.length === 0) return []; // Skip if no advisers available

    // To ensure unique advisers per thesis, we'll use a set to track assigned advisers
    const assignedAdvisers = new Set<string>();
    const thesisAdviser = [];

    // Randomly assign 1 unique adviser per thesis
    const randomAdviserId =
      departmentAdvisers[Math.floor(Math.random() * departmentAdvisers.length)];

    // Ensure the adviser is unique (not already assigned)
    if (!assignedAdvisers.has(randomAdviserId)) {
      thesisAdviser.push({
        thesis_id: thesis.id,
        adviser_id: randomAdviserId,
        role: Adviser_role.ADVISER, // Assuming Adviser_role.ADVISER is an enum or string
      });
      assignedAdvisers.add(randomAdviserId); // Track this adviser as assigned
    }

    return thesisAdviser;
  });

  // Bulk insert adviser data
  if (adviserData.length > 0) {
    try {
      await prisma.advisers.createMany({
        data: adviserData,
        skipDuplicates: true, // Ensures no duplicates if they somehow exist
      });
      console.log(`${adviserData.length} advisers assigned successfully.`);
    } catch (error) {
      console.error('Error during seeding advisers:', error);
    }
  } else {
    console.log('No advisers found for any theses.');
  }
}

async function seedPanelists() {
  // Fetch all theses and panelists
  const theses = await prisma.thesis.findMany({
    select: { id: true, department_id: true },
  });

  const panelists = await prisma.profile.findMany({
    select: { id: true, department_id: true },
    where: { department_id: { not: null }, role: { name: { not: 'Student' } } },
  });

  // Group panelists by department
  const panelistsByDepartment = panelists.reduce(
    (acc, panelist) => {
      if (panelist.department_id) {
        if (!acc[panelist.department_id]) {
          acc[panelist.department_id] = [];
        }
        acc[panelist.department_id].push(panelist.id);
      }
      return acc;
    },
    {} as Record<string, string[]>
  );

  // Generate panelist data for all theses
  const panelistData = theses.flatMap((thesis) => {
    const departmentPanelists =
      panelistsByDepartment[thesis.department_id!] || [];
    if (departmentPanelists.length === 0) return []; // Skip if no panelists available

    // To ensure unique panelists per thesis, we'll use a set to track assigned panelists
    const assignedPanelists = new Set<string>();
    const thesisPanelists = [];

    // Randomly assign 3 unique panelists per thesis
    while (
      thesisPanelists.length < 3 &&
      departmentPanelists.length > thesisPanelists.length
    ) {
      const randomPanelistId =
        departmentPanelists[
          Math.floor(Math.random() * departmentPanelists.length)
        ];

      // Ensure the panelist is unique
      if (!assignedPanelists.has(randomPanelistId)) {
        thesisPanelists.push({
          thesis_id: thesis.id,
          panelist_id: randomPanelistId,
        });
        assignedPanelists.add(randomPanelistId); // Add to the set to track the uniqueness
      }
    }

    return thesisPanelists;
  });

  // Bulk insert the panelist data in one go
  try {
    await prisma.panelist.createMany({
      data: panelistData,
      skipDuplicates: true, // Skip duplicates if any
    });
    console.log(`${panelistData.length} panelists created successfully.`);
  } catch (error) {
    console.error('Error during seeding:', error);
  }
}

// Main seeding function
async function main() {
  try {
    const departments = await seedCollegesAndDepartments();
    const tags = await prisma.specializationTag.createManyAndReturn({
      data: SPECIALIZTIONTAGS,
    });
    const prefixes = await prisma.prefix.createManyAndReturn({
      data: PREFIXES,
    });
    const suffixes = await prisma.suffix.createManyAndReturn({
      data: SUFFIXES,
    });
    const roles = await prisma.role.createManyAndReturn({
      data: ROLES,
    });

    await seedTheses(departments, tags);
    await seedNonStudents(roles, prefixes, suffixes);
    await seedStudents(roles);
    await seedAuthors();
    await seedAdvisers();
    await seedPanelists();
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seed
main();
