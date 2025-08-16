-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('RESEARCHER', 'UNIVERSITY_STAFF');

-- CreateEnum
CREATE TYPE "JobType" AS ENUM ('POSTDOC', 'PHD_STUDENT', 'TENURE_TRACK', 'INDUSTRY_RESEARCHER');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('CV_RESUME', 'REFERENCE_LETTER', 'PORTFOLIO');

-- CreateEnum
CREATE TYPE "ProjectType" AS ENUM ('APPLIED_RESEARCH', 'COLLABORATIVE_PROJECT', 'CASE_STUDY', 'FULL_GRANT');

-- CreateEnum
CREATE TYPE "OpenCallStatus" AS ENUM ('DRAFT', 'OPEN', 'IN_REVIEW', 'CLOSED');

-- CreateEnum
CREATE TYPE "OfferType" AS ENUM ('STANDARD', 'CONDITIONAL');

-- CreateEnum
CREATE TYPE "OfferResponse" AS ENUM ('ACCEPTED', 'DECLINED');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('NEW', 'UNDER_REVIEW', 'SHORTLISTED', 'INTERVIEW', 'OFFER', 'HIRED', 'REJECTED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "password" TEXT,
    "googleId" TEXT,
    "linkedInId" TEXT,
    "orcidId" TEXT,
    "role" "UserRole" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResearcherProfile" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "professionalTitle" TEXT,
    "currentInstitution" TEXT,
    "currentLocation" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ResearcherProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Education" (
    "id" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "fieldOfStudy" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "researcherProfileId" TEXT NOT NULL,

    CONSTRAINT "Education_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Publication" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "journal" TEXT,
    "year" INTEGER NOT NULL,
    "link" TEXT,
    "researcherProfileId" TEXT NOT NULL,

    CONSTRAINT "Publication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" "DocumentType" NOT NULL,
    "researcherProfileId" TEXT NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Proposal" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "isFinal" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "researcherProfileId" TEXT NOT NULL,

    CONSTRAINT "Proposal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "University" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "University_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UniversityProfile" (
    "id" TEXT NOT NULL,
    "departmentName" TEXT NOT NULL,
    "faculty" TEXT,
    "logoUrl" TEXT,
    "bannerImageUrl" TEXT,
    "address" TEXT,
    "websiteUrl" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "universityId" TEXT NOT NULL,

    CONSTRAINT "UniversityProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpenCall" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "researchArea" TEXT NOT NULL,
    "keywords" TEXT[],
    "projectTypes" "ProjectType"[],
    "targetNumberOfAwards" INTEGER NOT NULL,
    "assistanceOffered" TEXT,
    "eligibleInstitutionTypes" TEXT[],
    "eligibleCountries" TEXT[],
    "eligibleCareerStages" "JobType"[],
    "requiresProposal" BOOLEAN NOT NULL DEFAULT true,
    "proposalTemplateUrl" TEXT,
    "customApplicationQuestions" JSONB,
    "evaluationCriteria" JSONB,
    "fundingType" TEXT NOT NULL,
    "fundingAmount" TEXT NOT NULL,
    "submissionOpenDate" TIMESTAMP(3) NOT NULL,
    "submissionDeadline" TIMESTAMP(3) NOT NULL,
    "reviewPeriodStartDate" TIMESTAMP(3) NOT NULL,
    "notificationDate" TIMESTAMP(3) NOT NULL,
    "status" "OpenCallStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "OpenCall_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Application" (
    "id" TEXT NOT NULL,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'NEW',
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "submittedCoverLetter" TEXT,
    "customApplicationAnswers" JSONB,
    "offerType" "OfferType",
    "offerConditions" TEXT,
    "offerRespondedAt" TIMESTAMP(3),
    "researcherResponse" "OfferResponse",
    "applicantId" TEXT NOT NULL,
    "openCallId" TEXT NOT NULL,
    "submittedProposalId" TEXT,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_googleId_key" ON "User"("googleId");

-- CreateIndex
CREATE UNIQUE INDEX "User_linkedInId_key" ON "User"("linkedInId");

-- CreateIndex
CREATE UNIQUE INDEX "User_orcidId_key" ON "User"("orcidId");

-- CreateIndex
CREATE UNIQUE INDEX "ResearcherProfile_userId_key" ON "ResearcherProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "University_name_key" ON "University"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UniversityProfile_userId_key" ON "UniversityProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Application_submittedProposalId_key" ON "Application"("submittedProposalId");

-- AddForeignKey
ALTER TABLE "ResearcherProfile" ADD CONSTRAINT "ResearcherProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_researcherProfileId_fkey" FOREIGN KEY ("researcherProfileId") REFERENCES "ResearcherProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Publication" ADD CONSTRAINT "Publication_researcherProfileId_fkey" FOREIGN KEY ("researcherProfileId") REFERENCES "ResearcherProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_researcherProfileId_fkey" FOREIGN KEY ("researcherProfileId") REFERENCES "ResearcherProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposal" ADD CONSTRAINT "Proposal_researcherProfileId_fkey" FOREIGN KEY ("researcherProfileId") REFERENCES "ResearcherProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UniversityProfile" ADD CONSTRAINT "UniversityProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UniversityProfile" ADD CONSTRAINT "UniversityProfile_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "University"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpenCall" ADD CONSTRAINT "OpenCall_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "UniversityProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "ResearcherProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_openCallId_fkey" FOREIGN KEY ("openCallId") REFERENCES "OpenCall"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_submittedProposalId_fkey" FOREIGN KEY ("submittedProposalId") REFERENCES "Proposal"("id") ON DELETE SET NULL ON UPDATE CASCADE;
