/*
  Warnings:

  - You are about to drop the `AccessControl` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ActivityLog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ChatMessage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `College` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DefenseSchedule` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Department` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `File` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FileVersion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Notification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PlagiarismReport` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReviewFeedback` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Specialization` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Thesis` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ThesisMilestone` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ThesisReview` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserProfile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserRole` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `A` on the `_PanelSchedule` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `B` on the `_PanelSchedule` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `A` on the `_PanelTheses` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `B` on the `_PanelTheses` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `A` on the `_Specialization` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `B` on the `_Specialization` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."theme_preference" AS ENUM ('LIGHT', 'DARK');

-- CreateEnum
CREATE TYPE "public"."review_status" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'REVISION_REQUIRED');

-- CreateEnum
CREATE TYPE "public"."thesis_status" AS ENUM ('PROPOSAL_SUBMITTED', 'UNDER_REVIEW', 'FINAL_MANUSCRIPT', 'APPROVED', 'REJECTED');

-- DropForeignKey
ALTER TABLE "public"."AccessControl" DROP CONSTRAINT "AccessControl_thesis_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."AccessControl" DROP CONSTRAINT "AccessControl_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."ActivityLog" DROP CONSTRAINT "ActivityLog_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."ChatMessage" DROP CONSTRAINT "ChatMessage_receiver_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."ChatMessage" DROP CONSTRAINT "ChatMessage_sender_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."DefenseSchedule" DROP CONSTRAINT "DefenseSchedule_thesis_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Department" DROP CONSTRAINT "Department_college_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."FileVersion" DROP CONSTRAINT "FileVersion_file_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."FileVersion" DROP CONSTRAINT "FileVersion_thesis_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Notification" DROP CONSTRAINT "Notification_recipient_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."PlagiarismReport" DROP CONSTRAINT "PlagiarismReport_reportFile_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."PlagiarismReport" DROP CONSTRAINT "PlagiarismReport_thesis_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."ReviewFeedback" DROP CONSTRAINT "ReviewFeedback_reviewer_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."ReviewFeedback" DROP CONSTRAINT "ReviewFeedback_thesis_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Thesis" DROP CONSTRAINT "Thesis_adviser_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Thesis" DROP CONSTRAINT "Thesis_author_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Thesis" DROP CONSTRAINT "Thesis_college_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Thesis" DROP CONSTRAINT "Thesis_department_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Thesis" DROP CONSTRAINT "Thesis_finalFile_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Thesis" DROP CONSTRAINT "Thesis_proposalFile_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."ThesisMilestone" DROP CONSTRAINT "ThesisMilestone_thesis_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."ThesisReview" DROP CONSTRAINT "ThesisReview_reviewer_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."ThesisReview" DROP CONSTRAINT "ThesisReview_thesis_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserProfile" DROP CONSTRAINT "UserProfile_role_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserProfile" DROP CONSTRAINT "UserProfile_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."_PanelSchedule" DROP CONSTRAINT "_PanelSchedule_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_PanelSchedule" DROP CONSTRAINT "_PanelSchedule_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."_PanelTheses" DROP CONSTRAINT "_PanelTheses_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_PanelTheses" DROP CONSTRAINT "_PanelTheses_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."_Specialization" DROP CONSTRAINT "_Specialization_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_Specialization" DROP CONSTRAINT "_Specialization_B_fkey";

-- AlterTable
ALTER TABLE "public"."_PanelSchedule" DROP COLUMN "A",
ADD COLUMN     "A" UUID NOT NULL,
DROP COLUMN "B",
ADD COLUMN     "B" UUID NOT NULL;

-- AlterTable
ALTER TABLE "public"."_PanelTheses" DROP COLUMN "A",
ADD COLUMN     "A" UUID NOT NULL,
DROP COLUMN "B",
ADD COLUMN     "B" UUID NOT NULL;

-- AlterTable
ALTER TABLE "public"."_Specialization" DROP COLUMN "A",
ADD COLUMN     "A" UUID NOT NULL,
DROP COLUMN "B",
ADD COLUMN     "B" UUID NOT NULL;

-- DropTable
DROP TABLE "public"."AccessControl";

-- DropTable
DROP TABLE "public"."ActivityLog";

-- DropTable
DROP TABLE "public"."ChatMessage";

-- DropTable
DROP TABLE "public"."College";

-- DropTable
DROP TABLE "public"."DefenseSchedule";

-- DropTable
DROP TABLE "public"."Department";

-- DropTable
DROP TABLE "public"."File";

-- DropTable
DROP TABLE "public"."FileVersion";

-- DropTable
DROP TABLE "public"."Notification";

-- DropTable
DROP TABLE "public"."PlagiarismReport";

-- DropTable
DROP TABLE "public"."ReviewFeedback";

-- DropTable
DROP TABLE "public"."Specialization";

-- DropTable
DROP TABLE "public"."Thesis";

-- DropTable
DROP TABLE "public"."ThesisMilestone";

-- DropTable
DROP TABLE "public"."ThesisReview";

-- DropTable
DROP TABLE "public"."User";

-- DropTable
DROP TABLE "public"."UserProfile";

-- DropTable
DROP TABLE "public"."UserRole";

-- DropEnum
DROP TYPE "public"."ReviewStatus";

-- DropEnum
DROP TYPE "public"."ThemePreference";

-- DropEnum
DROP TYPE "public"."ThesisStatus";

-- CreateTable
CREATE TABLE "public"."users" (
    "instance_id" UUID,
    "id" UUID NOT NULL,
    "aud" VARCHAR(255),
    "role" VARCHAR(255),
    "email" VARCHAR(255),
    "encrypted_password" VARCHAR(255),
    "email_confirmed_at" TIMESTAMPTZ(6),
    "invited_at" TIMESTAMPTZ(6),
    "confirmation_token" VARCHAR(255),
    "confirmation_sent_at" TIMESTAMPTZ(6),
    "recovery_token" VARCHAR(255),
    "recovery_sent_at" TIMESTAMPTZ(6),
    "email_change_token_new" VARCHAR(255),
    "email_change" VARCHAR(255),
    "email_change_sent_at" TIMESTAMPTZ(6),
    "last_sign_in_at" TIMESTAMPTZ(6),
    "raw_app_meta_data" JSONB,
    "raw_user_meta_data" JSONB,
    "is_super_admin" BOOLEAN,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),
    "phone" TEXT,
    "phone_confirmed_at" TIMESTAMPTZ(6),
    "phone_change" TEXT DEFAULT '',
    "phone_change_token" VARCHAR(255) DEFAULT '',
    "phone_change_sent_at" TIMESTAMPTZ(6),
    "confirmed_at" TIMESTAMPTZ(6),
    "email_change_token_current" VARCHAR(255) DEFAULT '',
    "email_change_confirm_status" SMALLINT DEFAULT 0,
    "banned_until" TIMESTAMPTZ(6),
    "reauthentication_token" VARCHAR(255) DEFAULT '',
    "reauthentication_sent_at" TIMESTAMPTZ(6),
    "is_sso_user" BOOLEAN NOT NULL DEFAULT false,
    "deleted_at" TIMESTAMPTZ(6),
    "is_anonymous" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user_profiles" (
    "id" UUID NOT NULL,
    "role_id" UUID NOT NULL,
    "firstName" VARCHAR(100) NOT NULL,
    "lastName" VARCHAR(100) NOT NULL,
    "idNumber" VARCHAR(15) NOT NULL,
    "themePreference" "public"."theme_preference" NOT NULL DEFAULT 'LIGHT',
    "bio" VARCHAR(500),
    "avatar" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user_roles" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,

    CONSTRAINT "user_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."theses" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "title" TEXT NOT NULL,
    "abstract" TEXT NOT NULL,
    "proposalFile_id" UUID NOT NULL,
    "finalFile_id" UUID,
    "status" "public"."thesis_status" NOT NULL,
    "author_id" UUID NOT NULL,
    "adviser_id" UUID,
    "department_id" UUID NOT NULL,
    "college_id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "theses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."specializations" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,

    CONSTRAINT "specializations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."colleges" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,

    CONSTRAINT "colleges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."departments" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,
    "college_id" UUID NOT NULL,

    CONSTRAINT "departments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."files" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "filePath" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,

    CONSTRAINT "files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."chat_messages" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "content" TEXT NOT NULL,
    "sender_id" UUID NOT NULL,
    "receiver_id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chat_messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."notifications" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "content" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "recipient_id" UUID NOT NULL,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."file_versions" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "thesis_id" UUID NOT NULL,
    "file_id" UUID NOT NULL,
    "version" INTEGER NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "file_versions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."activity_logs" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user_id" UUID NOT NULL,
    "action" TEXT NOT NULL,
    "targetType" TEXT NOT NULL,
    "targetId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "activity_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."plagiarism_reports" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "thesis_id" UUID NOT NULL,
    "similarityScore" DOUBLE PRECISION NOT NULL,
    "reportFile_id" UUID NOT NULL,
    "checkedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "plagiarism_reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."review_feedbacks" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "thesis_id" UUID NOT NULL,
    "reviewer_id" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "review_feedbacks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."access_controls" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user_id" UUID NOT NULL,
    "thesis_id" UUID NOT NULL,
    "canEdit" BOOLEAN NOT NULL DEFAULT false,
    "canApprove" BOOLEAN NOT NULL DEFAULT false,
    "canView" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "access_controls_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."thesis_reviews" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "status" "public"."review_status" NOT NULL,
    "thesis_id" UUID NOT NULL,
    "reviewer_id" UUID NOT NULL,
    "feedback" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "thesis_reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."defense_schedules" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "thesis_id" UUID NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "venue" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "defense_schedules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."thesis_milestones" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "thesis_id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "thesis_milestones_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "public"."users"("phone");

-- CreateIndex
CREATE INDEX "users_instance_id_idx" ON "public"."users"("instance_id");

-- CreateIndex
CREATE INDEX "users_is_anonymous_idx" ON "public"."users"("is_anonymous");

-- CreateIndex
CREATE UNIQUE INDEX "user_profiles_idNumber_key" ON "public"."user_profiles"("idNumber");

-- CreateIndex
CREATE UNIQUE INDEX "user_roles_name_key" ON "public"."user_roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "specializations_name_key" ON "public"."specializations"("name");

-- CreateIndex
CREATE UNIQUE INDEX "colleges_name_key" ON "public"."colleges"("name");

-- CreateIndex
CREATE UNIQUE INDEX "departments_name_key" ON "public"."departments"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_PanelSchedule_AB_unique" ON "public"."_PanelSchedule"("A", "B");

-- CreateIndex
CREATE INDEX "_PanelSchedule_B_index" ON "public"."_PanelSchedule"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PanelTheses_AB_unique" ON "public"."_PanelTheses"("A", "B");

-- CreateIndex
CREATE INDEX "_PanelTheses_B_index" ON "public"."_PanelTheses"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Specialization_AB_unique" ON "public"."_Specialization"("A", "B");

-- CreateIndex
CREATE INDEX "_Specialization_B_index" ON "public"."_Specialization"("B");

-- AddForeignKey
ALTER TABLE "public"."user_profiles" ADD CONSTRAINT "user_profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_profiles" ADD CONSTRAINT "user_profiles_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "public"."user_roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."theses" ADD CONSTRAINT "theses_proposalFile_id_fkey" FOREIGN KEY ("proposalFile_id") REFERENCES "public"."files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."theses" ADD CONSTRAINT "theses_finalFile_id_fkey" FOREIGN KEY ("finalFile_id") REFERENCES "public"."files"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."theses" ADD CONSTRAINT "theses_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "public"."user_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."theses" ADD CONSTRAINT "theses_adviser_id_fkey" FOREIGN KEY ("adviser_id") REFERENCES "public"."user_profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."theses" ADD CONSTRAINT "theses_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "public"."departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."theses" ADD CONSTRAINT "theses_college_id_fkey" FOREIGN KEY ("college_id") REFERENCES "public"."colleges"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."departments" ADD CONSTRAINT "departments_college_id_fkey" FOREIGN KEY ("college_id") REFERENCES "public"."colleges"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."chat_messages" ADD CONSTRAINT "chat_messages_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "public"."user_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."chat_messages" ADD CONSTRAINT "chat_messages_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "public"."user_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."notifications" ADD CONSTRAINT "notifications_recipient_id_fkey" FOREIGN KEY ("recipient_id") REFERENCES "public"."user_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."file_versions" ADD CONSTRAINT "file_versions_thesis_id_fkey" FOREIGN KEY ("thesis_id") REFERENCES "public"."theses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."file_versions" ADD CONSTRAINT "file_versions_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "public"."files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."activity_logs" ADD CONSTRAINT "activity_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."plagiarism_reports" ADD CONSTRAINT "plagiarism_reports_thesis_id_fkey" FOREIGN KEY ("thesis_id") REFERENCES "public"."theses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."plagiarism_reports" ADD CONSTRAINT "plagiarism_reports_reportFile_id_fkey" FOREIGN KEY ("reportFile_id") REFERENCES "public"."files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."review_feedbacks" ADD CONSTRAINT "review_feedbacks_thesis_id_fkey" FOREIGN KEY ("thesis_id") REFERENCES "public"."theses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."review_feedbacks" ADD CONSTRAINT "review_feedbacks_reviewer_id_fkey" FOREIGN KEY ("reviewer_id") REFERENCES "public"."user_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."access_controls" ADD CONSTRAINT "access_controls_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."access_controls" ADD CONSTRAINT "access_controls_thesis_id_fkey" FOREIGN KEY ("thesis_id") REFERENCES "public"."theses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."thesis_reviews" ADD CONSTRAINT "thesis_reviews_thesis_id_fkey" FOREIGN KEY ("thesis_id") REFERENCES "public"."theses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."thesis_reviews" ADD CONSTRAINT "thesis_reviews_reviewer_id_fkey" FOREIGN KEY ("reviewer_id") REFERENCES "public"."user_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."defense_schedules" ADD CONSTRAINT "defense_schedules_thesis_id_fkey" FOREIGN KEY ("thesis_id") REFERENCES "public"."theses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."thesis_milestones" ADD CONSTRAINT "thesis_milestones_thesis_id_fkey" FOREIGN KEY ("thesis_id") REFERENCES "public"."theses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_PanelTheses" ADD CONSTRAINT "_PanelTheses_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."theses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_PanelTheses" ADD CONSTRAINT "_PanelTheses_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."user_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_Specialization" ADD CONSTRAINT "_Specialization_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."theses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_Specialization" ADD CONSTRAINT "_Specialization_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."specializations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_PanelSchedule" ADD CONSTRAINT "_PanelSchedule_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."defense_schedules"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_PanelSchedule" ADD CONSTRAINT "_PanelSchedule_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."user_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
