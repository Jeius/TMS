import { faker } from '@faker-js/faker';
import { Adviser_role, College, Department, PrismaClient, SpecializationTag, ThesisStatus } from '@prisma/client';
import { createClient } from '@supabase/supabase-js';

const prisma = new PrismaClient();
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase URL or Anon Key is missing in the environment variables.");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper Types
type UserMetaData = { email: string, firstName: string, lastName: string };

async function seedColleges() {
    const colleges = [
        { name: 'College of Engineering' },
        { name: 'College of Science' },
        { name: 'College of Arts' },
        { name: 'College of Business' },
        { name: 'College of Law' },
    ];
    await prisma.college.createMany({ data: colleges });
    return await prisma.college.findMany();
}

async function seedDepartments(colleges: College[]) {
    const departments = [
        { name: 'Computer Science', college_id: colleges[0].id },
        { name: 'Mechanical Engineering', college_id: colleges[0].id },
        { name: 'Civil Engineering', college_id: colleges[0].id },
        { name: 'Physics', college_id: colleges[1].id },
        { name: 'Biology', college_id: colleges[1].id },
        { name: 'Chemistry', college_id: colleges[1].id },
        { name: 'Literature', college_id: colleges[2].id },
        { name: 'Philosophy', college_id: colleges[2].id },
        { name: 'History', college_id: colleges[2].id },
        { name: 'Marketing', college_id: colleges[3].id },
        { name: 'Finance', college_id: colleges[3].id },
        { name: 'Management', college_id: colleges[3].id },
        { name: 'Corporate Law', college_id: colleges[4].id },
        { name: 'International Law', college_id: colleges[4].id },
    ];
    await prisma.department.createMany({ data: departments });
    return await prisma.department.findMany();
}

async function seedSpecializationTags() {
    const specializationTags = [
        { name: 'Artificial Intelligence' },
        { name: 'Data Science' },
        { name: 'Quantum Mechanics' },
        { name: 'Structural Engineering' },
        { name: 'Business Strategy' },
    ];
    await prisma.specializationTag.createMany({ data: specializationTags });
    return await prisma.specializationTag.findMany();
}

async function seedTheses(colleges: College[], departments: Department[], specializationTags: SpecializationTag[]) {
    const randomStatus = (): ThesisStatus => {
        const statuses = [
            ThesisStatus.PROPOSAL_SUBMITTED,
            ThesisStatus.UNDER_REVIEW,
            ThesisStatus.FINAL_MANUSCRIPT,
            ThesisStatus.APPROVED,
            ThesisStatus.REJECTED,
        ];
        return statuses[Math.floor(Math.random() * statuses.length)];
    };

    for (let i = 1; i <= 30; i++) {
        const status = randomStatus();
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
                    tag_id: specializationTags[i % specializationTags.length].id,
                },
                {
                    thesis_id: thesis.id,
                    tag_id: specializationTags[(i + 1) % specializationTags.length].id,
                },
            ],
        });
    }
}

async function seedPrefixes() {
    const prefixes = [
        { name: 'MSCS', description: 'Master of Science in Computer Science' },
        { name: 'Ph.D.', description: 'Doctor of Philosophy' },
        { name: 'M.Sc.', description: 'Master of Science' },
        { name: 'B.Sc.', description: 'Bachelor of Science' },
        { name: 'MBA', description: 'Master of Business Administration' },
        { name: 'MEng', description: 'Master of Engineering' },
        { name: 'BEng', description: 'Bachelor of Engineering' },
        { name: 'MTech', description: 'Master of Technology' },
        { name: 'PhD. Eng.', description: 'Doctor of Philosophy in Engineering' },
    ];
    await prisma.prefix.createMany({ data: prefixes });
}

async function seedRoles() {
    await prisma.role.createMany({
        data: [
            { name: 'Student' },
            { name: 'Faculty' },
            { name: 'Department Secretary' },
            { name: 'Chairperson' },
            { name: 'Dean' },
        ],
    });
}

async function createSupabaseUser() {
    const email = faker.internet.email();
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    const { data: { user }, error } = await supabase.auth.signInAnonymously({
        options: { data: { email, firstName, lastName } as UserMetaData },
    });

    if (error) {
        console.error('Error creating user:', error.message);
        return null;
    }

    return user;
}

