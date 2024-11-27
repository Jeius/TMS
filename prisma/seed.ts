/* eslint-disable @typescript-eslint/no-unused-vars */
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
} from './generated/client';
import { COLLEGES } from './seeders/data';
import {
  getRandomBoolean,
  getRandomPrefix,
  getRandomRole,
  getRandomSuffix,
} from './seeders/helper-functions';

const prisma = new PrismaClient();

async function seedDepartments() {
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
  specializationTags: SpecializationTag[],
  roles: Role[],
  prefixes: Prefix[],
  suffixes: Suffix[]
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
  const statusesWithFiveEach = statuses.slice(0, statuses.length - 1); // All statuses except FINAL_MANUSCRIPT
  const thesesPerStatus = 5;

  for (let i = 1; i <= numberOfThesis; i++) {
    let status: ThesisStatus;
    if (i <= statusesWithFiveEach.length * thesesPerStatus) {
      // Distribute first 5 theses to each of the first four statuses
      const statusIndex = Math.floor((i - 1) / thesesPerStatus);
      status = statusesWithFiveEach[statusIndex];
    } else {
      // Assign the remaining theses to FINAL_MANUSCRIPT
      status = ThesisStatus.FINAL_MANUSCRIPT;
    }

    const yearApproved = status === ThesisStatus.FINAL_MANUSCRIPT ? 2023 : null;
    const department_id = departments[i % departments.length].id;
    const faculties = await getFacultiesID(department_id);
    const thesis = await prisma.thesis.create({
      data: {
        title: `Thesis Title ${i}`,
        abstract: `This is an abstract for Thesis ${i}. It provides an overview of the study.`,
        status: status,
        year_approved: yearApproved,
        department: { connect: { id: department_id } },
      },
    });

    await createSpecializations(thesis.id, specializationTags);

    await createAuthors({
      thesis_id: thesis.id,
      department_id,
      roles,
    });

    const createCoAdviser = getRandomBoolean();
    if (createCoAdviser) {
      const index = Math.floor(Math.random() * faculties.length);
      const facultyID = faculties.splice(index, 1)[0];
      await createAdviser({
        thesis_id: thesis.id,
        department_id,
        roles,
        prefixes,
        suffixes,
        adviser_id: facultyID,
        adviser_role: Adviser_role.CO_ADVISER,
      });
    }

    const index = Math.floor(Math.random() * faculties.length);
    const facultyID = faculties.splice(index, 1)[0];
    await createAdviser({
      thesis_id: thesis.id,
      department_id,
      roles,
      prefixes,
      suffixes,
      adviser_id: facultyID,
      adviser_role: Adviser_role.ADVISER,
    });

    await createPanelists({
      thesis_id: thesis.id,
      department_id,
      roles,
      prefixes,
      suffixes,
      faculties: faculties,
    });
  }
}

async function createSpecializations(
  thesis_id: string,
  specializationTags: SpecializationTag[]
) {
  const number = Math.floor(Math.random() * 4) + 2;
  const specializationData = [];
  for (let i = 0; i < number; i++) {
    specializationData.push({
      thesis_id: thesis_id,
      tag_id: specializationTags[i % specializationTags.length].id, //Random tag
    });
  }
  await prisma.thesisSpecialization.createMany({
    data: specializationData,
  });
}

