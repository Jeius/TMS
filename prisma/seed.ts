import { PrismaClient, ThesisStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Seed Colleges
    const cols = await prisma.college.createMany({
        data: [
            { name: 'College of Engineering' },
            { name: 'College of Science' },
            { name: 'College of Arts' },
            { name: 'College of Business' },
            { name: 'College of Law' },
        ],
    });

    const [college1, college2, college3, college4, college5] = await prisma.college.findMany();
    const colleges = [college1, college2, college3, college4, college5];

    // Seed Departments
    const departments = await prisma.department.createMany({
        data: [
            { name: 'Computer Science', college_id: college1.id },
            { name: 'Mechanical Engineering', college_id: college1.id },
            { name: 'Civil Engineering', college_id: college1.id },
            { name: 'Physics', college_id: college2.id },
            { name: 'Biology', college_id: college2.id },
            { name: 'Chemistry', college_id: college2.id },
            { name: 'Literature', college_id: college3.id },
            { name: 'Philosophy', college_id: college3.id },
            { name: 'History', college_id: college3.id },
            { name: 'Marketing', college_id: college4.id },
            { name: 'Finance', college_id: college4.id },
            { name: 'Management', college_id: college4.id },
            { name: 'Corporate Law', college_id: college5.id },
            { name: 'International Law', college_id: college5.id },
        ],
    });

    const allDepartments = await prisma.department.findMany();

    // Seed SpecializationTags
    const specializationTags = await prisma.specializationTag.createMany({
        data: [
            { name: 'Artificial Intelligence' },
            { name: 'Data Science' },
            { name: 'Quantum Mechanics' },
            { name: 'Structural Engineering' },
            { name: 'Business Strategy' },
        ],
    });

    const allSpecializationTags = await prisma.specializationTag.findMany();

    // Function to generate random thesis statuses
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

    // Seed Theses
    for (let i = 1; i <= 30; i++) {
        const status = randomStatus();
        const yearApproved = status === ThesisStatus.APPROVED ? 2023 : null;

        const thesis = await prisma.thesis.create({
            data: {
                title: `Thesis Title ${i}`,
                abstract: `This is an abstract for Thesis ${i}. It provides an overview of the study.`,
                status: status,
                year_approved: yearApproved,
                college: { connect: { id: colleges[i % colleges.length].id } },
                department: { connect: { id: allDepartments[i % allDepartments.length].id } },
            },
        });

        // Link ThesisSpecialization tags to each thesis
        await prisma.thesisSpecialization.createMany({
            data: [
                {
                    thesis_id: thesis.id,
                    tag_id: allSpecializationTags[i % allSpecializationTags.length].id,
                },
                {
                    thesis_id: thesis.id,
                    tag_id: allSpecializationTags[(i + 1) % allSpecializationTags.length].id,
                },
            ],
        });
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
