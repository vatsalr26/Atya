"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new client_1.PrismaClient();
const universities = [
    {
        name: 'Massachusetts Institute of Technology',
        country: 'United States'
    },
    {
        name: 'Stanford University',
        country: 'United States'
    },
    {
        name: 'Harvard University',
        country: 'United States'
    },
    {
        name: 'California Institute of Technology',
        country: 'United States'
    },
    {
        name: 'University of Cambridge',
        country: 'United Kingdom'
    }
];
const researcherUsers = [
    {
        email: 'researcher1@example.com',
        name: 'John Researcher',
        institution: 'Independent Researcher',
        fieldOfStudy: 'Computer Science',
        bio: 'Passionate about AI research',
    },
    {
        email: 'researcher2@example.com',
        name: 'Sarah Johnson',
        institution: 'Tech Research Lab',
        fieldOfStudy: 'Biomedical Engineering',
        bio: 'Specialized in medical devices',
    },
    {
        email: 'researcher3@example.com',
        name: 'Michael Chen',
        institution: 'Data Science Institute',
        fieldOfStudy: 'Machine Learning',
        bio: 'Focus on NLP and deep learning',
    },
    {
        email: 'researcher4@example.com',
        name: 'Emma Wilson',
        institution: 'Environmental Research Center',
        fieldOfStudy: 'Environmental Science',
        bio: 'Climate change researcher',
    },
    {
        email: 'researcher5@example.com',
        name: 'David Kim',
        institution: 'Quantum Computing Lab',
        fieldOfStudy: 'Quantum Physics',
        bio: 'Researching quantum algorithms',
    }
];
const staffUsers = [
    {
        email: 'staff1@mit.edu',
        name: 'Jane Smith',
        position: 'Research Director',
        department: 'Computer Science',
        universityIndex: 0
    },
    {
        email: 'staff2@stanford.edu',
        name: 'Robert Johnson',
        position: 'Head of Research',
        department: 'Engineering',
        universityIndex: 1
    },
    {
        email: 'staff3@harvard.edu',
        name: 'Emily Davis',
        position: 'Research Coordinator',
        department: 'Life Sciences',
        universityIndex: 2
    },
    {
        email: 'staff4@caltech.edu',
        name: 'William Brown',
        position: 'Lab Manager',
        department: 'Physics',
        universityIndex: 3
    },
    {
        email: 'staff5@cam.ac.uk',
        name: 'Sophie Wilson',
        position: 'Research Administrator',
        department: 'Computer Science',
        universityIndex: 4
    }
];
const openCalls = [
    {
        title: 'AI Research Fellowship 2023',
        description: 'Join our cutting-edge AI research team',
        deadline: new Date('2023-12-31'),
        requirements: 'PhD in Computer Science or related field',
    },
    {
        title: 'Biomedical Engineering Research Grant',
        description: 'Funding for innovative biomedical research',
        deadline: new Date('2023-11-15'),
        requirements: 'Masters or PhD in Biomedical Engineering',
    },
    {
        title: 'Climate Change Research Initiative',
        description: 'Research on climate change impacts and solutions',
        deadline: new Date('2024-02-28'),
        requirements: 'Background in Environmental Science',
    },
    {
        title: 'Quantum Computing Research Position',
        description: 'Join our quantum computing research group',
        deadline: new Date('2023-10-15'),
        requirements: 'PhD in Physics or Computer Science',
    },
    {
        title: 'Renewable Energy Research Grant',
        description: 'Funding for renewable energy innovation',
        deadline: new Date('2024-01-31'),
        requirements: 'Research proposal in renewable energy',
    }
];
async function main() {
    try {
        console.log('Starting database seeding...');
        console.log('Clearing existing data...');
        await prisma.application.deleteMany({});
        await prisma.openCall.deleteMany({});
        await prisma.education.deleteMany({});
        await prisma.researcherProfile.deleteMany({});
        await prisma.universityProfile.deleteMany({});
        await prisma.user.deleteMany({});
        await prisma.university.deleteMany({});
        console.log('Creating universities...');
        const createdUniversities = [];
        for (const uni of universities) {
            const created = await prisma.university.create({
                data: uni,
            });
            createdUniversities.push(created);
        }
        console.log('Creating users...');
        const password = await bcrypt.hash('password123', 10);
        const createdUsers = [];
        for (const researcher of researcherUsers) {
            const created = await prisma.user.create({
                data: {
                    email: researcher.email,
                    password,
                    role: 'RESEARCHER',
                    researcherProfile: {
                        create: {
                            fullName: researcher.name,
                            professionalTitle: researcher.fieldOfStudy,
                            currentInstitution: researcher.institution,
                            currentLocation: 'USA',
                            education: {
                                create: {
                                    degree: 'PhD',
                                    fieldOfStudy: researcher.fieldOfStudy,
                                    institution: researcher.institution,
                                    country: 'USA',
                                    startDate: new Date('2018-09-01'),
                                    endDate: new Date('2022-06-01'),
                                },
                            },
                        },
                    },
                },
            });
            createdUsers.push(created);
        }
        const createdStaff = [];
        for (const staff of staffUsers) {
            const university = createdUniversities[staff.universityIndex];
            const created = await prisma.user.create({
                data: {
                    email: staff.email,
                    password,
                    role: 'UNIVERSITY_STAFF',
                    universityProfile: {
                        create: {
                            departmentName: staff.department,
                            faculty: staff.department,
                            description: `Staff member at ${university.name}`,
                            websiteUrl: university.website,
                            university: {
                                connect: { id: university.id }
                            }
                        },
                    },
                },
                include: {
                    universityProfile: true
                }
            });
            createdStaff.push(created);
        }
        console.log('Creating open calls...');
        const createdOpenCalls = [];
        for (let i = 0; i < openCalls.length; i++) {
            const call = openCalls[i];
            const staffIndex = i % staffUsers.length;
            const staffUser = createdStaff[staffIndex];
            if (!staffUser.universityProfile) {
                console.error(`Staff user ${staffUser.email} is missing university profile`);
                continue;
            }
            const created = await prisma.openCall.create({
                data: {
                    title: call.title,
                    summary: call.description,
                    researchArea: 'Computer Science',
                    keywords: ['research', 'fellowship'],
                    projectTypes: ['APPLIED_RESEARCH'],
                    targetNumberOfAwards: 5,
                    eligibleInstitutionTypes: ['UNIVERSITY'],
                    eligibleCountries: ['US', 'UK'],
                    eligibleCareerStages: ['PHD_STUDENT', 'POSTDOC'],
                    requiresProposal: true,
                    fundingType: 'GRANT',
                    fundingAmount: '10000',
                    submissionOpenDate: new Date(),
                    submissionDeadline: call.deadline,
                    reviewPeriodStartDate: new Date(call.deadline.getTime() + 7 * 24 * 60 * 60 * 1000),
                    notificationDate: new Date(call.deadline.getTime() + 14 * 24 * 60 * 60 * 1000),
                    status: 'OPEN',
                    author: {
                        connect: { id: staffUser.universityProfile.id }
                    },
                },
            });
            createdOpenCalls.push(created);
        }
        console.log('Creating applications...');
        const researcherProfiles = await prisma.researcherProfile.findMany({
            include: { user: true }
        });
        if (researcherProfiles.length === 0) {
            console.error('No researcher profiles found. Cannot create applications.');
            return;
        }
        for (let i = 0; i < 10; i++) {
            const researcherProfile = researcherProfiles[i % researcherProfiles.length];
            const openCall = createdOpenCalls[i % createdOpenCalls.length];
            if (!openCall) {
                console.error('No open calls available to create applications');
                continue;
            }
            await prisma.application.create({
                data: {
                    submittedCoverLetter: `I am very interested in this position because... (Application ${i + 1})`,
                    status: 'NEW',
                    applicant: {
                        connect: { id: researcherProfile.id }
                    },
                    openCall: {
                        connect: { id: openCall.id }
                    },
                },
            });
        }
        console.log('\n✅ Database seeded successfully!\n');
        console.log('Sample logins:');
        console.log('---------------');
        console.log('Researchers:');
        researcherUsers.forEach((user) => {
            console.log(`Email: ${user.email} | Password: password123`);
        });
        console.log('\nStaff:');
        staffUsers.forEach((user) => {
            console.log(`Email: ${user.email} | Password: password123`);
        });
        console.log('\n🌐 Open calls available at: http://localhost:3000/open-calls');
        console.log('🔑 Login at: http://localhost:8000/login');
    }
    catch (error) {
        console.error('Error seeding database:');
        console.error(error);
        process.exit(1);
    }
    finally {
        await prisma.$disconnect();
    }
}
main();
//# sourceMappingURL=seed.js.map