async function createUser() {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@g.msuiit.edu.ph`;

    const user = await prisma.user.create({
        data: { email: email, is_anonymous: true }
    })

    await prisma.profile.create({
        data: {
            id: user.id,
            first_name: firstName,
            last_name: lastName,
            created_at: user.created_at
        }
    })

    return user;
}

async function seedNonStudents() {
    const numberOfUsersToSeed = 20;
    const departments = await prisma.department.findMany();
    const roles = await prisma.role.findMany();

    for (let i = 0; i < numberOfUsersToSeed; i++) {
        const user = await createUser();
        const randomDepartment = departments[Math.floor(Math.random() * departments.length)];
        const randomRole = roles[Math.floor(Math.random() * roles.length)];

        if (user) {
            if (randomRole.name !== 'Student') {
                const prefixes = await prisma.prefix.findMany();
                const prefixId = prefixes[Math.floor(Math.random() * prefixes.length)].id;

                await prisma.profile.update({
                    where: { id: user.id },
                    data: {
                        role_id: randomRole.id,
                        department_id: randomDepartment.id,
                        prefix_id: prefixId,
                    },
                });
            }
            console.log(`Created user with ID: ${user.id} and profile.`);
        }
    }
}

async function seedStudents() {
    const numberOfUsersToSeed = 20;
    const departments = await prisma.department.findMany();
    const role = await prisma.role.findFirst({
        where: { name: 'Student' }
    });

    for (let i = 0; i < numberOfUsersToSeed; i++) {
        const user = await createUser();
        const randomDepartment = departments[Math.floor(Math.random() * departments.length)];

        if (user) {
            await prisma.profile.update({
                where: { id: user.id },
                data: {
                    department_id: randomDepartment.id,
                    role_id: role?.id,
                },
            });
            console.log(`Created user with ID: ${user.id} and profile.`);
        }
    }
}


async function seedAuthors() {
    const theses = await prisma.thesis.findMany({
        select: { id: true, department_id: true },
    });

    const students = await prisma.profile.findMany({
        select: { id: true, department_id: true },
        where: { department_id: { not: null }, role: { name: 'Student' } },
    });

    // Create a map to quickly find students by department_id
    const studentsByDepartment = students.reduce((acc, student) => {
        if (!acc[student.department_id!]) {
            acc[student.department_id!] = [];
        }
        acc[student.department_id!].push(student.id);
        return acc;
    }, {} as Record<string, string[]>);

    // Prepare data for author creation
    const authorData = theses
        .map((thesis) => {
            const departmentStudents = studentsByDepartment[thesis.department_id!] || [];
            if (departmentStudents.length === 0) return null; // Skip if no students in department

            // Randomly pick a student from the department
            const randomStudentId = departmentStudents[Math.floor(Math.random() * departmentStudents.length)];

            return {
                thesis_id: thesis.id,
                author_id: randomStudentId,
            };
        })
        .filter(thesis => thesis !== null);

    // Bulk insert authors
    if (authorData.length > 0) {
        await prisma.author.createMany({
            data: authorData,
        });
    } else {
        console.log('No matching students found for any theses.');
    }
}

async function seedAdvisers() {
    const theses = await prisma.thesis.findMany({
        select: { id: true, department_id: true },
    });

    const advisers = await prisma.profile.findMany({
        select: { id: true, department_id: true },
        where: { department_id: { not: null }, role: { name: { not: 'Student' } } },
    });

    const advisersByDepartment = advisers.reduce((acc, adviser) => {
        if (!acc[adviser.department_id!]) {
            acc[adviser.department_id!] = [];
        }
        acc[adviser.department_id!].push(adviser.id);
        return acc;
    }, {} as Record<string, string[]>);

    const adviserData = theses
        .map((thesis) => {
            const departmentAdvisers = advisersByDepartment[thesis.department_id!] || [];
            if (departmentAdvisers.length === 0) return null;

            const randomAdviserId = departmentAdvisers[Math.floor(Math.random() * departmentAdvisers.length)];

            return {
                thesis_id: thesis.id,
                adviser_id: randomAdviserId,
                role: Adviser_role.ADVISER
            };
        })
        .filter(thesis => thesis !== null);

    if (adviserData.length > 0) {
        await prisma.advisers.createMany({
            data: adviserData,
        });
    } else {
        console.log('No matching students found for any theses.');
    }
}

async function seedPanelists() {
    const theses = await prisma.thesis.findMany({
        select: { id: true, department_id: true },
    });

    const panelists = await prisma.profile.findMany({
        select: { id: true, department_id: true },
        where: { department_id: { not: null }, role: { name: { not: 'Student' } } },
    });

    const panelistsByDepartment = panelists.reduce((acc, panelists) => {
        if (!acc[panelists.department_id!]) {
            acc[panelists.department_id!] = [];
        }
        acc[panelists.department_id!].push(panelists.id);
        return acc;
    }, {} as Record<string, string[]>);


    const panelistData = theses
        .map((thesis) => {
            const departmentPanelists = panelistsByDepartment[thesis.department_id!] || [];
            if (departmentPanelists.length === 0) return null;

            const randomPanelistId = departmentPanelists[Math.floor(Math.random() * departmentPanelists.length)];

            return {
                thesis_id: thesis.id,
                panelist_id: randomPanelistId
            };
        })
        .filter(thesis => thesis !== null);

    const panelistData1 = theses
        .map((thesis) => {
            const departmentPanelists = panelistsByDepartment[thesis.department_id!] || [];
            if (departmentPanelists.length === 0) return null;

            const randomPanelistId = departmentPanelists[Math.floor(Math.random() * departmentPanelists.length)];

            return {
                thesis_id: thesis.id,
                panelist_id: randomPanelistId
            };
        })
        .filter(thesis => thesis !== null);

    const panelistData2 = theses
        .map((thesis) => {
            const departmentPanelists = panelistsByDepartment[thesis.department_id!] || [];
            if (departmentPanelists.length === 0) return null;

            // Randomly pick a student from the department
            const randomPanelistId = departmentPanelists[Math.floor(Math.random() * departmentPanelists.length)];

            return {
                thesis_id: thesis.id,
                panelist_id: randomPanelistId
            };
        })
        .filter(thesis => thesis !== null);

    const data = [...panelistData, ...panelistData1, ...panelistData2];

    data.forEach(async (d) => {
        try {
            await prisma.panelist.create({ data: d });
            console.error('Panelist created');
        } catch (error) {
            console.error('Error during seeding:', error);
        }
    })
}


// Main seeding function
async function main() {
    try {
        // const colleges = await seedColleges();
        // const departments = await seedDepartments(colleges);
        // const specializationTags = await seedSpecializationTags();

        // await seedTheses(colleges, departments, specializationTags);
        // await seedPrefixes();
        await seedRoles();
        await seedNonStudents();
        await seedStudents();
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