async function createUser(role_id: number, department_id: string) {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@g.msuiit.edu.ph`;
  const user = await prisma.user.create({
    data: { email: email, is_anonymous: true },
  });

  const profile = await prisma.profile.create({
    data: {
      id: user.id,
      first_name: firstName,
      last_name: lastName,
      department_id: department_id,
      role_id: role_id,
      created_at: user.created_at,
    },
  });

  if (user && profile) {
    console.log(
      `Created user ${profile.first_name} ${profile.last_name} with ID: ${user.id}`
    );

    return user;
  }
  return null;
}

async function seedFaculties(
  roles: Role[],
  prefixes: Prefix[],
  suffixes: Suffix[],
  departments: Department[]
) {
  const numberOfUsersToSeed = 30;
  const filteredRoles = roles.filter((role) => role.name !== 'Student');

  if (!departments.length || !filteredRoles.length) {
    throw new Error('Departments or Roles not found.');
  }

  for (let i = 0; i < numberOfUsersToSeed; i++) {
    const department = departments[i % departments.length];
    const role = getRandomRole(filteredRoles);
    const prefix = getRandomPrefix(prefixes);
    const suffix = getRandomSuffix(suffixes);

    const user = await createUser(role.id, department.id);
    if (!user) {
      console.log(
        `Skipping user creation at index ${i} as no user was created.`
      );
      continue;
    }

    await prisma.profile.update({
      where: { id: user.id },
      data: {
        prefix_id: prefix?.id,
        suffix_id: suffix?.id,
      },
    });
    console.log(`Created user with ID: ${user.id} and profile.`);
  }
}

async function createAuthors({
  thesis_id,
  roles,
  department_id,
}: {
  thesis_id: string;
  department_id: string;
  roles: Role[];
}) {
  const number = Math.floor(Math.random() * 3) + 1;
  const authorData = [];
  const role = roles.find((role) => role.name === 'Student');

  if (!role) {
    throw new Error('Student role not found.');
  }

  for (let i = 0; i < number; i++) {
    const user = await createUser(role.id, department_id);
    if (!user) {
      console.log(
        `Skipping author creation of thesis ${thesis_id} at index ${i} as no user was created.`
      );
      continue;
    }

    authorData.push({ thesis_id: thesis_id, author_id: user.id });
  }

  if (authorData.length > 0) {
    await prisma.author.createMany({
      data: authorData,
      skipDuplicates: true, // Skip duplicates to avoid insertion errors
    });
    console.log(
      `${authorData.length} authors assigned successfully for thesis ID: ${thesis_id}.`
    );
  } else {
    console.log(`Error creating authors for thesis ID: ${thesis_id}.`);
  }
}

async function createAdviser({
  thesis_id,
  adviser_id,
  adviser_role,
  roles,
  department_id,
  prefixes,
  suffixes,
}: {
  thesis_id: string;
  department_id: string;
  roles: Role[];
  prefixes: Prefix[];
  suffixes: Suffix[];
  adviser_id: string;
  adviser_role: Adviser_role;
}) {
  let userId = adviser_id;
  const filteredRoles = roles.filter((role) => role.name !== 'Student');
  const create = getRandomBoolean(0.35);

  if (!create && adviser_id) {
    userId = adviser_id;
  } else {
    const role = getRandomRole(filteredRoles);
    const prefix = getRandomPrefix(prefixes);
    const suffix = getRandomSuffix(suffixes);

    const user = await createUser(role.id, department_id);
    if (user) {
      await prisma.profile.update({
        where: { id: user.id },
        data: {
          prefix_id: prefix?.id,
          suffix_id: suffix?.id,
        },
      });
      userId = user.id;
    }
  }

  const adviser = await prisma.adviser.create({
    data: {
      thesis_id,
      adviser_id: userId,
      role: adviser_role,
    },
  });

  if (adviser) {
    console.log(
      `Adviser ${adviser_id} assigned successfully for thesis ID: ${thesis_id}.`
    );
  } else {
    console.log(`Error assigning adviser for thesis ID: ${thesis_id}.`);
  }
}

async function getFacultiesID(department_id: string) {
  if (!department_id) return []; // Handle undefined/null department_id early.

  const faculties = await prisma.profile.findMany({
    select: { id: true },
    where: {
      department_id,
      role: { name: { not: 'Student' } },
    },
  });

  // Extract and return the list of faculty IDs.
  return faculties.map((faculty) => faculty.id);
}

async function createPanelists({
  thesis_id,
  roles,
  department_id,
  prefixes,
  suffixes,
  faculties,
}: {
  thesis_id: string;
  department_id: string;
  roles: Role[];
  prefixes: Prefix[];
  suffixes: Suffix[];
  faculties: string[];
}) {
  const number = Math.floor(Math.random() * 3) + 2;
  const panelistData = [];
  const filteredRoles = roles.filter((role) => role.name !== 'Student');

  for (let i = 0; i < number; i++) {
    const index = Math.floor(Math.random() * faculties.length);
    const panelist_id = faculties.splice(index, 1)[0];
    const create = getRandomBoolean(0.35);
    if (!create && panelist_id) {
      panelistData.push({ thesis_id, panelist_id });
    } else {
      const role = getRandomRole(filteredRoles);
      const prefix = getRandomPrefix(prefixes);
      const suffix = getRandomSuffix(suffixes);

      const user = await createUser(role.id, department_id);
      if (user === null) {
        console.log(
          `Skipping panel creation of thesis ${thesis_id} as no user was created.`
        );
        continue;
      }
      await prisma.profile.update({
        where: { id: user.id },
        data: {
          prefix_id: prefix?.id,
          suffix_id: suffix?.id,
        },
      });
      panelistData.push({
        thesis_id: thesis_id,
        panelist_id: user.id,
      });
    }
  }

  if (panelistData.length > 0) {
    await prisma.panelist.createMany({
      data: panelistData,
      skipDuplicates: true, // Skip duplicates to avoid insertion errors
    });
    console.log(
      `${panelistData.length} panelists assigned successfully for thesis ID: ${thesis_id}.`
    );
  } else {
    console.log(`Error assigning panelist for thesis ID: ${thesis_id}.`);
  }
}

// Main seeding function
async function main() {
  try {
    // const departments = await seedDepartments();
    // const tags = await prisma.specializationTag.createManyAndReturn({
    //   data: SPECIALIZATIONTAGS,
    // });
    // const roles = await prisma.role.createManyAndReturn({
    //   data: ROLES,
    // });
    // const prefixes = await prisma.prefix.createManyAndReturn({
    //   data: PREFIXES,
    // });
    // const suffixes = await prisma.suffix.createManyAndReturn({
    //   data: SUFFIXES,
    // });

    // await seedFaculties(roles, prefixes, suffixes, departments);

    const departments = await prisma.department.findMany();
    const tags = await prisma.specializationTag.findMany();
    const roles = await prisma.role.findMany();
    const prefixes = await prisma.prefix.findMany();
    const suffixes = await prisma.suffix.findMany();

    await seedTheses(departments, tags, roles, prefixes, suffixes);
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seed
main();
